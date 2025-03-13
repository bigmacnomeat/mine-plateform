import { GameBundle } from 'gamba-react-ui-v2'
import React from 'react'

export const GAMES: GameBundle[] = [
  {
    id: 'dice',
    meta: {
      background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
      name: 'Crystal Dice',
      image: '/games/dice.png',
      description: 'Roll the crystalline dice in this futuristic mining game. Predict the outcome and win valuable minerals. Higher risks yield rarer gems!',
    },
    app: React.lazy(() => import('./Dice')),
  },
  {
    id: 'slots',
    meta: {
      background: 'linear-gradient(135deg, #0277bd 0%, #039be5 100%)',
      name: 'Quantum Slots',
      image: '/games/slots.png',
      description: 'Harness quantum energy in this next-gen slot machine. Match rare mineral patterns to unlock massive rewards from the space mines.',
    },
    app: React.lazy(() => import('./Slots')),
  },
  {
    id: 'flip',
    meta: {
      name: 'Binary Flip',
      description: 'A cosmic coin toss where binary choices determine your destiny. Choose between matter and antimatter to double your mining yield!',
      image: '/games/flip.png',
      background: 'linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)',
    },
    app: React.lazy(() => import('./Flip')),
  },
  {
    id: 'hilo',
    meta: {
      name: 'Mineral HiLo',
      image: '/games/hilo.png',
      description: 'Navigate through mineral densities in this high-stakes mining operation. Predict higher or lower concentrations to maximize your extraction!',
      background: 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)',
    },
    props: { logo: '/logo.svg' },
    app: React.lazy(() => import('./HiLo')),
  },
  {
    id: 'mines',
    meta: {
      name: 'Asteroid Mines',
      description: 'Extract precious resources from a dangerous asteroid field. Each successful extraction increases your reward, but beware of volatile pockets!',
      image: '/games/mines.png',
      background: 'linear-gradient(135deg, #512da8 0%, #673ab7 100%)',
    },
    app: React.lazy(() => import('./Mines')),
  },
  {
    id: 'roulette',
    meta: {
      name: 'Plasma Roulette',
      image: '/games/roulette.png',
      description: 'Experience the thrill of our plasma-powered roulette wheel. Place your bets on where the energy pulse will stabilize and win big!',
      background: 'linear-gradient(135deg, #00695c 0%, #00897b 100%)',
    },
    app: React.lazy(() => import('./Roulette')),
  },
  {
    id: 'plinko',
    meta: {
      background: 'linear-gradient(135deg, #303f9f 0%, #3949ab 100%)',
      image: '/games/plinko.png',
      name: 'Gravity Plinko',
      description: 'Drop energy cores through our quantum gravity field. Watch them navigate through crystalline pegs for potentially massive energy yields!',
    },
    app: React.lazy(() => import('./Plinko')),
  },
  {
    id: 'crash',
    meta: {
      background: 'linear-gradient(135deg, #6a1b9a 0%, #7b1fa2 100%)',
      image: '/games/crash.png',
      name: 'Quantum Crash',
      description: 'Pilot your quantum mining probe to extract maximum resources. Time your extraction perfectly before the quantum field destabilizes!',
    },
    app: React.lazy(() => import('./CrashGame')),
  },
  {
    id: 'blackjack',
    meta: {
      background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
      image: '/games/blackjack.png',
      name: 'Stellar Blackjack',
      description: 'Coming Soon! Challenge the quantum dealer in this futuristic take on classic blackjack. Win up to 2.5x your wager by achieving perfect energy alignment (21)!',
    },
    app: React.lazy(() => import('./ExampleGame')),
  },
]
