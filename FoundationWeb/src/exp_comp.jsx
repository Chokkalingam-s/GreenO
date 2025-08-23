import {lazy} from 'react'

const Layout = lazy(() => import('./components/Layout'))
const Footer = lazy(() => import('./components/Footer'))
const Card = lazy(() => import('./components/Card'))

const Home = lazy(
  () => import('./components/pages/HomePage')
)
const GreenO = lazy(
  () => import('./components/pages/GreenO')
)
const Branch = lazy(() => import('./components/Branch'))
const Item = lazy(() => import('./components/Item'))
const Timeline = lazy(() => import('./components/Timeline'))
const About = lazy(
  () => import('./components/pages/AboutUs')
)
const Contact = lazy(
  () => import('./components/pages/Contact')
)

export {
  Layout,
  Home,
  Footer,
  Card,
  GreenO,
  Branch,
  Item,
  Timeline,
  About,
  Contact
}
