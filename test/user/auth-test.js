const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env')});

chai.use(chaiHttp);
const url = `${process.env.URL}/user`

describe('Verify Authentication', () => {
    describe('Successfully Authenticated User', () => {
        it('Verify Open Session', (done) => {
            chai.request(url)
                .get('/verify-session')
                .end((err, res) => {
                    console.log(res.body);
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('Successfully Authenticated User for username and password', (done)=>{
            chai.request(url)
                .post('/auth')
                .send({
                    "username": process.env.USERNAME_VALID,
                    "password": process.env.PASSWORD_VALID
                })
                .end((err, res)=>{
                    console.log(res.body);
                    expect(res).to.have.status(200);
                    done();
                })
        })

    });
});