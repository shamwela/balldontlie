import axios from 'redaxios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type Meta } from '@/types/Meta'

export const usePlayers = () =>
  useInfiniteQuery({
    queryKey: ['players'],
    queryFn: async ({ pageParam = 0 }) => {
      type Team = {
        id: number
        abbreviation: string
        city: string
        conference: string
        division: string
        full_name: string
        name: string
      }
      type Player = {
        id: number
        first_name: string
        last_name: string
        position: string
        height_feet: number
        height_inches: number
        weight_pounds: number
        team: Team
      }
      type ResponseType = {
        data: Player[]
        meta: Meta
      }
      const { data } = await axios.get<ResponseType>(
        `https://www.balldontlie.io/api/v1/players?page=${pageParam}&per_page=10`
      )
      // The real player data is nested inside the data object.
      return data
    },
    getPreviousPageParam: (data) => data.meta.current_page - 1,
    getNextPageParam: (data) => data.meta.next_page,
  })
