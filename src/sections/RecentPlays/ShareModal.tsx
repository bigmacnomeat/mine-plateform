import { GambaTransaction } from 'gamba-core-v2'
import { GambaUi, TokenValue } from 'gamba-react-ui-v2'
import React from 'react'
import { extractMetadata } from '../../utils'
import { PLATFORM_SHARABLE_URL } from '../../constants'
import { Modal } from '../../components/Modal'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import styled from 'styled-components'

const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  text-align: center;
`

const PayoutInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface Props {
  event: GambaTransaction<'GameSettled'>
  onClose: () => void
}

export function ShareModal({ event, onClose }: Props) {
  const md = useMediaQuery('md')
  const { game } = extractMetadata(event)
  const multiplier = event.data.bet[event.data.resultIndex.toNumber()] / 10000
  const wager = event.data.wager.toNumber()
  const payout = multiplier * wager
  const profit = payout - wager

  const shareText = React.useMemo(() => {
    const verb = profit >= 0 ? 'won' : 'lost'
    const amount = Math.abs(profit)
    return `I just ${verb} ${amount} ${game?.meta.name || 'Mine Vegas'} \n\nPlay now at ${PLATFORM_SHARABLE_URL}`
  }, [profit, game])

  const share = async () => {
    try {
      await navigator.share({
        title: 'Mine Vegas',
        text: shareText,
      })
    } catch (err) {
      console.error(err)
      try {
        await navigator.clipboard.writeText(shareText)
        alert('Copied to clipboard!')
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <Modal onClose={onClose}>
      <ShareContainer>
        <h2>Share your {profit >= 0 ? 'win' : 'loss'}</h2>
        <PayoutInfo>
          <TokenValue amount={Math.abs(profit)} mint={event.data.tokenMint} />
          {profit > 0 && <div>({multiplier.toFixed(2)}x)</div>}
        </PayoutInfo>
        <div>
          <GambaUi.Button onClick={share}>
            Share
          </GambaUi.Button>
        </div>
      </ShareContainer>
    </Modal>
  )
}
