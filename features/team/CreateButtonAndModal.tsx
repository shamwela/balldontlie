// Since the create button and modal share common state,
// they should be in the same component.
import Modal from 'react-modal'
import { useDisclosure } from '../disclosure/useDisclosure'
import { type FormEvent, useState } from 'react'
import { useTeams } from './useTeams'
import { v4 as uuid } from 'uuid'
import { Error } from '../error/Error'
import { useRouter } from 'next/router'
import { getTeamFormValues } from './getTeamFromValues'

export const CreateButtonAndModal = () => {
  const { isOpened, open, close } = useDisclosure()
  const { teams, setTeams } = useTeams()
  const [nameError, setNameError] = useState('')
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { name, playerCount, region, country } = getTeamFormValues(event)
    const names = teams.map((team) => team.name)
    let alreadyExists = false
    for (const existingName of names) {
      // Should ignore case when comparing.
      if (existingName.toLowerCase() === name.toLowerCase()) {
        alreadyExists = true
      }
    }
    if (alreadyExists) {
      setNameError('A team with that name already exists.')
      return
    }

    const id = uuid()
    const newTeam = { id, name, playerCount, region, country, players: [] }
    const newTeams = [...teams, newTeam]
    setTeams(newTeams)
    // Since it uses the local storage, we should reload.
    router.reload()
  }

  return (
    <div>
      <button onClick={open}>Create a new team</button>
      <Modal isOpen={isOpened} onRequestClose={close} ariaHideApp={false}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              name='name'
              id='name'
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
              type='number'
              min={0}
              required
              aria-required
            />
          </div>

          <div>
            <label htmlFor='region'>Region</label>
            <input
              name='region'
              id='region'
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
              type='text'
              autoComplete='off'
              required
              aria-required
            />
          </div>

          <button type='submit'>Create a new team</button>
        </form>
        <button onClick={close}>Close</button>
      </Modal>
    </div>
  )
}
