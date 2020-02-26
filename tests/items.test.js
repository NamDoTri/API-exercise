require('dotenv').config();
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');


beforeAll(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Mongodb connection established");
    }
    catch(err){
        console.log("Failed to establish mongo db connection", err);
    }
});

it("Get request to /items without auth fails", async done => {
    const response = await request.get('/items');
    expect(response.status).toBe(401);
    done()

});

it("Post request to /items fails without auth ", async done => {
    const response = await request.post('/items').send({"title":"Bike","description":"Used, in good condition","category":"Bicycles","location":"Oulu","images":"some images","price":400,"datePosted":"2020-02-13T09:56:30.142Z","deliveryType":"Pickup","sellerName":"john123"});
    expect(response.status).toBe(401);
    done();
})

it("Get request with auth", async done => {
    const response = await request.post('/users/login').send({email: "test@test.test", password: "test"});
    const token = response.body.token;
    console.log("token", token);
    const itemsResponse = await request.get('/items').set('Authorization', token);
    expect(itemsResponse.status).toBe(200);
    done();

})


