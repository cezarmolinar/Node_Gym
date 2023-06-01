import request  from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll( async () => {
    await app.close()
  })

  it('should by able to autenticate', async () => {
    await request(app.server).post('/api/register').send({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    const response = await request(app.server).post('/api/sessions').send({
      email: 'johndoe@exemple.com',
      password: '123456',
    })
      
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})