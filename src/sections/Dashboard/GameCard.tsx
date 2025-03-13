import { GameBundle } from 'gamba-react-ui-v2'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const shine = keyframes`
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
`;

const float = keyframes`
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-10px) scale(1.02); }
  100% { transform: translateY(0px) scale(1); }
`;

const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { opacity: 0.3; }
`;

const StyledGameCard = styled(NavLink)<{$small: boolean, $background: string, $image: string}>`
  width: 100%;
  @media (min-width: 800px) {
    width: 100%;
  }

  aspect-ratio: ${(props) => props.$small ? '1/.5' : '1/.6'};
  border-radius: 15px;
  color: white;
  text-decoration: none;
  font-size: 24px;
  position: relative;
  transform: scale(1);
  background: ${(props) => props.$background};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    background-size: 200% 100%;
    animation: ${shine} 8s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, 
      rgba(255, 255, 255, 0.3) 0%, 
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 
      0 20px 30px rgba(0, 0, 0, 0.2),
      0 0 30px rgba(255, 255, 255, 0.1);

    &::before, &::after {
      opacity: 1;
    }

    .image {
      transform: scale(0.95) translateY(-5px);
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
    }

    .play {
      opacity: 1;
      transform: translateY(0);
    }

    .game-stats {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .background {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, 
      rgba(255, 255, 255, 0.1) 0%, 
      transparent 70%
    );
    animation: ${pulse} 4s ease-in-out infinite;
  }

  .image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 85% auto;
    background-position: center;
    background-repeat: no-repeat;
    transform: scale(0.9);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
    background-image: url(${props => props.$image});
  }

  .play {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(255, 255, 255, 0.9);
    color: #000;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .game-stats {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.6);
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 14px;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
`

export function GameCard({ game }: {game: GameBundle}) {
  const small = useLocation().pathname !== '/'
  return (
    <StyledGameCard
      to={'/' + game.id}
      $small={small ?? false}
      $background={game.meta?.background}
      $image={game.meta.image}
    >
      <div className="background" />
      <div className="image" />
      <div className="play">Play {game.meta.name}</div>
      <div className="game-stats">
        <span>⚡ Popular</span>
      </div>
    </StyledGameCard>
  )
}
