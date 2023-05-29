import Head from 'next/head'
import { CreateButtonAndModal } from '@/features/team/CreateButtonAndModal'
import { useTeams } from '@/features/team/useTeams'
import { UpdateButtonAndModal } from '@/features/team/UpdateButtonAndModal'
import { DeleteButtonAndModal } from '@/features/team/DeleteButtonAndModal'
import { AddPlayerButtonAndModal } from '@/features/team/AddPlayerButtonAndModal'
import Link from 'next/link'

const TeamPage = () => {
  const { teams, setTeams } = useTeams()

  const removePlayer = (teamId: string, playerId: string) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        const playerCount = team.players.length - 1

        return {
          ...team,
          playerCount,
          players: team.players.filter((player) => player.id !== playerId),
        }
      }
      return team
    })
    setTeams(updatedTeams)
  }

  return (
    <>
      <Head>
        <title>Teams</title>
        <meta name='description' content='Teams' />
      </Head>
      <main className='flex flex-col gap-y-4'>
        <Link href='/'>Go to the home page</Link>
        <h1>Teams</h1>
        <CreateButtonAndModal />
        {teams.length === 0 ? (
          <p>There are no teams yet.</p>
        ) : (
          teams.map((team) => (
            <div
              key={team.id}
              className='flex flex-col gap-y-4 border border-black p-4'
            >
              <div className='flex flex-col gap-y-4'>
                <h2>Team Name = {team.name}</h2>
                <p>Player count = {team.playerCount}</p>
                <p>Region = {team.region}</p>
                <p>Country = {team.country}</p>
                <h3>Players</h3>
                <ol className='flex flex-col gap-y-4'>
                  {team.players.map((player) => (
                    <li key={player.id} className='flex gap-x-4'>
                      <span>{player.name}</span>
                      <button onClick={() => removePlayer(team.id, player.id)}>
                        Remove player
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
              <div className='flex flex-col gap-y-4'>
                <AddPlayerButtonAndModal team={team} />
                <UpdateButtonAndModal team={team} />
                <DeleteButtonAndModal id={team.id} name={team.name} />
              </div>
            </div>
          ))
        )}
      </main>
    </>
  )
}

export default TeamPage
