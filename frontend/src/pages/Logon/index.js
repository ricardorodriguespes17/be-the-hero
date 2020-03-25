import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import './styles.css'

import logo from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

import api from '../../services/api'

export default function Logon() {

  const [id, setId] = useState('')

  const history = useHistory()

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const response = await api.post('session', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    } catch (error) {
      alert('Falha no login, tente novamente')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt='Be the hero' />
        <form>
          <h1>Faça seu Logon</h1>
          <input
            placeholder='Sua ID'
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button 
            className="button" 
            type="submit"
            onClick={handleLogin}
          >Entrar
          </button>
          <Link to='/register' className='back-link'>
            <FiLogIn size={16} color='#E02041' />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt='Heroes' />
    </div>
  )
}