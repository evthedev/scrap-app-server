import chai, {
	expect
} from 'chai'
import chaiHttp from 'chai-http'

import server from '../server'
import Image from '../models/Image'

// DB Config
import keys from '../../config/keys'

var request = require('supertest')(server);

chai.use(chaiHttp)

const mockUser = {
	name: 'Test Name',
	email: 'test5@email.com',
	password: 'Test Password'
}

let testUserId

describe('Images', () => {

	beforeEach((done) => {
		Image.deleteMany({}, (err) => {console.log(err)})
		done()
	})

	before((done) => {
			chai.request(server)
			.post('/api/users/signup')
			.send(mockUser)
			.end((err, res) => {
				expect(res.statusCode, 'Should be 200').to.equal(200)
				expect(res.body.message, 'Should succeed').to.equal('Successfully posted')
				expect(res.body.user._id, 'Should have Id').to.exist
				// Set outside testUserId
				testUserId = res.body.user._id
				done()
			})

	})

	after((done) => {
		chai.request(server)
			.delete('/api/users/' + testUserId)
			.end((err, res) => {
				expect(res.statusCode, 'Should be 200').to.equal(200)
				expect(res.body.success, 'Should succeed').to.be.true
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
				expect(res.statusCode, 'Should be 401 (Unauthorised)').to.equal(401)
				done()
			})

	})

	const auth = {}
	before((done) => {
		request
			.post('/api/users/login')
			.send(mockUser)
			.end((err, res) => {
				expect(res.statusCode, 'Should be 200 at login').to.equal(200)
				expect(res.body.token, 'Should have token').to.exist
				auth.token = res.body.token
				done()
			})
	})

	it('POST/images with auth', () => {
		const image = {
			name: 'Test Image',
			description: 'Test Description'
		}
		request
			.post('/api/images')
			.set('Authorization', auth.token)
			.send(image)
			.then((res) => {
				expect(res.statusCode, 'Should be 200 at post image').to.equal(200)
				expect(res.body.message, 'Should succeed').to.equal('Successfully posted')
				expect(res.body.image._id, 'Should have Id').to.exist
				request
					.get('/api/images')
					.end((err, res) => {
						expect(res.statusCode, 'Should be 200 at get images').to.equal(200)
						expect(res.body.length, 'Should have 1 image').to.equal(1)
					})
			})

	})

	it.only('PUT/images with auth with groupId', () => {
		const image = {
			name: 'Test Image',
			description: 'Test Description'
		}
		const groupId = 'Test Group Id'
		request
			.post('/api/images')
			.set('Authorization', auth.token)
			.send(image)
			.then((res) => {
				expect(res.statusCode, 'Should be 200 at post image').to.equal(200)
				expect(res.body.message, 'Should succeed').to.equal('Successfully posted')
				expect(res.body.image._id, 'Should have Id').to.exist
				const imageId = res.body.image._id
				request
					.put('/api/images/' + imageId)
					.send(groupId)
					.end((err, res) => {
						console.log('res.body: ', res.body);
						expect(res.statusCode, 'Should be 200 at get images').to.equal(200)
						expect(res.body.length, 'Should have 1 image').to.equal(1)
						expect(res.body.image.groupIds.length, 'Should have 1 image').to.equal(1)
						expect(res.body.image.groupIds[0], 'Should equal Test Group Id').to.equal('Test Group Id')
					})
			})

	})
})