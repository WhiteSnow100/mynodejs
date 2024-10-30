const person = {name:'lee', age:25, city:'seoul'}

// const name = person.name; // person["name"]
// const age = person.age;
// const city = person.city

const {name, age, city} = person;

const colors = ['red','blue','orange','green'];
const [a, b, c, d] = colors;
console.log(a, b, c, d);

// const [time, setTime] = useStates(0);