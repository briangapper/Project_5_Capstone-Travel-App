// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) IMPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
const helperModule = require('../src/client/js/helper');
const checkUserInput = helperModule.checkUserInput;
const calculateTimeDifference = helperModule.calculateTimeDifference;

// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) JEST TESTS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 1.1) Test function checkUserInput
// --------------------------------------------------------------------------------
describe('checkUserInput function', () => {

    // ----------------------------------------
    // 1.1.1) Test Case 1: Valid input
    // ----------------------------------------
    test('Valid input', () => {
        expect(() => {
            checkUserInput('New York', '2030-06-10', '2030-06-15');
        }).not.toThrow();
    });

    // ----------------------------------------
    // 1.1.2) Test Case 2: Empty destination
    // ----------------------------------------
    test('Empty destination', () => {
        expect(() => {
            checkUserInput('', '2030-06-10', '2030-06-15');
        }).toThrowError('Please enter a destination.');
    });

    // ----------------------------------------
    // 1.1.3) Test Case 3: Empty start date
    // ----------------------------------------
    test('Empty start date', () => {
        expect(() => {
            checkUserInput('New York', '', '2030-06-15');
        }).toThrowError('Please enter a departing date.');
    });

    // ----------------------------------------
    // 1.1.4) Test case 4: Departing date in the past
    // ----------------------------------------
    test('Departing date in the past', () => {
        expect(() => {
            checkUserInput('New York', '2023-01-01', '2030-06-15');
        }).toThrowError('The departing date must be in the future!');
    });

    // ----------------------------------------
    // 1.1.5) Test case 5: Returning date after departing date
    // ----------------------------------------
    test('Returning date after departing date', () => {
        expect(() => {
            checkUserInput('New York', '2030-06-15', '2030-06-10');
        }).toThrowError('The returning date must be greater than the departing date!');
    });

    // ----------------------------------------
    // 1.1.6) Test Case 6: Empty end date
    // ----------------------------------------
    test('Empty end date', () => {
        expect(() => {
            checkUserInput('New York', '2030-06-10', '');
        }).not.toThrow();
    });
});

// --------------------------------------------------------------------------------
// 1.2) Test function calculateTimeDifference
// --------------------------------------------------------------------------------
describe('calculateTimeDifference function', () => {
    
    // ----------------------------------------
    // 1.2.1) Test Case 1: Valid input
    // ----------------------------------------
    test('Valid input', () => {
        const result = calculateTimeDifference('2030-06-10', '2030-06-15');
        expect(result).toEqual({
            transformed_startDate: '10/06/2030',
            transformed_endDate: '15/06/2030',
            dayDifference: expect.any(Number),
            tripDuration: expect.any(Number)
        });
        expect(result.dayDifference).toBeGreaterThan(0);
        expect(result.tripDuration).toBeGreaterThan(0);
    });

    // ----------------------------------------
    // 1.2.2) Test Case 2: Invalid date format
    // ----------------------------------------
    test('Invalid date format', () => {
        const result = calculateTimeDifference('2030/06/10', '2030/06/15');
        expect(result).toEqual({
            transformed_startDate: 'undefined/undefined/2030/06/10',
            transformed_endDate: 'undefined/undefined/2030/06/15',
            dayDifference: expect.any(Number),
            tripDuration: expect.any(Number)
        });
    });

    // ----------------------------------------
    // 1.2.3) Test Case 3: Empty start date
    // ----------------------------------------
    test('Empty start date', () => {
        const result = calculateTimeDifference('', '2030-06-15');
        expect(result).toEqual({
            transformed_startDate: 'undefined/undefined/',
            transformed_endDate: '15/06/2030',
            dayDifference: NaN,
            tripDuration: NaN
        });
    });

    // ----------------------------------------
    // 1.2.4) Test Case 4: Empty end date
    // ----------------------------------------
    test('Empty end date', () => {
        const result = calculateTimeDifference('2030-06-10', '');
        expect(result).toEqual({
            transformed_startDate: '10/06/2030',
            transformed_endDate: 'undefined/undefined/',
            dayDifference: expect.any(Number),
            tripDuration: NaN
        });
    });
});