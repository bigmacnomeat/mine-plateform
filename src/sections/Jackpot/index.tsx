import React from 'react'
import styled from 'styled-components'
import { TokenValue } from 'gamba-react-ui-v2'
import { useFirebase } from '../../hooks/useFirebase'
import { PublicKey } from '@solana/web3.js'
import { Modal } from '../../components/Modal'
import { PLATFORM_JACKPOT_FEE } from '../../constants'
import { GambaUi } from 'gamba-react-ui-v2'

const JackpotContainer = styled.div`
  background: linear-gradient(45deg, #FFD700, #FFA500);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`

const JackpotAmount = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const JackpotTitle = styled.div`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: white;
`

const InfoText = styled.p`
  margin: 10px 0;
  line-height: 1.5;
  color: #ccc;
`

interface JackpotData {
  balance: number
  lastWinner?: string
  lastWinAmount?: number
}

export function Jackpot() {
  const [showInfo, setShowInfo] = React.useState(false)
  const { subscribeToData } = useFirebase()
  const [jackpotData, setJackpotData] = React.useState<JackpotData>({ balance: 0 })

  React.useEffect(() => {
    const unsubscribe = subscribeToData<JackpotData>('jackpot', (data) => {
      if (data) {
        setJackpotData(data)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <JackpotContainer onClick={() => setShowInfo(true)}>
        <JackpotTitle>🎰 JACKPOT</JackpotTitle>
        <JackpotAmount>
          <TokenValue amount={jackpotData.balance} />
        </JackpotAmount>
      </JackpotContainer>

      {showInfo && (
        <Modal onClose={() => setShowInfo(false)}>
          <h1>Mine Vegas Jackpot 💰</h1>
          <InfoText>
            Current Jackpot Pool: <TokenValue amount={jackpotData.balance} />
          </InfoText>
          <InfoText>
            The Mine Vegas Jackpot grows with every bet made on our platform. 
            {PLATFORM_JACKPOT_FEE > 0 ? (
              <>
                A small fee of {(PLATFORM_JACKPOT_FEE * 100).toFixed(2)}% from each bet 
                goes into the jackpot pool, giving you a chance to win big!
              </>
            ) : (
              'Jackpot contributions are currently disabled.'
            )}
          </InfoText>
          {jackpotData.lastWinner && (
            <InfoText>
              Last Winner: {jackpotData.lastWinner}
              <br />
              Amount Won: <TokenValue amount={jackpotData.lastWinAmount || 0} />
            </InfoText>
          )}
          <GambaUi.Button onClick={() => setShowInfo(false)}>
            Close
          </GambaUi.Button>
        </Modal>
      )}
    </>
  )
}
