import request  from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll( async () => {
    await app.close()
  })

  it('should by able to search create gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
    .post('/api/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'JavaScript Gym',
      description: 'Gym nr 02',
      phone: null,
      latitude: -30.015488,
      longitude: -51.1967232,
    })

    await request(app.server)
    .post('/api/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'TypeScript Gym',
      description: 'Gym nr 03',
      phone: null,
      latitude: -30.015488,
      longitude: -51.1967232,        
    })

    const response = await request(app.server)
      .get('/api/gyms/search')
      .query({ query: 'JavaScript' })
      .set('Authorization', `Bearer ${token}`)
      .send()
    
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      })
    ])
  })
})