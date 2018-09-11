import chai, { expect } from 'chai'
import jsonwebtoken from 'jsonwebtoken'
import request from 'supertest'
import chaiHttp from 'chai-http'

import server from '../server'
import Image from '../models/Image'
import User from '../models/User'

// DB Config
import keys from '../../config/keys'

chai.use(chaiHttp)

const mockUser = {
	name: 'Test Name',
	email: 'test14@email.com',
	password: 'Test Password'
}

let testUserId

describe('Images', () => {

	before((done) => {
		Image.deleteMany({}, (err) => {
		})
		chai.request(server)
			.post('/api/users/signup')
			.send(mockUser)
			.end((err, res) => {
				console.log('res: ', res.res.text);
				expect(res.statusCode, 'Should be 200').to.equal(200)
				expect(JSON.parse(res.res.text).message, 'Should succeed').to.equal('Successfully posted')
				expect(JSON.parse(res.res.text).user._id, 'Should have Id').to.exist
				// Set outside testUserId
				testUserId = JSON.parse(res.res.text).user._id
				done()
			})

	})

	after((done) => {
		chai.request(server)
			.delete('/api/users/' + testUserId)
			.end((err, res) => {
				expect(res.statusCode, 'Should be 200').to.equal(200)
				expect(JSON.parse(res.res.text).success, 'Should succeed').to.be.true
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


	it('POST/images without auth', (done) => {
		const image = {
			name: 'Test Image',
			description: 'Test Description'
		}

		chai.request(server)
		.post('/api/images')
		.send(image)
		.end((err, res) => {
			expect(res.statusCode, 'Should be 403').to.equal(401)
			// expect(JSON.parse(res.res.text).message, 'Should succeed').to.equal('Successfully posted')
			// expect(JSON.parse(res.res.text).image._id, 'Should have Id').to.exist
			done()
		})

	})

	xit('POST/images with auth', (done) => {
		const image = {
			name: 'Test Image',
			description: 'Test Description'
		}

		// Get access token based on id
		const token = jsonwebtoken.sign({ id: testUserId }, keys.secretOrKey, { expiresIn: 3600 })
		console.log('token: ', token);

		chai.request(server)
		.post('/api/images')
		.send(image)
		.auth('test13@email.com', 'Test Password')
		.end((err, res) => {
			console.log('res: ', res.res.text);
			expect(res.statusCode, 'Should be 200 at post image').to.equal(200)
			expect(JSON.parse(res.res.text).message, 'Should succeed').to.equal('Successfully posted')
			expect(JSON.parse(res.res.text).image._id, 'Should have Id').to.exist
			done()
		})

		// Test to get posted image
		chai.request(server)
		.get('/api/images')
		.end((err, res) => {
			expect(res.statusCode, 'Should be 200 at get images').to.equal(200)
			expect(JSON.parse(res.res.text).length, 'Should have 1 image').to.equal(1)
			done()
		})
	})
})