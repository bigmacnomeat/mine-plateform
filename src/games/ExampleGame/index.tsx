import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
`

const ComingSoonText = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

const Description = styled.p`
  font-size: 1.2rem;
  color: #cccccc;
  max-width: 600px;
  line-height: 1.6;
`

export default function ExampleGame() {
  return (
    <Container>
      <ComingSoonText>Coming Soon!</ComingSoonText>
      <Description>
        We're working hard to bring you an exciting new Blackjack experience. Stay tuned!
      </Description>
    </Container>
  )
}
