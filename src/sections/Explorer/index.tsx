import { GambaUi, TokenValue } from 'gamba-react-ui-v2'
import { useGambaEvents } from 'gamba-react-v2'
import React from 'react'
import styled from 'styled-components'
import { PLATFORM_CREATOR_ADDRESS } from '../../constants'
import { useFirebase } from '../../hooks/useFirebase'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  max-width: 1200px;
  margin: 0 auto;
`

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const LeaderboardEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1em;
`

const StatCard = styled(Card)`
  text-align: center;
  
  h3 {
    color: #888;
    margin-bottom: 0.5em;
  }
  
  .value {
    font-size: 2em;
    font-weight: bold;
    color: #ffd700;
  }
`

const MiningAnimation = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  
  &:before {
    content: "⛏️";
    position: absolute;
    animation: swing 1s infinite;
  }
  
  @keyframes swing {
    0%, 100% { transform: rotate(-20deg); }
    50% { transform: rotate(20deg); }
  }
`

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`

const PayoutAmount = styled.div<{ $win: boolean }>`
  color: ${props => props.$win ? '#4CAF50' : '#f44336'};
`

export default function Explorer() {
  const events = useGambaEvents('GameSettled', { address: PLATFORM_CREATOR_ADDRESS })
  const { getPlayerName } = useFirebase()
  const [playerNames, setPlayerNames] = React.useState<Record<string, string>>({})

  // Load player names from Firebase
  React.useEffect(() => {
    events.forEach(async (event) => {
      const address = event.data.user.toString()
      if (!playerNames[address]) {
        const name = await getPlayerName(address)
        if (name) {
          setPlayerNames(prev => ({ ...prev, [address]: name }))
        }
      }
    })
  }, [events])

  // Calculate platform stats
  const stats = React.useMemo(() => {
    return events.reduce((acc, event) => {
      const payout = event.data.payout.toNumber()
      const wager = event.data.wager.toNumber()
      
      return {
        totalGames: acc.totalGames + 1,
        totalWagered: acc.totalWagered + wager,
        totalPaidOut: acc.totalPaidOut + payout,
        totalWins: acc.totalWins + (payout > 0 ? 1 : 0),
        biggestWin: Math.max(acc.biggestWin, payout),
      }
    }, {
      totalGames: 0,
      totalWagered: 0,
      totalPaidOut: 0,
      totalWins: 0,
      biggestWin: 0,
    })
  }, [events])

  return (
    <Container>
      <h1>⛏️ Mine Vegas Stats</h1>
      
      <StatsGrid>
        <StatCard>
          <h3>Total Mining Sessions</h3>
          <div className="value">{stats.totalGames}</div>
        </StatCard>
        <StatCard>
          <h3>Successful Mines</h3>
          <div className="value">{stats.totalWins}</div>
        </StatCard>
        <StatCard>
          <h3>Mining Success Rate</h3>
          <div className="value">
            {((stats.totalWins / stats.totalGames) * 100).toFixed(1)}%
          </div>
        </StatCard>
        <StatCard>
          <h3>Biggest Mine</h3>
          <div className="value">
            <TokenValue amount={stats.biggestWin} mint={events[0]?.data.tokenMint} />
          </div>
        </StatCard>
      </StatsGrid>

      <Card>
        <h2>🏆 Today's Top Miners</h2>
        {events
          .filter(event => event.data.payout.toNumber() > 0)
          .slice(0, 10)
          .map((event, index) => {
            const address = event.data.user.toString()
            const displayName = playerNames[address] || `Miner #${index + 1}`
            
            return (
              <LeaderboardEntry key={event.signature}>
                <PlayerInfo>
                  <MiningAnimation />
                  <div>{displayName}</div>
                </PlayerInfo>
                <div>
                  <TokenValue 
                    amount={event.data.payout.toNumber()} 
                    mint={event.data.tokenMint}
                  />
                </div>
              </LeaderboardEntry>
            )
        })}
      </Card>

      <Card>
        <h2>⚡ Live Mining Activity</h2>
        {events.slice(0, 10).map((event, index) => {
          const address = event.data.user.toString()
          const displayName = playerNames[address] || `Miner #${index + 1}`
          const payout = event.data.payout.toNumber()
          
          return (
            <LeaderboardEntry key={event.signature}>
              <PlayerInfo>
                <MiningAnimation />
                <div>{displayName}</div>
              </PlayerInfo>
              <PayoutAmount $win={payout > 0}>
                <TokenValue 
                  amount={payout} 
                  mint={event.data.tokenMint} 
                />
              </PayoutAmount>
            </LeaderboardEntry>
          )
        })}
      </Card>
    </Container>
  )
}
