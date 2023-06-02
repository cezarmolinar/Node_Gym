import request  from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll( async () => {
    await app.close()
  })

  it('should by able to list nearby gyms', async () => {
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
      latitude: -35.015488,
      longitude: -45.1967232,        
    })

    const response = await request(app.server)
      .get('/api/gyms/nearby')
      .query({ 
        userLatitude: -35.015488, 
        userLongitude: -45.1967232, 
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym',
      })
    ])
  })
})