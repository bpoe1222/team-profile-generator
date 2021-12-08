const Intern = require('../lib/Intern');


test('creates an Intern object', () => {
    const intern = new Intern('Bailey', 5, 'baileypoe1222@gmail.com', 'UT');
    
    expect(intern.school) .toEqual(expect.any(String));
});


test('gets employee school', () => {
    const intern = new Intern('Bailey', 90, 'baileypoe1222@gmail.com', 'UT');
    
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});


test('gets role of employee', () => {
    const intern = new Intern('Bailey', 90, 'baileypoe1222@gmail.com.com', 'UT');

    expect(intern.getRole()).toEqual("Intern");
}); 