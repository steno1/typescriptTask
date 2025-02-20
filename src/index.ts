interface Person {
    name: string;
    age: number;
}

interface User extends Person {
    type: 'user';
    profession: string;
}

interface Admin extends Person {
    type: 'admin';
    department: string;
}

type Individual = User | Admin;

const persons: Individual[] = [
    { type: 'user', name: 'Toochukwu John', age: 28, profession: 'Engineer' },
    { type: 'admin', name: 'Obi Paul', age: 40, department: 'HR' },
    { type: 'user', name: 'Onu Princeley', age: 22, profession: 'Designer' },
    { type: 'admin', name: 'Idenyi Peter', age: 35, department: 'Marketing' },
    { type: 'user', name: 'Inegbu Vivian', age: 22, profession: 'Developer' },
    { type: 'admin', name: 'Odanwu Emmanuel', age: 22, department: 'Security' }
];

function displayPerson(person: Individual): void {
    const details = person.type === 'admin' 
        ? `🛠️ Department: ${person.department}` 
        : `💼 Profession: ${person.profession}`;
    
    console.log(`👤 ${person.name} | Age: ${person.age} | ${details}`);
}

type FilterCriteria<T> = Partial<Omit<T, 'type'>>;

function filterPersons<T extends Individual>(
    group: Individual[], 
    personType: T['type'], 
    criteria: FilterCriteria<T>
): T[] {
    return group
        .filter((person): person is T => person.type === personType)
        .filter(person => 
            Object.entries(criteria).every(([key, value]) => 
                person[key as keyof T] === value
            )
        );
}

const usersAged22 = filterPersons<User>(persons, 'user', { age: 22 });
const adminsAged22 = filterPersons<Admin>(persons, 'admin', { age: 22 });

console.log('🔍 Users aged 22:');
usersAged22.forEach(displayPerson);
console.log('\n');

console.log('🔍 Admins aged 22:');
adminsAged22.forEach(displayPerson);
