const Manager = require('../lib/Manager');

const manager = new Manager('Bailey', '123456789', 'baileypoe1222@gmail.com', '123')

test('test to get values for manager', () => {
    expect(manager.name).toBe('Bailey');
    expect(manager.id).toBe('123456789');
    expect(manager.email).toBe('baileypoe1222@gmail.com');
    expect(manager.officeNum).toBe('123');
});

test('test getting name from getName()', () => {
    expect(manager.getName()).toEqual(expect.any(String))
})

test('gets role of manager using getRole()', () => {
    const manager = new Manager('Bailey', 90, 'baileypoe1222@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
}); 