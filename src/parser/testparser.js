const fs = require('fs');
const { tokenize } = require('../lexer/lexer');
const Parser = require('../parser/parser');

// Example source code
const exampleSourceCode = `
int mut number x = 10;
string mut message = "Hello, World!";
boolean mut isTrue = true;

if (x > 5) {
    // do something
} else {
    // do something else
}

int mut number counter = 0;
while (counter < 5) {
    // do something repeatedly
    counter = counter + 1;
}

function int mut number add(int mut number a, int mut number b): int mut number {
    return a + b;
}

int mut number result = add(3, 5);

function int mut number factorial(int mut number n): int mut number {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

int mut number result = factorial(5);
`;

// Function to read the source code
function readSourceCodeFromString() {
  return exampleSourceCode;
}

// Function to test lexer and parser
function testLexerAndParser() {
  const sourceCode = readSourceCodeFromString();

  // Tokenize the source code
  const tokens = tokenize(sourceCode);
  console.log('Tokens:', tokens);

  // Parse the tokens
  const parser = new Parser(tokens);
  const syntaxTree = parser.parse();
  console.log('Syntax Tree:', syntaxTree);
}

// Usage example
testLexerAndParser();

