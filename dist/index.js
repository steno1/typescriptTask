"use strict";
const members = [
    { type: 'client', name: 'Toochukwu John', age: 28, profession: 'Engineer' },
    { type: 'manager', name: 'Obi Paul', age: 40, department: 'HR' },
    { type: 'client', name: 'Onu Princeley', age: 22, profession: 'Designer' },
    { type: 'manager', name: 'Idenyi Peter', age: 35, department: 'Marketing' },
    { type: 'client', name: 'Inegbu Vivian', age: 22, profession: 'Developer' },
    { type: 'manager', name: 'Odanwu Emmanuel', age: 22, department: 'Security' }
];
function displayMember(member) {
    console.log(` - ${member.name}, ${member.age}, ${member.type === 'manager' ? member.department : member.profession}`);
}
function refineMembers(group, category, filters) {
    return group
        .filter((person) => person.type === category)
        .filter((person) => Object.entries(filters).every(([key, value]) => person[key] === value));
}
const clientsAged22 = refineMembers(members, 'client', { age: 22 });
const managersAged22 = refineMembers(members, 'manager', { age: 22 });
console.log('Clients aged 22:');
clientsAged22.forEach(displayMember);
console.log();
console.log('Managers aged 22:');
managersAged22.forEach(displayMember);
