const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });
const technician = require('../../controllers/technician/technician');

chai.use(chaiHttp);
const url = `${process.env.URL}/technician`;

describe('Verify Technicians', () => {
    describe('Get Technicians', () => {
        it('Get one Technician whit username', () => {
            // getTechnician = technician.getWhitUsername(process.env.USERNAME_VALID).then();
            // expect(getTechnician).to.have.own.property("name");
        });
    });
});