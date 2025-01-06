import { useContext } from 'react'
import RoleContext from './RoleContext'

export function useRole() {
  return useContext(RoleContext)
}
