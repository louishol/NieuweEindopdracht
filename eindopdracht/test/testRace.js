process.env.NODE_ENV = 'test';
var app = require('../app');
var UserSchema = require('mongoose').model('User');
var RaceSchema = require('mongoose').model('Race');
var request = require('supertest');
var passportStub = require('passport-stub');
var testdata = require('./testData');
var expect = require('chai').expect;

passportStub.install(app);


describe('Test for race routing', function(){
	describe('Races', function(){
		beforeEach(function(done){
			testdata.fillTestdata(done);
		});

		it('Get races should return 200 status when getting races', function(done){
			request(app)
				.get('/races')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				})
		});
		it('Get races should return 5 races', function(done){
			request(app)
				.get('/races')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					expect(res.body).to.have.length(5);
					done();
				});
		});

		it('Post race should return 401 (Unauthorized) status when not logged in as user', function(done){
			request(app)
				.post('/races')
				.expect(401)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});
		});
		it('Post race should return 200 status when logged in as admin', function(done){


			var user = new UserSchema();
			user.firstName = "Louis";
			user.middleName = "";
			user.lastName = "Hol";
			user.age = 20;
			user.admin = true;

			passportStub.login(user);

			request(app)
				.post('/races')
				.send({ name: 'Hello', description: 'World', startdatum: "2015-10-10", status: "Open"})
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});
		});


		it('Get one race should return 200 status ', function(done){

			RaceSchema.findOne({name: 'Race 1'}, function(err,obj) { 

			request(app)
				.get('/races/'+obj._id)
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});

			 });
		});

		it('Delete one race should return 401 (Unauthorized) status ', function(done){

			passportStub.logout();
			RaceSchema.findOne({name: 'Race 1'}, function(err,obj) { 

			request(app)
				.delete('/races/'+obj._id)
				.expect(401)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});

			 });
		});

		it('Delete one race should return 200 status when logged in as amdin ', function(done){

			var user = new UserSchema();
			user.firstName = "Louis";
			user.middleName = "";
			user.lastName = "Hol";
			user.age = 20;
			user.admin = true;

			passportStub.login(user);

			RaceSchema.findOne({name: 'Race 1'}, function(err,obj) { 

			request(app)
				.delete('/races/'+obj._id)
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});

			 });
		});


	});
});