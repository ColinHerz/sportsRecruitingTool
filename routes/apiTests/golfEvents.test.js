const supertest = require('supertest');
let app = require('../../app.js');
let mongoose = require('mongoose');

afterAll((done) => {
    mongoose.connection.close();
    done();
});

beforeAll(function (done) {
    app.on("appStarted", function () {
        done();
    });
});

describe("Testing the golf match API", () => {
    var cookie;
    var eventID;

    it("tests the login route and returns 200 for login success, gives me token for other tests", async done => {
        const response = await supertest(app).post('/api/users/login').send({
            "email": "colinherzberg21@gmail.com",
            "password": "test"
        });
        expect(response.status).toEqual(200);
        cookie = response
            .headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
            .join(';');
        done()
    });

    it("tests the create golf event route and returns 200 for status, we will store the id for later access", async done => {
        const response = await supertest(app).post('/api/golf/createGolfEvent').send({
            "eventName": "testing",
            "startDate": "4/1/1000",
            "endDate": "4/2/3000",
            "course": "5e8ba71e1bb47b04f8b24cb2",
            "players": ["test@hotmail.com"]
        }).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        eventID = response.body.event;
        done()
    });

    it("tests the add score to event route and returns 200 for status", async done => {
        const response = await supertest(app).post('/api/golf/postEventScore').send({
            "event": eventID,
            "golfMatch": "5e97b6851af29603b2572a02"
        }).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        done()
    });

    it("tests the get all my golf events route and returns 200 for status", async done => {
        const response = await supertest(app).get('/api/golf/getMyEvents').set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        done()
    });

    it("tests the get event results returns 200 for status, also checks for correct json", async done => {
        const response = await supertest(app).get('/api/golf/getEventResults/' + eventID).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        done()
    });
});