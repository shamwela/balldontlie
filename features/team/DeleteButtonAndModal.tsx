import Modal from 'react-modal'
import { useDisclosure } from '../disclosure/useDisclosure'
import { useTeams } from './useTeams'
import { useRouter } from 'next/router'

type DeleteButtonAndModalProps = {
  id: string
  name: string
}

export const DeleteButtonAndModal = ({
  id,
  name,
}: DeleteButtonAndModalProps) => {
  const { isOpened, open, close } = useDisclosure()
  const { teams, setTeams } = useTeams()
  const router = useRouter()

  const handleDelete = () => {
    setTeams(teams.filter((team) => team.id !== id))
    close()
    router.reload()
  }

  return (
    <div>
      <button onClick={open}>Delete team</button>
      <Modal isOpen={isOpened} onRequestClose={close} ariaHideApp={false}>
        <p>Are you sure you want to delete the team {name}?</p>
        <div className='flex gap-x-4'>
          <button onClick={close}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}
