import { ref, set, get, onValue, off } from 'firebase/database';
import { database } from '../firebase';
import { useWalletAddress } from 'gamba-react-v2';
import { useEffect, useState } from 'react';

interface PlayerData {
  walletAddress: string;
  todayEarned: number;
  date: string;
  lastUpdated: number;
  nickname?: string;
}

interface GameStats {
  totalGames: number
  totalWins: number
  totalLosses: number
  biggestWin: number
  lastPlayed: number
}

interface JackpotData {
  balance: number
  lastWinner?: string
  lastWinAmount?: number
  lastUpdated: number
}

export function useFirebase() {
  const walletAddress = useWalletAddress();
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  // Update player data
  const updatePlayerData = async (earned: number) => {
    if (!walletAddress) return;
    
    const today = new Date().toISOString().split('T')[0];
    const data: PlayerData = {
      walletAddress: walletAddress.toString(),
      todayEarned: earned,
      date: today,
      lastUpdated: Date.now()
    };

    try {
      // Update player data
      await set(ref(database, `players/${walletAddress.toString()}`), data);
      
      // Update leaderboard
      await set(ref(database, `leaderboard/${walletAddress.toString()}`), {
        walletAddress: walletAddress.toString(),
        todayEarned: earned,
        lastUpdated: Date.now()
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const updateGameStats = async (userAddress: string, payout: number) => {
    try {
      const userRef = ref(database, `users/${userAddress}`)
      const snapshot = await get(userRef)
      const currentStats: GameStats = snapshot.val() || {
        totalGames: 0,
        totalWins: 0,
        totalLosses: 0,
        biggestWin: 0,
        lastPlayed: Date.now(),
      }

      const newStats = {
        totalGames: currentStats.totalGames + 1,
        totalWins: currentStats.totalWins + (payout > 0 ? 1 : 0),
        totalLosses: currentStats.totalLosses + (payout <= 0 ? 1 : 0),
        biggestWin: Math.max(currentStats.biggestWin, payout),
        lastPlayed: Date.now(),
      }

      await set(userRef, newStats)

      // Update jackpot with a portion of the bet
      if (true) { // PLATFORM_JACKPOT_FEE > 0
        const jackpotContribution = Math.floor(Math.abs(payout) * 0.1) // PLATFORM_JACKPOT_FEE
        await updateJackpotBalance(jackpotContribution)
      }
    } catch (error) {
      console.error('Error updating game stats:', error)
    }
  }

  const updateJackpotBalance = async (amount: number) => {
    try {
      const jackpotRef = ref(database, 'jackpot')
      const snapshot = await get(jackpotRef)
      const currentJackpot: JackpotData = snapshot.val() || {
        balance: 0,
        lastUpdated: Date.now(),
      }

      await set(jackpotRef, {
        ...currentJackpot,
        balance: currentJackpot.balance + amount,
        lastUpdated: Date.now(),
      })
    } catch (error) {
      console.error('Error updating jackpot:', error)
    }
  }

  const setJackpotWinner = async (winnerAddress: string, amount: number) => {
    try {
      const jackpotRef = ref(database, 'jackpot')
      await set(jackpotRef, {
        balance: 0, // Reset jackpot after win
        lastWinner: winnerAddress,
        lastWinAmount: amount,
        lastUpdated: Date.now(),
      })
    } catch (error) {
      console.error('Error setting jackpot winner:', error)
    }
  }

  const subscribeToData = <T>(path: string, callback: (data: T) => void) => {
    const dataRef = ref(database, path)
    onValue(dataRef, (snapshot) => {
      callback(snapshot.val())
    })

    return () => {
      off(dataRef)
    }
  }

  const getPlayerName = async (address: string) => {
    const playerRef = ref(database, `players/${address}`)
    return new Promise<string | null>((resolve) => {
      onValue(playerRef, (snapshot) => {
        const data = snapshot.val() as PlayerData | null
        resolve(data?.nickname || null)
      }, { onlyOnce: true })
    })
  }

  const setPlayerName = async (address: string, nickname: string) => {
    const playerRef = ref(database, `players/${address}`)
    await set(playerRef, {
      ...playerData,
      nickname
    })
  }

  // Listen to player data changes
  useEffect(() => {
    if (!walletAddress) return;

    const playerRef = ref(database, `players/${walletAddress.toString()}`);
    const unsubscribe = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      setPlayerData(data);
    });

    return () => unsubscribe();
  }, [walletAddress]);

  return {
    playerData,
    updatePlayerData,
    updateGameStats,
    updateJackpotBalance,
    setJackpotWinner,
    subscribeToData,
    getPlayerName,
    setPlayerName
  };
}
