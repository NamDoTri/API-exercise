
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const {connect} = require("./utils");

const item = {
    "images": [
        "some images"
    ],
    "deliveryType": "Pickup",
    "title": "Bike",
    "description": "Used, in good condition",
    "category": "Bicycles",
    "location": "Oulu",
    "price": 400,
    "datePosted": "2020-02-13T09:56:30.142Z",
    "sellerName": "john123"
};


beforeAll(async () => {
    try {
        await connect()

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

it("Delete request without auth", async done => {
    const itemId = "5e4ed7f0d861467de0c0cc80";
    const response = await request.delete('/items/'+itemId);
    expect(response.status).toBe(500);
    done()
})

it("Delete request with auth", async done => {
    const response = await request.post('/users/login').send({email: "test@test.test", password: "test"});
    const token = response.body.token;
    const itemId = "5e4ed7f0d861467de0c0cc80";
    const response = await request.delete('/items/'+itemId).set('Authorization', token);
    expect(response.status).toBe(200);
    done()
})

it("Put request without auth", async done => {
    const itemId = "5e4ed7f0d861467de0c0cc80";
    const response = await request.put('/items/'+itemId).send(item);
    expect(response.status).toBe(500);
    done()
})

it("Put request with auth", async done => {
    const response = await request.post('/users/login').send({email: "test@test.test", password: "test"});
    const token = response.body.token;
    const itemId = "5e4ed7f0d861467de0c0cc80";
    const response = await request.put('/items/'+itemId).send(item).set('Authorization', token);
    expect(response.status).toBe(200);
    done()
})

it("Post request without auth", async done => {
    const response = await request.post('/items').send(item);
    expect(response.status).toBe(500);
    done()
})

it("Post request with auth", async done => {
    const response = await request.post('/users/login').send({email: "test@test.test", password: "test"});
    const token = response.body.token;
    const response = await request.post('/items').send(item).set('Authorization', token);
    expect(response.status).toBe(200);
    done()
})

it("Search", async done => {
    const response = await request.get('/items/search?type=location&keyword=Oulu');
    expect(response.status).toBe(200);
    done()
})


