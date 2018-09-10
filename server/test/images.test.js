import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import server from '../server'
import Image from '../models/Image'

chai.use(chaiHttp)

describe('Images', () => {

	beforeEach((done) => {
		Image.deleteMany({}, (err) => {
			done()
		})
	})

	it('GET/images', (done) => {
		chai.request(server)
		.get('/api/images')
		.end((err, res) => {
			expect(res.statusCode, 'Should be 200').to.equal(200)
			done()
		})
	})

	it('POST/images', (done) => {
		const image = {
			name: 'Test Image',
			description: 'Test Description'
		}
		
		// Post 1 image
		chai.request(server)
		.post('/api/images')
		.send(image)
		.end((err, res) => {
			expect(res.statusCode, 'Should be 200').to.equal(200)
			expect(JSON.parse(res.res.text).message, 'Should succeed').to.equal('Successfully posted')
			expect(JSON.parse(res.res.text).image._id, 'Should have Id').to.exist
		})

		// Test to get posted image
		chai.request(server)
		.get('/api/images')
		.end((err, res) => {
			expect(res.statusCode, 'Should be 200').to.equal(200)
			expect(JSON.parse(res.res.text).length, 'Should have 1 image').to.equal(1)
			done()
		})
	})
})