// lexer.js

const TokenType = {
  KEYWORD: 'KEYWORD',
  IDENTIFIER: 'IDENTIFIER',
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  OPERATOR: 'OPERATOR',
  PUNCTUATION: 'PUNCTUATION',
};

class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

function isDigit(char) {
  return /\d/.test(char);
}

function isAlpha(char) {
  return /[a-zA-Z_]/.test(char);
}

function isAlphaNumeric(char) {
  return isAlpha(char) || isDigit(char);
}

function tokenize(sourceCode) {
  const tokens = [];
  let currentPos = 0;

  while (currentPos < sourceCode.length) {
    let char = sourceCode[currentPos];

    // Skip whitespace
    if (char === ' ' || char === '\t' || char === '\n') {
      currentPos++;
      continue;
    }

    // Skip single-line comments
    if (char === '/' && sourceCode[currentPos + 1] === '/') {
      while (char !== '\n' && currentPos < sourceCode.length) {
        char = sourceCode[++currentPos];
      }
      continue;
    }

    // Skip multi-line comments
    if (char === '/' && sourceCode[currentPos + 1] === '*') {
      currentPos += 2;
      while (!(char === '*' && sourceCode[currentPos + 1] === '/')) {
        char = sourceCode[++currentPos];
        if (currentPos >= sourceCode.length) {
          throw new Error('Unterminated multi-line comment.');
        }
      }
      currentPos += 2; // Skip the '*/'
      continue;
    }

    // Handle numbers
    if (isDigit(char)) {
      let number = '';
      while (isDigit(char)) {
        number += char;
        char = sourceCode[++currentPos];
      }
      tokens.push(new Token(TokenType.NUMBER, parseInt(number)));
      continue;
    }

    // Handle strings
    if (char === '"') {
      let string = '';
      char = sourceCode[++currentPos];
      while (char !== '"') {
        string += char;
        char = sourceCode[++currentPos];
      }
      // Skip the closing quote
      currentPos++;
      tokens.push(new Token(TokenType.STRING, string));
      continue;
    }

    // Handle keywords and identifiers
    if (isAlpha(char)) {
      let identifier = '';
      while (isAlphaNumeric(char)) {
        identifier += char;
        char = sourceCode[++currentPos];
      }
      if (identifier === 'true' || identifier === 'false') {
        tokens.push(new Token(TokenType.BOOLEAN, identifier === 'true'));
      } else {
        tokens.push(new Token(TokenType.IDENTIFIER, identifier));
      }
      continue;
    }

    // Handle operators
    const operators = ['+', '-', '*', '/', '=', '>', '<'];
    if (operators.includes(char)) {
      tokens.push(new Token(TokenType.OPERATOR, char));
      currentPos++;
      continue;
    }

    // Handle punctuation
    const punctuation = ['(', ')', '{', '}', ',', ';'];
    if (punctuation.includes(char)) {
      tokens.push(new Token(TokenType.PUNCTUATION, char));
      currentPos++;
      continue;
    }

    // If none of the above, raise an error for an unrecognized character
    throw new Error(`Unrecognized character: ${char}`);
  }

  return tokens;
}

module.exports = {
  TokenType,
  Token,
  tokenize,
};

