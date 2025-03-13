import { PublicKey } from '@solana/web3.js'
import { FAKE_TOKEN_MINT, PoolToken, TokenMeta, makeHeliusTokenFetcher } from 'gamba-react-ui-v2'

// Platform configuration
if (!import.meta.env.VITE_PLATFORM_CREATOR_ADDRESS) {
  throw new Error('VITE_PLATFORM_CREATOR_ADDRESS is required in .env')
}

// Platform creator address
export const PLATFORM_CREATOR_ADDRESS = new PublicKey(import.meta.env.VITE_PLATFORM_CREATOR_ADDRESS)

// Platform fees
export const PLATFORM_CREATOR_FEE = Number(import.meta.env.VITE_PLATFORM_CREATOR_FEE ?? 0.01)
export const PLATFORM_JACKPOT_FEE = Number(import.meta.env.VITE_PLATFORM_JACKPOT_FEE ?? 0.001)
export const PLATFORM_REFERRAL_FEE = Number(import.meta.env.VITE_PLATFORM_REFERRAL_FEE ?? 0.5)

// Platform URLs
if (!import.meta.env.VITE_PLATFORM_SHARABLE_URL) {
  throw new Error('VITE_PLATFORM_SHARABLE_URL is required in .env')
}

export const PLATFORM_SHARABLE_URL = import.meta.env.VITE_PLATFORM_SHARABLE_URL

// RPC endpoint
if (!import.meta.env.VITE_RPC_ENDPOINT) {
  throw new Error('VITE_RPC_ENDPOINT is required in .env')
}

export const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT

// Firebase
if (!import.meta.env.VITE_FIREBASE_DATABASE_URL) {
  throw new Error('VITE_FIREBASE_DATABASE_URL is required in .env')
}

export const FIREBASE_DATABASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL

/** If the user should be able to revoke an invite after they've accepted an invite */
export const PLATFORM_ALLOW_REFERRER_REMOVAL = true

// Just a helper function
const lp = (tokenMint: PublicKey | string, poolAuthority?: PublicKey | string): PoolToken => ({
  token: new PublicKey(tokenMint),
  authority: poolAuthority !== undefined ? new PublicKey(poolAuthority) : undefined,
})

/**
 * List of pools supported by this platform
 */
export const POOLS = [
  // Fake token:
  lp(FAKE_TOKEN_MINT),
  // SOL:
  lp('So11111111111111111111111111111111111111112'),
  // USDC:
  lp('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
  // Wormhole:
  lp('85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ'),
  lp('H8cstTfTxPEm5qP3UXgga8Bdzm2MCDGAghJTgovPy6Y1', 'H83nsJJe11WY7TjhiVoDq5xmiYs7rU2iY4FweJuahVz2'),
  lp('GaHu73uhhWrcGLF3CWUi26ZBzv5mZAy8PLrvzoM5XMZh'), // MINE token
]

// The default pool to be selected
export const DEFAULT_POOL = POOLS[0]

/**
 * List of token metadata for the supported tokens
 */
export const TOKEN_METADATA: TokenMeta[] = [
  {
    mint: FAKE_TOKEN_MINT,
    name: 'Fake',
    symbol: 'FAKE',
    image: '/fakemoney.png',
    baseWager: 1e9,
    decimals: 9,
  },
  {
    mint: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
    image: '/sol.png',
    baseWager: 1e9,
  },
  {
    mint: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    image: '/usdc.png',
    baseWager: 1e6,
  },
  {
    mint: new PublicKey('85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ'),
    name: 'Wormhole',
    symbol: 'Wormhole',
    decimals: 6,
    image: 'https://wormhole.com/token.png',
    baseWager: 1e6,
  },
  {
    mint: new PublicKey('GaHu73uhhWrcGLF3CWUi26ZBzv5mZAy8PLrvzoM5XMZh'),
    name: 'Mine Token',
    symbol: 'MINE',
    decimals: 6,
    image: 'mine.png',
    baseWager: 1e6,
  },
]

// Terms of service
export const TERMS_OF_SERVICE = `
  <p><b>1. Age Restriction:</b> Must be 18+ to play.</p>
  <p><b>2. Compliance:</b> Follow all local laws and regulations.</p>
  <p><b>3. Fairness:</b> Games use verifiable randomness.</p>
  <p><b>4. Risk:</b> Only play with what you can afford to lose.</p>
  <p><b>5. Privacy:</b> Your data is protected and secure.</p>
  <p><b>6. Fees:</b> Platform fees are transparent and fair.</p>
  <p><b>7. Support:</b> Contact us for any issues.</p>
  <p><b>8. Responsible Gaming:</b> Play responsibly; seek help if needed.</p>
`

// The default token metadata fetcher
export const TOKEN_METADATA_FETCHER = () => {
  return {
    fetchTokenMetadata: async () => {
      return TOKEN_METADATA
    }
  }
}
