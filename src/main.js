// main.js

const fs = require('fs');
const lexer = require('./src/lexer/lexer');
const parser = require('./src/parser/parser');
const semanticAnalyzer = require('./src/semanticAnalyzer/semanticAnalyzer');
const intermediateCodeGenerator = require('./src/intermediateCodeGenerator/intermediateCodeGenerator');
const optimizer = require('./src/optimizer/optimizer');
const codeGenerator = require('./src/codeGenerator/codeGenerator');

function compile(sourceCode) {
    // Lexical analysis
    const tokens = lexer.tokenize(sourceCode);

    // Syntax analysis
    const syntaxTree = parser.parse(tokens);

    // Semantic analysis
    semanticAnalyzer.analyze(syntaxTree);

    // Intermediate code generation
    const intermediateCode = intermediateCodeGenerator.generate(syntaxTree);

    // Optimization (optional)
    const optimizedCode = optimizer.optimize(intermediateCode);

    // Code generation
    const targetCode = codeGenerator.generate(optimizedCode);

    return targetCode;
}

function main() {
    // Read the SimpleScript source code from a file
    const fileName = process.argv[2]; // Assuming the file name is passed as a command-line argument
    const sourceCode = fs.readFileSync(fileName, 'utf-8');

    try {
        // Compile the source code
        const compiledCode = compile(sourceCode);

        // Output the generated code
        console.log('Generated Code:');
        console.log(compiledCode);

        // Export the compiled code to a file (optional)
        fs.writeFileSync('output.js', compiledCode, 'utf-8');
        console.log('Compiled code exported to output.js');
    } catch (error) {
        console.error('Compilation Error:', error.message);
    }
}
// Run the compiler when the script is executed
main();

