# gpt-compiler
## File structure
```
compiler-project/
|-- src/
|   |-- lexer/
|   |   |-- lexer.js          # Lexer implementation
|   |-- parser/
|   |   |-- parser.js         # Parser implementation
|   |-- semanticAnalyzer/
|   |   |-- semanticAnalyzer.js  # Semantic analysis implementation
|   |-- intermediateCodeGenerator/
|   |   |-- intermediateCodeGenerator.js  # Intermediate code generation
|   |-- optimizer/
|   |   |-- optimizer.js       # Code optimization (optional)
|   |-- codeGenerator/
|   |   |-- codeGenerator.js   # Code generation
|   |-- main.js               # Main entry point for the compiler
|-- test/
|   |-- lexerTest.js          # Tests for the lexer
|   |-- parserTest.js         # Tests for the parser
|   |-- semanticAnalyzerTest.js  # Tests for the semantic analyzer
|   |-- intermediateCodeGeneratorTest.js  # Tests for intermediate code generation
|   |-- optimizerTest.js      # Tests for the optimizer
|   |-- codeGeneratorTest.js  # Tests for the code generator
|-- examples/
|   |-- example1.txt          # Example source code files
|   |-- example2.txt
|-- README.md                 # Project documentation
|-- package.json              # Node.js package file
```

