import React from 'react'
import Header from "../components/Header"
import Products from './Products'
import Footer from '../components/Footer'
import About from './About'
import Contact from './Contact'

const Home = () => {
  return (
    <div>
      <Header />
      <Products />
      <About />
      <Contact />
    </div>
  )
}

export default Home