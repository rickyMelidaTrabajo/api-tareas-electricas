const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env')});

chai.use(chaiHttp);
const url = `${process.env.URL}/technician`;

describe('Verify Technicians', ()=>{
    describe('Get one technician whit username', ()=>{
        
    })
})