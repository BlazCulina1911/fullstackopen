/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongo = require('mongo');
const mongoose = require('mongoose');

let mode = 'noAction';
let name = undefined;
let number = undefined;

if (process.argv.length < 3){
  console.log('Please provide a password!');
  process.exit(1);
}

if (process.argv.length < 4){
  mode = 'find';
  console.log('Attempting to list all people in PhoneBookApp ');
} else {
  mode = 'save';
  name = process.argv[3];
  number = process.argv[4];
  console.log(`Attempt to save ${name} with number ${number} to the personsApp`);
}

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if(mode === 'find'){
  Person.find().then(result => {
    result.forEach(x =>
      console.log(`${x.name} ${x.number}`)
    );
    mongoose.connection.close();
  });
} else if (mode === 'save'){
  const person = new Person({
    name,
    number
  });

  person.save().then(() => {
    console.log('SUCCESS');
    mongoose.connection.close();
  });
}