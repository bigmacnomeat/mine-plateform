import { ref, set, get } from 'firebase/database';
import { database } from '../firebase';
import { PublicKey } from '@solana/web3.js';

export async function updateGameStats(
  walletAddress: PublicKey,
  earnedAmount: number,
) {
  if (!walletAddress) return;

  const playerRef = ref(database, `players/${walletAddress.toString()}`);
  const leaderboardRef = ref(database, `leaderboard/${walletAddress.toString()}`);
  
  try {
    // Get current stats
    const snapshot = await get(playerRef);
    const currentStats = snapshot.val() || { todayEarned: 0 };
    const today = new Date().toISOString().split('T')[0];
    
    // Reset if it's a new day
    const todayEarned = currentStats.date === today 
      ? Math.min(currentStats.todayEarned + earnedAmount, 6900)
      : earnedAmount;

    // Update player data
    await set(playerRef, {
      walletAddress: walletAddress.toString(),
      todayEarned,
      date: today,
      lastUpdated: Date.now()
    });

    // Update leaderboard
    await set(leaderboardRef, {
      walletAddress: walletAddress.toString(),
      todayEarned,
      lastUpdated: Date.now()
    });
  } catch (error) {
    console.error('Error updating game stats:', error);
  }
}
