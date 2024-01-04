// parser.js

const { TokenType } = require('../lexer/lexer.js');

class SyntaxNode {
  constructor(type) {
    this.type = type;
  }
}

class ProgramNode extends SyntaxNode {
  constructor(statements) {
    super('Program');
    this.statements = statements;
  }
}

class VariableDeclarationNode extends SyntaxNode {
  constructor(identifier, initialValue) {
    super('VariableDeclaration');
    this.identifier = identifier;
    this.initialValue = initialValue;
  }
}

class AssignmentNode extends SyntaxNode {
  constructor(identifier, expression) {
    super('Assignment');
    this.identifier = identifier;
    this.expression = expression;
  }
}

class IfStatementNode extends SyntaxNode {
  constructor(condition, trueBranch, falseBranch) {
    super('IfStatement');
    this.condition = condition;
    this.trueBranch = trueBranch;
    this.falseBranch = falseBranch;
  }
}

class WhileLoopNode extends SyntaxNode {
  constructor(condition, body) {
    super('WhileLoop');
    this.condition = condition;
    this.body = body;
  }
}

class FunctionDeclarationNode extends SyntaxNode {
  constructor(identifier, parameters, body) {
    super('FunctionDeclaration');
    this.identifier = identifier;
    this.parameters = parameters;
    this.body = body;
  }
}

class FunctionCallNode extends SyntaxNode {
  constructor(identifier, args) {
    super('FunctionCall');
    this.identifier = identifier;
    this.arguments = args;
  }
}

class BinaryExpressionNode extends SyntaxNode {
  constructor(operator, leftOperand, rightOperand) {
    super('BinaryExpression');
    this.operator = operator;
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
  }
}

class IdentifierNode extends SyntaxNode {
  constructor(identifier) {
    super('Identifier');
    this.identifier = identifier;
  }
}

class NumberLiteralNode extends SyntaxNode {
  constructor(value) {
    super('NumberLiteral');
    this.value = value;
  }
}

class StringLiteralNode extends SyntaxNode {
  constructor(value) {
    super('StringLiteral');
    this.value = value;
  }
}

class BooleanLiteralNode extends SyntaxNode {
  constructor(value) {
    super('BooleanLiteral');
    this.value = value;
  }
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.currentTokenIndex = 0;
  }

  parse() {
    const statements = [];
    while (this.currentTokenIndex < this.tokens.length) {
      statements.push(this.parseStatement());
    }
    return new ProgramNode(statements);
  }

  parseStatement() {
    const currentToken = this.tokens[this.currentTokenIndex];
    switch (currentToken.type) {
      case TokenType.KEYWORD:
        return this.parseKeywordStatement();
      case TokenType.IDENTIFIER:
        return this.parseAssignmentOrCallStatement();
      default:
        throw new Error(`Unexpected token: ${currentToken.type}`);
    }
  }

  parseKeywordStatement() {
    const currentToken = this.tokens[this.currentTokenIndex];
    switch (currentToken.value) {
      case 'let':
        return this.parseVariableDeclaration();
      case 'if':
        return this.parseIfStatement();
      case 'while':
        return this.parseWhileLoop();
      default:
        throw new Error(`Unexpected keyword: ${currentToken.value}`);
    }
  }

  parseVariableDeclaration() {
    this.consumeToken(TokenType.KEYWORD, 'let');
    const identifier = this.consumeToken(TokenType.IDENTIFIER).value;
    this.consumeToken(TokenType.OPERATOR, '=');
    const initialValue = this.parseExpression();
    this.consumeToken(TokenType.PUNCTUATION, ';');
    return new VariableDeclarationNode(identifier, initialValue);
  }

  parseAssignmentOrCallStatement() {
    const identifier = this.consumeToken(TokenType.IDENTIFIER).value;
    const nextToken = this.tokens[this.currentTokenIndex];
    if (nextToken.type === TokenType.OPERATOR && nextToken.value === '=') {
      // Assignment
      this.consumeToken(TokenType.OPERATOR, '=');
      const expression = this.parseExpression();
      this.consumeToken(TokenType.PUNCTUATION, ';');
      return new AssignmentNode(identifier, expression);
    } else if (nextToken.type === TokenType.PUNCTUATION && nextToken.value === '(') {
      // Function Call
      const args = this.parseArgumentList();
      this.consumeToken(TokenType.PUNCTUATION, ';');
      return new FunctionCallNode(identifier, args);
    } else {
      throw new Error(`Unexpected token after identifier: ${nextToken.type}`);
    }
  }

  parseIfStatement() {
    this.consumeToken(TokenType.KEYWORD, 'if');
    this.consumeToken(TokenType.PUNCTUATION, '(');
    const condition = this.parseExpression();
    this.consumeToken(TokenType.PUNCTUATION, ')');
    const trueBranch = this.parseStatement();
    const falseBranch = this.matchToken(TokenType.KEYWORD, 'else') ? this.parseStatement() : null;
    return new IfStatementNode(condition, trueBranch, falseBranch);
  }

  parseWhileLoop() {
    this.consumeToken(TokenType.KEYWORD, 'while');
    this.consumeToken(TokenType.PUNCTUATION, '(');
    const condition = this.parseExpression();
    this.consumeToken(TokenType.PUNCTUATION, ')');
    const body = this.parseStatement();
    return new WhileLoopNode(condition, body);
  }

  parseArgumentList() {
    this.consumeToken(TokenType.PUNCTUATION, '(');
    const args = [];
    while (!this.matchToken(TokenType.PUNCTUATION, ')')) {
      args.push(this.parseExpression());
      if (this.matchToken(TokenType.PUNCTUATION, ',')) {
        this.consumeToken(TokenType.PUNCTUATION, ',');
      }
    }
    this.consumeToken(TokenType.PUNCTUATION, ')');
    return args;
  }
}
