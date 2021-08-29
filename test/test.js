const chai = require('chai');
var expect = chai.expect;
const url = `http://localhost:4000/`;
const request = require('supertest')(url);
const employee = require('../models/employee');
const company = require('../models/company');
const mongoose = require('mongoose');

before(async () => {  
    
})

after(async () => {  
    // await employee.collection.drop();
    // await company.collection.drop();
    // const collections = await mongoose.connection.db.collections()
    // for (let collection of collections) {
    //     console.log(collection)
    //     await collection.drop()
    // }
})

describe('Test Resolver Routes', () => {
    it('Health should return "Healthy"', (done) => {
        request.post('/')
        .send({ query: `
        { 
            health 
        }
        `})
        .expect(200)
        .end((err,res) => {
            expect(res.body.data.health).to.equal("Healthy");
            done();
        })
    });
    
    it('getCompanies should return more than 0 data', async function() {
        
        await company.create({
            name: "test",
            password : "test",
            email : "test@mail.com",
            token: "",
            lastLogin: ""
        }
        );
        var result = await request.post('/').send({ query: `
        { 
            getCompanies {
                _id
                name
                email
            }
        }
        `})
        console.log(result)
        await company.drop();
        expect(result.status).to.equal(200);
    });
    
    it('getCompanyById should return exact data', (done) => {
        request.post('/')
        .send({ query: `
        { 
            getCompanies {
                _id
                name
                email
            }
        }
        `})
        .expect(200)
        .end((err,res) => {
            expect(res.body.data.getCompanies.length > 0).to.equal(true);
            done();
        })
    });
});