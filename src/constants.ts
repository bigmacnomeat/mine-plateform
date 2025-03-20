import { PublicKey } from '@solana/web3.js'
import { PoolToken, TokenMeta, makeHeliusTokenFetcher } from 'gamba-react-ui-v2'

// Platform configuration
const PLATFORM_CREATOR_ADDRESS_ENV = import.meta.env.VITE_PLATFORM_CREATOR_ADDRESS || process.env.VITE_PLATFORM_CREATOR_ADDRESS
if (!PLATFORM_CREATOR_ADDRESS_ENV) {
  console.error('Warning: VITE_PLATFORM_CREATOR_ADDRESS not found')
}

// Platform creator address - default to a test address if not set
export const PLATFORM_CREATOR_ADDRESS = new PublicKey("H9Z1NMsAXZBTgB6qWJKuXX8RoLjy7H1RNZ6xcackdLdf")

// Platform fees with defaults
export const PLATFORM_CREATOR_FEE = Number(import.meta.env.VITE_PLATFORM_CREATOR_FEE ?? 0.01)
export const PLATFORM_JACKPOT_FEE = Number(import.meta.env.VITE_PLATFORM_JACKPOT_FEE ?? 0.001)
export const PLATFORM_REFERRAL_FEE = Number(import.meta.env.VITE_PLATFORM_REFERRAL_FEE ?? 0.5)

// Platform URLs
const PLATFORM_SHARABLE_URL_ENV = import.meta.env.VITE_PLATFORM_SHARABLE_URL || process.env.VITE_PLATFORM_SHARABLE_URL
export const PLATFORM_SHARABLE_URL = PLATFORM_SHARABLE_URL_ENV || "https://mine-plateform.vercel.app"

// RPC endpoint - default to devnet
const RPC_ENDPOINT_ENV = import.meta.env.VITE_RPC_ENDPOINT || process.env.VITE_RPC_ENDPOINT
export const RPC_ENDPOINT = RPC_ENDPOINT_ENV || "https://mainnet.helius-rpc.com/?api-key=359013a5-2357-45ae-98f5-4b218037fb58"

// Firebase - make optional
const FIREBASE_DATABASE_URL_ENV = import.meta.env.VITE_FIREBASE_DATABASE_URL || process.env.VITE_FIREBASE_DATABASE_URL
export const FIREBASE_DATABASE_URL = FIREBASE_DATABASE_URL_ENV || ""

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
  lp('GaHu73uhhWrcGLF3CWUi26ZBzv5mZAy8PLrvzoM5XMZh'), // MINE token (default)
  lp('So11111111111111111111111111111111111111112'), // SOL
  lp('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC
  lp('85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ'), // Additional token
  lp('H8cstTfTxPEm5qP3UXgga8Bdzm2MCDGAghJTgovPy6Y1', 'H83nsJJe11WY7TjhiVoDq5xmiYs7rU2iY4FweJuahVz2'), // Another token pair
  lp('CLmpi9DKXHjRo5HmFsTnSkaPGSKPokEmJy3Xgtg1QZNZ', 'H9Z1NMsAXZBTgB6qWJKuXX8RoLjy7H1RNZ6xcackdLdf'), // LP Token
  lp('CyAKj2XFMq6aikXVvX1B7wHjvffx7hq8af8dpeFdHmYh', 'GqdYp5VHnph8ZTKM2zykzb6xKNR91VkuznxASVnVhmo4')  // Bonus Token
]

// The default pool to be selected
export const DEFAULT_POOL = POOLS[0]

/**
 * List of token metadata for the supported tokens
 */
export const TOKEN_METADATA: TokenMeta[] = [
  {
    mint: new PublicKey('GaHu73uhhWrcGLF3CWUi26ZBzv5mZAy8PLrvzoM5XMZh'),
    name: 'Mine Token',
    symbol: 'MINE',
    decimals: 6,
    image: 'mine.png',
    baseWager: 1e6,
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
    mint: new PublicKey('CLmpi9DKXHjRo5HmFsTnSkaPGSKPokEmJy3Xgtg1QZNZ'),
    name: 'LP Token',
    symbol: 'LP',
    decimals: 6,
    image: 'lp.png',
    baseWager: 1e6,
  },
  {
    mint: new PublicKey('CyAKj2XFMq6aikXVvX1B7wHjvffx7hq8af8dpeFdHmYh'),
    name: 'Bonus Token',
    symbol: 'BONUS',
    decimals: 6,
    image: 'bonus.png',
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
export const TOKEN_METADATA_FETCHER = makeHeliusTokenFetcher()
