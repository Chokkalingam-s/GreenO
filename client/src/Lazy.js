import {lazy} from 'react'
export default function l(path) {
  lazy(() => import(path))
}
