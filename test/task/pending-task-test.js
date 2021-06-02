const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

chai.use(chaiHttp);
const url = `${process.env.URL}/task`;

describe('Verify Pendings Tasks', ()=>{
    describe('Add Pending Task', ()=>{
        it('add successfully', (done)=>{
            chai.request(url)
                .post('/add-pending-task')
                .send({
                    type: '',
                    state: '',
                    description: '',
                    date_generation: '',
                    turn: '',
                    technician: '',
                    position: ''
                })
                .end((err, res)=>{
                    console.log(res.body);
                    expect(res).to.have.status(200);
                    done();
                })

        })
    })
})