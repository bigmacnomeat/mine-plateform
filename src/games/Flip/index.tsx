import { Canvas } from '@react-three/fiber'
import { GambaUi, useSound } from 'gamba-react-ui-v2'
import { useGamba } from 'gamba-react-v2'
import { useWallet } from '@solana/wallet-adapter-react'
import React from 'react'
import { Coin, TEXTURE_HEADS, TEXTURE_TAILS } from './Coin'
import { Effect } from './Effect'
import { ErrorMessage, CoinOptionContainer } from './styles'

import SOUND_COIN from './coin.mp3'
import SOUND_LOSE from './lose.mp3'
import SOUND_WIN from './win.mp3'

const SIDES = {
  heads: [2, 0],
  tails: [0, 2],
}
const WAGER_OPTIONS = [0.1, 0.5, 1, 2, 5]  // Reduced wager amounts for testing

type Side = keyof typeof SIDES

function Flip() {
  const game = GambaUi.useGame()
  const gamba = useGamba()
  const wallet = useWallet()
  const [flipping, setFlipping] = React.useState(false)
  const [win, setWin] = React.useState(false)
  const [resultIndex, setResultIndex] = React.useState(0)
  const [side, setSide] = React.useState<Side>('heads')
  const [wager, setWager] = React.useState(WAGER_OPTIONS[0])
  const [error, setError] = React.useState<string | null>(null)

  const sounds = useSound({
    coin: SOUND_COIN,
    win: SOUND_WIN,
    lose: SOUND_LOSE,
  })

  const play = async () => {
    try {
      setError(null)
      setWin(false)
      setFlipping(true)

      sounds.play('coin', { playbackRate: .5 })

      // Check if wallet is connected
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error('Please connect your wallet first')
      }

      // Create game transaction with proper error handling
      try {
        await game.play({
          bet: SIDES[side],
          wager,
          metadata: [side],
        })

        sounds.play('coin')

        const result = await game.result()
        const win = result.payout > 0

        setResultIndex(result.resultIndex)
        setWin(win)

        if (win) {
          sounds.play('win')
        } else {
          sounds.play('lose')
        }
      } catch (err) {
        console.error('Game transaction error:', err)
        // Check for specific error types
        if (err instanceof Error) {
          if (err.toString().includes('InstructionError')) {
            setError('House wallet may have insufficient funds. Please try a smaller bet amount or contact the platform operator.')
          } else {
            setError(err.message)
          }
        } else {
          setError('Failed to process game transaction. The house wallet may need funds.')
        }
      }
    } catch (err) {
      console.error('Game error:', err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setFlipping(false)
    }
  }

  // Check if wallet is connected and game is ready
  const isWalletConnected = Boolean(wallet.connected && wallet.publicKey)
  const isGameReady = !gamba.isPlaying && isWalletConnected

  return (
    <>
      <GambaUi.Portal target="screen">
        <Canvas
          linear
          flat
          orthographic
          camera={{
            zoom: 80,
            position: [0, 0, 100],
          }}
        >
          <React.Suspense fallback={null}>
            <Coin result={resultIndex} flipping={flipping} />
          </React.Suspense>
          <Effect color="white" />

          {flipping && <Effect color="white" />}
          {win && <Effect color="#42ff78" />}
          <ambientLight intensity={3} />
          <directionalLight
            position-z={1}
            position-y={1}
            castShadow
            color="#CCCCCC"
          />
          <hemisphereLight
            intensity={.5}
            position={[0, 1, 0]}
            scale={[1, 1, 1]}
            color="#ffadad"
            groundColor="#6666fe"
          />
        </Canvas>
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <GambaUi.WagerInput
          options={WAGER_OPTIONS}
          value={wager}
          onChange={setWager}
        />
        <GambaUi.Button disabled={!isGameReady || flipping} onClick={() => setSide(side === 'heads' ? 'tails' : 'heads')}>
          <CoinOptionContainer>
            <img height="20px" src={side === 'heads' ? TEXTURE_HEADS : TEXTURE_TAILS} alt={side} />
            {side === 'heads' ? 'Heads' : 'Tails' }
          </CoinOptionContainer>
        </GambaUi.Button>
        <GambaUi.PlayButton 
          onClick={play}
          disabled={!isGameReady || flipping}
        >
          {!isWalletConnected ? 'Connect Wallet to Play' : flipping ? 'Flipping...' : 'Flip'}
        </GambaUi.PlayButton>
      </GambaUi.Portal>
    </>
  )
}

export default Flip
