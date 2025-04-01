import {lazy} from 'react'
export default function l(path) {
  return lazy(() => import(path))
}
