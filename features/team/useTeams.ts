import { useEffect, useState } from 'react'

export type Player = {
  id: string
  name: string
}

export type Team = {
  id: string
  name: string
  playerCount: number
  region: string
  country: string
  players: Player[]
}

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([])

  // Get effect
  useEffect(() => {
    const teamsInLocalStorage = localStorage.getItem('teams')
    if (teamsInLocalStorage) {
      setTeams(JSON.parse(teamsInLocalStorage))
    }
  }, [])

  // Set effect
  useEffect(() => {
    if (teams.length === 0) {
      return
    }
    localStorage.setItem('teams', JSON.stringify(teams))
  }, [teams])

  // Using an object instead of an array provides stricter type checking.
  return { teams, setTeams }
}
