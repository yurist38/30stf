var chai     = require('chai'),
    expect   = require('chai').expect,
    chaiHttp = require('chai-http'),
    routes   = require('../js/routes'),
    app      = require('../app'),
    sinon    = require('sinon'),
    controller = require('../js/controller');

chai.use(chaiHttp);

describe('Check routes...', function() {

    describe('/index', function() {
        it('Get returns status code 200 and type html', function(done) {
            chai.request(app).get('/index').end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.type).to.equal('text/html');
                done();
            });
        });
    });

    describe('/tickets', function() {
        it('Get returns status code 200 and type html', function(done) {
            chai.request(app).get('/tickets').end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.type).to.equal('text/html');
                done();
            });
        });
        it('Post valid ticket return success', function(done) {
            var ticket = {
                ticketName: 'Michael Jackson',
                ticketDate: '12/06/2099'
            };
            chai.request(app).post('/tickets').send(ticket).end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body.status).to.equal('success');
                done();
            });
        });
        it('Post empty ticket return error', function(done) {
            chai.request(app).post('/tickets').end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body.status).to.equal('Data is not valid!');
                done();
            });
        });
        it('Post malformed ticket return error', function(done) {
            var ticket = {
                ticketName: 'Bob Marley',
                ticketDate: 'wrong-date'
            };
            chai.request(app).post('/tickets').send(ticket).end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body.status).to.equal('Data is not valid!');
                done();
            });
        });
    });

    describe('/tickets/add', function() {
        it('Get returns status code 200 and type html', function(done) {
            chai.request(app).get('/tickets/add').end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.type).to.equal('text/html');
                done();
            });
        });
    });

});
