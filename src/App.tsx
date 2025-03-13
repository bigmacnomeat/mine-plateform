import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { Modal } from './components/Modal'
import { TERMS_OF_SERVICE } from './constants'
import { useUserStore } from './hooks/useUserStore'
import Header from './sections/Header/index'
import Dashboard from './sections/Dashboard/Dashboard'
import Game from './sections/Game/Game'
import RecentPlays from './sections/RecentPlays/RecentPlays'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(17, 17, 17, 0.8);
  color: white;
  position: relative;
  z-index: 1;
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 2;
`

const WelcomeContent = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin: 20px 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  position: relative;
  z-index: 3;
`

const RecentPlaysTitle = styled.h2`
  text-align: center;
  margin: 20px 0;
  color: white;
`

const AcceptButton = styled.button`
  background: #03ffa4;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

function App() {
  const { newcomer, set } = useUserStore()

  return (
    <>
      {newcomer && (
        <Modal onClose={() => set({ newcomer: false })}>
          <h1>Welcome to Mine Vegas</h1>
          <WelcomeContent>
            <div dangerouslySetInnerHTML={{ __html: TERMS_OF_SERVICE }} />
          </WelcomeContent>
          <AcceptButton onClick={() => set({ newcomer: false })}>
            Accept & Continue
          </AcceptButton>
        </Modal>
      )}
      <AppWrapper>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:gameId" element={<Game />} />
          </Routes>
          <RecentPlaysTitle>Recent Plays</RecentPlaysTitle>
          <RecentPlays />
        </MainContent>
      </AppWrapper>
    </>
  )
}

export default App
