import Modal from 'react-modal'
import { useDisclosure } from '../disclosure/useDisclosure'
import { type FormEvent, useState } from 'react'
import { type Team, useTeams } from './useTeams'
import { Error } from '../error/Error'
import { useRouter } from 'next/router'
import { getTeamFormValues } from './getTeamFromValues'

export const UpdateButtonAndModal = ({ team }: { team: Team }) => {
  const { isOpened, open, close } = useDisclosure()
  const { teams, setTeams } = useTeams()

  const [nameError, setNameError] = useState('')
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { name, playerCount, region, country } = getTeamFormValues(event)
    const names = teams.map((team) => team.name)
    if (names.includes(name)) {
      setNameError('A team with that name already exists.')
      return
    }
    const newTeam = {
      // The ID and players will not change.
      id: team.id,
      players: team.players,

      // Other properties can be changed.
      name,
      playerCount,
      region,
      country,
    }
    const newTeams = teams.map((oldTeam) =>
      oldTeam.id === team.id ? newTeam : oldTeam
    )
    setTeams(newTeams)
    router.reload()
  }

  return (
    <div>
      <button onClick={open}>Update team</button>
      <Modal isOpen={isOpened} onRequestClose={close} ariaHideApp={false}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              name='name'
              id='name'
              defaultValue={team.name}
              type='text'
              autoComplete='off'
              required
              aria-required
            />
            {nameError && <Error message={nameError} />}
          </div>

          <div>
            <label htmlFor='playerCount'>Player count</label>
            <input
              name='playerCount'
              id='playerCount'
              defaultValue={team.playerCount}
              type='number'
              min={1}
              required
              aria-required
            />
          </div>

          <div>
            <label htmlFor='region'>Region</label>
            <input
              name='region'
              id='region'
              defaultValue={team.region}
              type='text'
              autoComplete='off'
              required
              aria-required
            />
          </div>

          <div>
            <label htmlFor='country'>Country</label>
            <input
              name='country'
              id='country'
              defaultValue={team.country}
              type='text'
              autoComplete='off'
              required
              aria-required
            />
          </div>

          <button type='submit'>Update</button>
        </form>
        <button onClick={close}>Close</button>
      </Modal>
    </div>
  )
}
