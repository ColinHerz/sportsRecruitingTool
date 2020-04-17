const supertest = require('supertest');
let app = require('../../app.js');
let mongoose = require('mongoose');

afterAll((done) => {
  mongoose.connection.close();
  done();
});

beforeAll(function (done) {
  app.on("appStarted", function(){
      done();
  });
});

describe("Testing the users API", () => {
  var cookie;

  // it("tests the register route and returns 200 for status", async done => {
  //   var rand = Math.floor(Math.random() * 100000000);
  //   const response = await supertest(app).post('/api/users/register').send({
  //     firstname: "Colin",
  //     lastname: "Herzberg",
  //     email: rand + "@gmail.com",
  //     password: "test"
  //   });
  //   expect(response.status).toEqual(200);
  //   done()
  // });

  it("tests the register route and returns 400 for status becasue email is used", async done => {
    const response = await supertest(app).post('/api/users/register').send({
      firstname: "Colin",
      lastname: "Herzberg",
      email: "colinherzberg21@gmail.com",
      password: "test"
    });
    expect(response.status).toEqual(400);
    done()
  });

  it("tests the login route and returns 400 for status becasue password is wrong", async done => {
    const response = await supertest(app).post('/api/users/login').send({
      "email": "colinherzberg21@gmail.com",
      "password": "test2"
    });
    expect(response.status).toEqual(400);
    done()
  });

  it("tests the login route and returns 200 for login success", async done => {
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

  it("tests the login route and returns 400 for status becasue password is wrong", async done => {
    const response = await supertest(app).post('/api/users/login').send({
      "email": "colinherzberg21@gmail.com",
      "password": "test"
    })
    expect(response.status).toEqual(200);
    done()
  });

  it("tests the get user route and returns 200 for status and gives us back the correct json", async done => {
    const response = await supertest(app).get('/api/users/get').set('Cookie', [cookie]);
    expect(response.status)
      .toEqual(200);
    expect(response.body)
      .toEqual({
        "firstname": "colin",
        "lastname": "herzberg",
        "email": "colinherzberg21@gmail.com"
      });
    done()
  });

  it("tests the set user details route and returns 200 for status and gives us back the correct json", async done => {
    const response = await supertest(app).post('/api/users/detail/update').send({
      "age": 69,
      "height": 69,
      "weight": 69
    }).set('Cookie', [cookie]);
    expect(response.status)
      .toEqual(200);
    done()
  });

  it("tests the get user details route and returns 200 for status and gives us back the correct json", async done => {
    const response = await supertest(app).get('/api/users/detail/get').set('Cookie', [cookie]);
    expect(response.status)
      .toEqual(200);
    expect({ "age": response.body.age, "height": response.body.height, "weight": response.body.weight })
      .toEqual({
        "age": 69,
        "height": 69,
        "weight": 69
      });
    done()
  });

  it("tests the get user and user details route and returns 200 for status and gives us back the correct json", async done => {
    const response = await supertest(app).get('/api/users/getUserAndDetail').set('Cookie', [cookie]);
    expect(response.status)
      .toEqual(200);
    expect({ "age": response.body.detials.age, "height": response.body.detials.height, "weight": response.body.detials.weight })
      .toEqual({
        "age": 69,
        "height": 69,
        "weight": 69
      }
      );
    done()
  });

  it("tests the logout route and returns 200 for status", async done => {
    const response = await supertest(app).get('/api/users/logout').set('Cookie', [cookie]);
    expect(response.status)
      .toEqual(200);
    done()
  });
});

