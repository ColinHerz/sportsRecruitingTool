
const supertest = require('supertest');
let app =  require('../../app.js');
let mongoose = require('mongoose');

afterAll((done) => {
  console.log(app.server);
  mongoose.connection.close();
  done();
});

describe("Testing the users API", () => {

  it("tests the register route and returns 200 for status", async done => {
    var rand = Math.floor(Math.random() * 100000000);
    const response = await supertest(app).post('/api/users/register').send({
        firstname:"Colin",
        lastname:"Herzberg",
        email: rand + "@gmail.com",
        password: "test"
    });
    expect(response.status).toEqual(200);
    done()
  });

  it("tests the register route and returns 400 for status becasue email is used", async done => {
    const response = await supertest(app).post('/api/users/register').send({
        firstname:"Colin",
        lastname:"Herzberg",
        email: "colinherzberg21@gmail.com",
        password: "test"
    });
    expect(response.status).toEqual(400);
    done()
  });

});

