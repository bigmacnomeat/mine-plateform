import styled, { keyframes } from 'styled-components'

const jackpotGradient = keyframes`
  0% {
    background: #6666ff;
  }
  15% {
    background: #0099ff;
  }
  30% {
    background: #00ff55;
  }
  45% {
    background: #ffe44d;
  }
  60% {
    background: #ff5c4d;
  }
  75% {
    background: #ff3399;
  }
  90% {
    background: #6666ff;
  }
  100% {
    background: #6666ff;
  }
`

const skeletonAnimation = keyframes`
  0%, 100% {
    background-color: #cccccc11;
  }
  50% {
    background-color: #cccccc22;
  }
`

const jackpotAnimation = keyframes`
  0% { color: #FFD700; }
  50% { color: #FFA500; }
  100% { color: #FFD700; }
`

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1em;
`

export const Recent = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .5em;
  text-wrap: nowrap;
  padding: 1em;
  color: unset;
  text-decoration: none;
  justify-content: space-between;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

export const Skeleton = styled.div`
  height: 4em;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  animation: ${skeletonAnimation} 1s infinite;
`

export const Profit = styled.div<{ $win: boolean }>`
  display: flex;
  gap: .5em;
  align-items: center;
  background: ${props => props.$win ? '#00ff4021' : '#ffffff11'};
  border-radius: 10px;
  padding: 2px 5px;
  color: ${(props) => props.$win ? '#4CAF50' : '#f44336'};
`

export const Jackpot = styled.div`
  animation: ${jackpotAnimation} 1s infinite;
  display: flex;
  gap: .5em;
  align-items: center;
  color: black;
  border-radius: 10px;
  padding: 1px 5px;
  font-weight: bold;
`

export const PlayInfo = styled.div`
  display: flex;
  align-items: center;
  gap: .5em;
`

export const GameImage = styled.img`
  height: 1.5em;
  width: 1.5em;
  object-fit: contain;
`

export const TokenImage = styled.img`
  height: 20px;
  width: 20px;
  border-radius: 50%;
`

export const PlayerAddress = styled.div`
  color: var(--gamba-ui-primary-color);
`
