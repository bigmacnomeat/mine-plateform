import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Jackpot } from '../Jackpot'
import TokenSelect from '../TokenSelect'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  position: relative;
  z-index: 10;
`

const Logo = styled(Link)`
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    text-decoration: none;
  }
`

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const WalletButtonWrapper = styled.div`
  .wallet-adapter-button {
    height: 48px !important;
    padding: 0 24px !important;
    background-color: #03ffa4 !important;
    border: none !important;
    color: black !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    border-radius: 8px !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.2s ease !important;
    position: relative !important;
    z-index: 11 !important;
  }

  .wallet-adapter-button:hover {
    opacity: 0.9 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 5px 15px rgba(3, 255, 164, 0.2) !important;
  }

  .wallet-adapter-button-trigger {
    background-color: #03ffa4 !important;
  }

  .wallet-adapter-button[disabled] {
    background: rgba(255, 255, 255, 0.1) !important;
    color: rgba(255, 255, 255, 0.5) !important;
    cursor: not-allowed !important;
    transform: none !important;
  }

  .wallet-adapter-button img {
    width: 20px !important;
    height: 20px !important;
    margin-right: 8px !important;
  }

  .wallet-adapter-dropdown {
    position: relative !important;
    z-index: 12 !important;
  }

  .wallet-adapter-dropdown-list {
    position: absolute !important;
    z-index: 13 !important;
  }
`

const Header = () => {
  const isMobile = useMediaQuery('sm')
  const { connected } = useWallet()

  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoImage src="/mine.png" alt="Mine Vegas Logo" />
        {!isMobile && 'Mine Vegas'}
      </Logo>
      <RightSection>
        {connected && <Jackpot />}
        {connected && <TokenSelect />}
        <WalletButtonWrapper>
          <WalletMultiButton />
        </WalletButtonWrapper>
      </RightSection>
    </HeaderContainer>
  )
}

export default Header
