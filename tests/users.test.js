
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

const {connect} = require("./utils");

beforeAll(async () => {
    try {
        await connect();

        console.log("Mongodb connection established");
    }
    catch(err){
        console.log("Failed to establish mongo db connection", err);
    }
});

it("login test", async done => {

    const response = await request.post('/users/login').send({email: "test@test.test", password: "test"});
    expect(response.status).toBe(200);
    done()

});

it("register test", async done => {
    const email = "test2", password = "test2", username = "test2";
    const response = await request.post('/users/register').send({email, password, username});
    expect(response.status).toBe(200);
    done()
})