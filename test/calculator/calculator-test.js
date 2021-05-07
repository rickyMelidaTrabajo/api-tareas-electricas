const assert = require('chai').assert;
const calculator = require('../../codes-examples/calculator');

describe('Calculator Testing', () => {
    it('Calculate the sum of two number', () => {
        result = calculator.sum(2, 3);
        assert.equal(result, 5);
    });
});