import React from 'react'
import Layout from '../components/layout/Layout'
import {Link} from 'react-router-dom'
import Construct from '../images/construct.jpg'
import '../styles/Homestyles.css'

const Home = () => {
  return (
    <Layout>
        <div className='home' style={{backgroundImage:`url(${Construct})`}}>
          <div className="headerContainer">
            <h1>Modelflick</h1>
            <p>Design Assistance</p>
            <Link to="/about">
            <button>
              Get Quote!
            </button>
            </Link>
          </div>
        </div>
    </Layout>
  )
}

export default Home