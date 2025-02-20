interface Member {
    name: string;
    age: number;
}

interface Client extends Member {
    type: 'client';
    profession: string;
}

interface Manager extends Member {
    type: 'manager';
    department: string;
}

type Individual = Client | Manager;

const members: Individual[] = [
    { type: 'client', name: 'Toochukwu John', age: 28, profession: 'Engineer' },
    { type: 'manager', name: 'Obi Paul', age: 40, department: 'HR' },
    { type: 'client', name: 'Onu Princeley', age: 22, profession: 'Designer' },
    { type: 'manager', name: 'Idenyi Peter', age: 35, department: 'Marketing' },
    { type: 'client', name: 'Inegbu Vivian', age: 22, profession: 'Developer' },
    { type: 'manager', name: 'Odanwu Emmanuel', age: 22, department: 'Security' }
];

function displayMember(member: Individual): void {
    const details = member.type === 'manager' 
        ? `🛠️ Department: ${member.department}` 
        : `💼 Profession: ${member.profession}`;
    
    console.log(`👤 ${member.name} | Age: ${member.age} | ${details}`);
}

type FilterCriteria<T> = Partial<Omit<T, 'type'>>;

function refineMembers<T extends Individual>(
    group: Individual[], 
    category: T['type'], 
    filters: FilterCriteria<T>
): T[] {
    return group
        .filter((person): person is T => person.type === category)
        .filter(person => 
            Object.entries(filters).every(([key, value]) => 
                person[key as keyof T] === value
            )
        );
}

const clientsAged22 = refineMembers<Client>(members, 'client', { age: 22 });
const managersAged22 = refineMembers<Manager>(members, 'manager', { age: 22 });

console.log('🔍 Clients aged 22:');
clientsAged22.forEach(displayMember);
console.log('\n');

console.log('🔍 Managers aged 22:');
managersAged22.forEach(displayMember);
