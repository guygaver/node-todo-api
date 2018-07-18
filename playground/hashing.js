const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

let hashedPassword = "$2a$10$t0nk1vffSYWsNbZiyZi6T.HYHrHsQleu9mXdTTujNu6E27LHI0WVi";

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
});

let data = {
  id: 10  
};

let token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');

console.log(decoded);