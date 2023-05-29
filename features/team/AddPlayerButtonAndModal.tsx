import { useDisclosure } from '../disclosure/useDisclosure'
import Modal from 'react-modal'
import { usePlayers } from '../player/usePlayers'
import { getErrorComponent } from '../error/getErrorComponent'
import { type Team, useTeams } from './useTeams'
import { type FormEvent } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

export const AddPlayerButtonAndModal = ({ team }: { team: Team }) => {
  const { isOpened, open, close } = useDisclosure()
  const { isError, error, isLoading, data } = usePlayers()
  const { teams, setTeams } = useTeams()
  const router = useRouter()

  if (isError) {
    return getErrorComponent(error)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    type Input = {
      player: {
        value: string
      }
    }
    const target = event.target as typeof event.target & Input

    const id = uuid()
    const name = target.player.value
    const player = { id, name }

    // The player must be in no more than one team.
    let isAlreadyInTeam = false
    teams.forEach((team) => {
      team.players.forEach((player) => {
        if (player.name === name) {
          isAlreadyInTeam = true
        }
      })
    })
    if (isAlreadyInTeam) {
      alert('That player is already in a team.')
      return
    }

    const playerCount = team.players.length + 1
    const updatedTeam = {
      ...team,
      players: [...team.players, player],
      playerCount,
    }
    const updatedTeams = teams.map((team) => {
      if (team.id === updatedTeam.id) {
        return updatedTeam
      }
      return team
    })
    setTeams(updatedTeams)
    router.reload()
  }

  return (
    <div>
      <button onClick={open}>Add a player</button>
      <Modal isOpen={isOpened} onRequestClose={close} ariaHideApp={false}>
        <h1>Add a player</h1>
        <form onSubmit={handleSubmit}>
          {isLoading ? (
            <p>Loading players...</p>
          ) : (
            // I should probably implement pagination and search box here,
            // but just used the first page of the data for demo purposes.
            data.pages[0].data.map(({ id, first_name, last_name }, index) => {
              const name = `${first_name} ${last_name}`

              return (
                <div key={id}>
                  <input
                    type='radio'
                    name='player'
                    id={id.toString()}
                    value={name}
                    // Default check the first player.
                    defaultChecked={index === 0}
                  />
                  <label htmlFor={id.toString()}>{name}</label>
                </div>
              )
            })
          )}

          <div className='flex gap-x-4'>
            <button type='submit'>Submit</button>
            <button onClick={close}>Close</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
