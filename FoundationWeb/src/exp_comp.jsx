import { lazy } from 'react'

const NavBar = lazy(() => import('./components/nav/NavBar'))
const Layout = lazy(() => import('./components/Layout'))
const Footer = lazy(() => import('./components/Footer'))
const Card = lazy(() => import('./components/Card'))

const Home = lazy(() => import('./components/pages/HomePage'))
const GreenO = lazy(() => import('./components/pages/GreenO'))

export { NavBar, Layout, Home, Footer, Card,GreenO }
