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

describe("Testing the golf bag API", () => {
    var cookie;
    var bagID;
    var clubID;

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

    it("tests the create golfBag route and returns 200 for status, we will store the id for later access", async done => {
        const response = await supertest(app).post('/api/golf/createGolfBag').send({
            "bagName": "baggywaggy"
        }).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        bagID = response.body.golfBag;
        done()
    });

    it("tests the get golfBag route and returns 200 for status", async done => {
        const response = await supertest(app).post('/api/golf/getGolfBag').send({
            "golfBag": bagID
        }).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        done()
    });

    it("tests the get all golfBags route and returns 200 for status", async done => {
        const response = await supertest(app).get('/api/golf/getAllGolfBags').set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        done()
    });

    it("tests the create golf club route and returns 200 for status, we will store the club id", async done => {
        const response = await supertest(app).post('/api/golf/createGolfclub').send({
            "clubType": "2",
            "clubName": "blublubclub",
            "golfBag": bagID
        }).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        clubID = response.body.golfClub;
        done()
    });

    it("tests the get golf club route and returns 200 for status, also checks for correct json", async done => {
        const response = await supertest(app).get('/api/golf/getGolfClub/' + clubID + '/' + bagID).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        expect({ "clubType": response.body.clubType, "clubName": response.body.clubName })
            .toEqual({ "clubType": 2, "clubName": "blublubclub" });
        done()
    });


    it("tests the create golf club route and returns 200 for status, we will store the club id", async done => {
        const response = await supertest(app).post('/api/golf/deleteGolfclub').send({
            "golfBag": bagID,
            "golfClub": clubID
        }).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        done()
    });

    it("tests the delete golfBag route and returns 200 for status", async done => {
        const response = await supertest(app).post('/api/golf/deleteGolfBag').send({
            "golfBag": bagID
        }).set('Cookie', [cookie]);
        expect(response.status)
            .toEqual(200);
        done()
    });
});

