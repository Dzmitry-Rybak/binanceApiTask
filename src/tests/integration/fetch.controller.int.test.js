import request from 'supertest'
import app from "../..";
import btc from '../mock-data/btc.json'

const endpointUrl = '/depth'

describe(endpointUrl, () => {
    if("GET", async () => {
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200)
    })
})