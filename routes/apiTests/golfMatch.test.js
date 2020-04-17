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
    var matchID;
    var holeID;

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

    it("tests the create golf match route and returns 200 for status, we will store the id for later access", async done => {
        const response = await supertest(app).post('/api/golf/createGolfMatch').send({
            "coursePlayed": "test",
            "GolfBagUsed": "5e8bde7169f6d508707bbb93",
            "nameOfRound": "name"
        }).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        matchID = response.body.golf;
        done()
    });

    it("tests the create hole score route and returns 200 for status, we will store the id for later access", async done => {
        const response = await supertest(app).post('/api/golf/createHoleScore').send({
            "golfMatch": matchID,
            "score": "11",
            "clubsUsed": ["5e8be49b833e32095f236845"],
            "numberOfPutts": "4",
            "fairwaysHit": "true",
            "greenInRegulation": "true"
        }).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        holeID = response.body.hole._id;
        done()
    });

    it("tests the update hole route and returns 200 for status", async done => {
        const response = await supertest(app).post('/api/golf/updateHoleScore').send({
            "hole": holeID,
            "golfMatch": matchID,
            "score": "22",
            "clubsUsed": ["5e8be49b833e32095f236845"],
            "numberOfPutts": "4",
            "fairwaysHit": "true",
            "greenInRegulation": "true"
        }).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        done()
    });

    it("tests the get golf hole route and returns 200 for status, also checks for correct json", async done => {
        const response = await supertest(app).get('/api/golf/getGolfHole/' + holeID + '/' + matchID).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        expect({
            "score": response.body.score,
            "numberOfPutts": response.body.numberOfPutts,
            "fairwayHit": response.body.fairwayHit,
            "greenInRegulation": response.body.greenInRegulation
        })
            .toEqual({
                "score": 22,
                "numberOfPutts": 4,
                "fairwayHit": true,
                "greenInRegulation": true
            });
        done()
    });

    it("tests the get golf match route and returns 200 for status, also checks for correct json", async done => {
        const response = await supertest(app).get('/api/golf/getGolfMatch/' + matchID).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        expect({ "coursePlayed": response.body.coursePlayed, "nameOfRound": response.body.nameOfRound })
            .toEqual({
                "coursePlayed": "test",
                "nameOfRound": "name"
            });
        done()
    });

    it("tests the get all my golf match route and returns 200 for status", async done => {
        const response = await supertest(app).get('/api/golf/getMyMatches').set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        done()
    });
});