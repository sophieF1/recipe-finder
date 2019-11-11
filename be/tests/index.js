/* eslint-disable handle-callback-err */
/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const recipe = require('./recipes')
const app = require('../index')

chai.use(chaiHttp)
chai.should()
describe('Recipes', () => {
  describe('/recipes', () => {
    it('should get all recipes', (done) => {
      chai.request(app)
        .get('/recipes')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })

    it('should create a single recipe', (done) => {
      chai.request(app)
        .post('/recipes')
        .send({ recipe })
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('should remove a single recipe', (done) => {
      const id = 35  
      chai.request(app)
        .delete('/recipes' + `/${id}`)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('should update a single recipe', (done) => {
      const id = 17
      chai.request(app)
        .put('/recipes' + `/${id}`)
        .send({ 'name': 'RecipeNameUpdate' })
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})
