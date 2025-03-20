import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useUserStore } from '../../hooks/useUserStore'

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 15px rgba(64, 169, 255, 0.4), inset 0 0 20px rgba(64, 169, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 25px rgba(64, 169, 255, 0.6), inset 0 0 30px rgba(64, 169, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 15px rgba(64, 169, 255, 0.4), inset 0 0 20px rgba(64, 169, 255, 0.2);
  }
`

const scanlineAnimation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
`

const Welcome = styled.div`
  position: relative;
  overflow: hidden;
  padding: 2rem;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(13, 17, 23, 0.95) 0%, rgba(23, 32, 43, 0.95) 100%);
  color: white;
  margin-bottom: 2rem;
  border: 1px solid rgba(64, 169, 255, 0.3);
  box-shadow: 0 0 30px rgba(64, 169, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: ${pulse} 4s ease-in-out infinite, ${pulseAnimation} 3s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(64, 169, 255, 0.5) 50%, 
      transparent 100%
    );
    animation: ${scanline} 4s linear infinite, ${scanlineAnimation} 15s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, 
      rgba(64, 169, 255, 0.1) 0%, 
      transparent 70%
    );
    pointer-events: none;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  background: linear-gradient(135deg, #40a9ff 0%, #69c0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(64, 169, 255, 0.3);
  animation: ${float} 4s ease-in-out infinite;
`;

const Subtitle = styled.div`
  opacity: 0.7;
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.5;
  max-width: 600px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StatCard = styled.div`
  background: rgba(64, 169, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(64, 169, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(64, 169, 255, 0.15);
    border-color: rgba(64, 169, 255, 0.4);
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #40a9ff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Buttons = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  position: relative;

  @media (min-width: 800px) {
    height: 100%;
    padding: 30px;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 20px !important;
  }

  & > button {
    border: 1px solid rgba(64, 169, 255, 0.3);
    width: 100%;
    border-radius: 8px;
    padding: 12px;
    background: rgba(64, 169, 255, 0.1);
    transition: all 0.3s ease;
    color: white;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.5px;
    backdrop-filter: blur(10px);
    text-transform: uppercase;
    font-size: 0.9em;

    &:hover {
      background: rgba(64, 169, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(64, 169, 255, 0.2);
    }
  }
`;

export function WelcomeBanner() {
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const store = useUserStore()
  const copyInvite = () => {
    store.set({ userModal: true })
    if (!wallet.connected) {
      walletModal.setVisible(true)
    }
  }

  return (
    <Welcome>
      <Title>Welcome to Mine Vegas</Title>
      <Subtitle>
        Experience the future of decentralized gaming on Solana. Mine, play, and win in style.
      </Subtitle>
      <StatsGrid>
        <StatCard>
          <StatValue>9</StatValue>
          <StatLabel>Available Games</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>24/7</StatValue>
          <StatLabel>Mining Operations</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>∞</StatValue>
          <StatLabel>Potential Rewards</StatLabel>
        </StatCard>
      </StatsGrid>
      <Buttons>
        <button onClick={copyInvite}>
          💸 Copy Invite
        </button>
        <button onClick={() => window.open('https://jup.ag/swap/SOL-GaHu73uhhWrcGLF3CWUi26ZBzv5mZAy8PLrvzoM5XMZh', '_blank')}>
          Buy $MINE
        </button>
        <button onClick={() => window.open('https://discord.gg/zsZcPCk6Ha', '_blank')}>
          💬 Discord
        </button>
      </Buttons>
    </Welcome>
  )
}
