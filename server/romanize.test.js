const romanize = require('./romanize');

test('Invalid number throws an error', () => {
  expect(() => romanize('1')).toThrow();
  expect(() => romanize(1.2)).toThrow();
  expect(() => romanize(101)).toThrow();
});

test('Convert number to roman notation', () => {
  expect(romanize(1)).toBe('I');
  expect(romanize(2)).toBe('II');
  expect(romanize(3)).toBe('III');
  expect(romanize(4)).toBe('IV');
  expect(romanize(5)).toBe('V');
  expect(romanize(9)).toBe('IX');
  expect(romanize(10)).toBe('X');
  expect(romanize(20)).toBe('XX');
  expect(romanize(30)).toBe('XXX');
  expect(romanize(40)).toBe('XL');
  expect(romanize(49)).toBe('IL');
  expect(romanize(50)).toBe('L');
  expect(romanize(90)).toBe('XC');
  expect(romanize(99)).toBe('IC');
  expect(romanize(100)).toBe('C');
});
