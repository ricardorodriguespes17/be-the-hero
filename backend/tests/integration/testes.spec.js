const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('Tests', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "Teste",
        email: "teste@test.com",
        whatsapp: "77990232382",
        city: "Vitória da Conquista",
        uf: "BA"
      })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })

  it('should be able to logon', async () => {
    const responseCreate = await request(app)
      .post('/ongs')
      .send({
        name: "Teste",
        email: "teste@test.com",
        whatsapp: "77990232382",
        city: "Vitória da Conquista",
        uf: "BA"
      })

    expect(responseCreate.body).toHaveProperty('id')

    const response = await request(app)
      .post('/session')
      .send({
        id: responseCreate.body.id
      })

    expect(response.body).toHaveProperty('name')
  })

  it('should be able to create a new incident', async () => {
    const response = await request(app)
      .post('/incidents')
      .set('Authorization', '9bf54366')
      .send({
        "title": "Caso Teste",
        "description": "Detalhes do caso...",
        "value": 1000
      })

    expect(response.body).toHaveProperty('id')
  })
})