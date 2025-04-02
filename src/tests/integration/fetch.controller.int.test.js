const request = require('supertest')
const app = require('../../index')

const endpointUrl = '/depth'

describe(endpointUrl, () => {
    it('GET', async () => {
        const response = await request(app).get(endpointUrl)
        expect(response.statusCode).toBe(200)
    })

    it('should return 404 error', async () => {
        const response = await request(app).get(endpointUrl)
    })
})
