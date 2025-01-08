# Mocha - Framework

Mocha is a testing framework that provides a structure to write and run tests.
here we use manul conditions  while using chia we get pre-build function  to check 

---
```
var assert = require('assert'); // Importing the Node.js built-in assert module

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      const result = [1, 2, 3].indexOf(4);
      
      // Using if-else to check the result and manually throw an error if it fails
      if (result !== -1) {
        throw new Error(`Expected -1, but got ${result}`);
      }
      
      // If the condition passes, no error will be thrown and the test will pass.
    });
  });
});


```
---

# Chai - Library 

Chai is an assertion library used to test and verify the behavior of code.

---
```
// Importing Chai for assertions
const { expect } = require('chai');

// Test Suite
describe('Simple Math Tests', () => {

  // Test Case 1: Adding two numbers
  it('should add 2 and 3 correctly', () => {
    const result = 2 + 3;
    // Assertion: check if the result is 5
    expect(result).to.equal(5);
  });

  // Test Case 2: Subtracting two numbers
  it('should subtract 5 from 10 correctly', () => {
    const result = 10 - 5;
    // Assertion: check if the result is 5
    expect(result).to.equal(5);
  });

  // Test Case 3: Multiplying two numbers
  it('should multiply 3 and 4 correctly', () => {
    const result = 3 * 4;
    // Assertion: check if the result is 12
    expect(result).to.equal(12);
  });

});


```
---
