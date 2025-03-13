import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  z-index: 1;
`

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 2;
`

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Content>
        {children}
      </Content>
    </Wrapper>
  )
}
