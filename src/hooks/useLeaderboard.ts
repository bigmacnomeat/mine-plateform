import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  walletAddress: string;
  todayEarned: number;
  lastUpdated: number;
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const leaderboardRef = ref(database, 'leaderboard');
    
    const unsubscribe = onValue(leaderboardRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      // Convert to array and sort by earnings
      const sortedLeaderboard = Object.values(data)
        .sort((a: any, b: any) => b.todayEarned - a.todayEarned)
        .slice(0, 100); // Top 100 players

      setLeaderboard(sortedLeaderboard as LeaderboardEntry[]);
    });

    return () => unsubscribe();
  }, []);

  return leaderboard;
}
