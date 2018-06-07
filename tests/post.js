const {
    add,
} = require('./utils')


test('should add numbers', () => {
    expect(add(1, 2)).toBe(3)
})