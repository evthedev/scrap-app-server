import chai, {
	expect
} from 'chai'
import chaiHttp from 'chai-http'

import server from '../server'
import Project from '../models/Project'

// DB Config
import keys from '../../config/keys'

var request = require('supertest')(server);

chai.use(chaiHttp)

const mockUser = {
	name: 'Test Name',
	email: 'test4@email.com',
	password: 'Test Password'
}

let testUserId

describe('Projects', () => {

	before((done) => {
		Project.deleteMany({}, (err) => {})
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

	it('GET/projects', (done) => {
		chai.request(server)
			.get('/api/projects')
			.end((err, res) => {
				expect(res.statusCode, 'Should be 200').to.equal(200)
				done()
			})
	})


	it('POST/projects without auth', (done) => {
		const project = {
			name: 'Test Project',
			description: 'Test Description'
		}

		chai.request(server)
			.post('/api/projects')
			.send(project)
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

	it('POST/projects with auth', () => {
		const project = {
			name: 'Test Project',
			description: 'Test Description'
		}
		request
			.post('/api/projects')
			.set('Authorization', auth.token)
			.send(project)
			.then((res) => {
				expect(res.statusCode, 'Should be 200 at post project').to.equal(200)
				expect(res.body.message, 'Should succeed').to.equal('Successfully posted')
				expect(res.body.project._id, 'Should have Id').to.exist
				request
					.get('/api/projects')
					.end((err, res) => {
						expect(res.statusCode, 'Should be 200 at get projects').to.equal(200)
						expect(res.body.length, 'Should have 1 project').to.equal(1)
					})
			})

	})
})