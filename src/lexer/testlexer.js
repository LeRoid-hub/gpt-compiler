// testLexer.js

const { TokenType, tokenize } = require('./lexer');

// Sample SimpleScript code
const sourceCode = `
let x = 10;
let message = "Hello, World!";
let isTrue = true;

if (x > 5) {
    // do something
} else {
    // do something else
}

let counter = 0;
while (counter < 5) {
    // do something repeatedly
    counter = counter + 1;
}

function add(a, b) {
    return a + b;
}

let result = add(3, 5);
`;

// Test the lexer
try {
  const tokens = tokenize(sourceCode);

  console.log('Tokens:');
  console.log(tokens.map(token => `${token.type}: ${token.value}`).join('\n'));
} catch (error) {
  console.error('Lexer Error:', error.message);
}

