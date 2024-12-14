/* eslint-disable */
import * as matchers from "jest-extended";
// jest.setup.js
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { }); // Silences console.error
});

expect.extend(matchers);
