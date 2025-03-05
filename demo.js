function reviewCode() {
    const code = document.getElementById('codeInput').value;
    const feedback = document.getElementById('feedback');
    let result = '';

    
    const errors = [];

    
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

    
    if (code.includes('==') && !code.includes('===')) {
        errors.push('Consider using "===" instead of "==" for strict comparison.');
    }

    
    if (errors.length > 0) {
        result = errors.join('<br>');
    } else {
        result = 'No major issues found. Your code looks good!';
    }

    feedback.innerHTML = result;
}
