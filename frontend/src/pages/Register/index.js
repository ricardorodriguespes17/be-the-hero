import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logo from '../../assets/logo.svg'

import './styles.css'

import api from '../../services/api'


export default function Register() {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUF] = useState('')

  const history = useHistory()
  
  async function handleRegister(e) {
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {
      const response = await api.post('ongs', data)
      alert(`Seu id para login é: ${response.data.id}`)
      history.push('/')
    } catch (err) {
      alert('Erro no cadastro, tente novamente')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt='Be the hero' />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link to='/' className='back-link'>
            <FiArrowLeft size={16} color='#E02041' />
            Tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder='Nome da ONG'
            value={name}
            onChange={(event => setName(event.target.value))}
          />
          <input
            placeholder='Email'
            type='email'
            value={email}
            onChange={(event => setEmail(event.target.value))}
          />
          <input
            placeholder='Whatsapp'
            value={whatsapp}
            onChange={(event => setWhatsapp(event.target.value))}
          />
          <div className="input-group">
            <input
              placeholder='Cidade'
              value={city}
              onChange={(event => setCity(event.target.value))}
            />
            <input
              placeholder='UF'
              style={{ width: 80 }}
              value={uf}
              onChange={(event => setUF(event.target.value))}
            />
          </div>
          <button className="button" type='submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
