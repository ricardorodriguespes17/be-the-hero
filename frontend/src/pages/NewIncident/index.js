import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logo from '../../assets/logo.svg'

import './styles.css'
import api from '../../services/api'

export default function NewIncident() {

  const [title, setTitle] = useState('') 
  const [description, setDescription] = useState('') 
  const [value, setValue] = useState('') 

  const ongId = localStorage.getItem('ongId')

  const history = useHistory()

  async function handleCreateIncident(event) {
    event.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })

      history.push('/profile')
    } catch (error) {
      alert('Erro ao criar o caso')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt='Be the hero' />
          <h1>Cadastro novo caso</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link to='/profile' className='back-link'>
            <FiArrowLeft size={16} color='#E02041' />
            Voltar para a home
          </Link>
        </section>
        <form onSubmit={handleCreateIncident}>
          <input 
            placeholder='Título do caso'
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <textarea 
            placeholder='Descrição'
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <input 
            placeholder='Valor em reais' 
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <button 
            className="button" 
            type='submit'>
          Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
