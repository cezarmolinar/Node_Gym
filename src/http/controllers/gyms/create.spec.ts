import request  from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll( async () => {
    await app.close()
  })

  it('should by able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/api/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym-02',
        description: 'Gym nr 02',
        phone: null,
        latitude: -30.015488,
        longitude: -51.1967232,        
      })
      
    expect(response.statusCode).toEqual(201)
  })
})