function reviewCode() {
    const code = document.getElementById('codeInput').value;
    const feedback = document.getElementById('feedback');
    let result = '';

    // Basic checks: Missing semicolons, unused variables, etc.
    const errors = [];

    // Check for missing semicolons
    if (!code.includes(';')) {
        errors.push('It seems like you forgot semicolons at the end of some lines.');
    }

    // Check for unused variables (simple regex, does not cover all cases)
    const variables = code.match(/\bvar\s+(\w+)/g);
    if (variables && variables.length > 0) {
        variables.forEach(variable => {
            const varName = variable.split(' ')[1];
            const regex = new RegExp(\\b${varName}\\b, 'g');
            const usages = (code.match(regex) || []).length;
            if (usages <= 1) {  // Only the declaration itself
                errors.push(The variable '${varName}' is declared but never used.);
            }
        });
    }

    // Check for basic syntax errors (rudimentary example)
    if (code.includes('==') && !code.includes('===')) {
        errors.push('Consider using "===" instead of "==" for strict comparison.');
    }

    // Provide feedback based on detected issues
    if (errors.length > 0) {
        result = errors.join('<br>');
    } else {
        result = 'No major issues found. Your code looks good!';
    }

    feedback.innerHTML = result;
}