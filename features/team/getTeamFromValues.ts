import { type FormEvent, useState } from 'react'

export const getTeamFormValues = (event: FormEvent<HTMLFormElement>) => {
  type Value = { value: string }
  type Inputs = {
    name: Value
    playerCount: Value
    region: Value
    country: Value
  }
  // Should type the target with a type assertion
  const target = event.target as typeof event.target & Inputs
  const name = target.name.value
  const playerCount = parseInt(target.playerCount.value)
  const region = target.region.value
  const country = target.country.value
  return { name, playerCount, region, country }
}
