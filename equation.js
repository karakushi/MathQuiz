function generateRandomLinearEquation() {
    const a = Math.floor(Math.random() * 10) + 1; // Koeffizient von x + 1 damit es nie null gibt
    const b = Math.floor(Math.random() * 10);
    const c = Math.floor(Math.random() * 10) + b; // c soll grösser als b sein damit es nie negative lösungen gibt
    
    const gcd = (n, d) => d ? gcd(d, n % d) : n;
    const divisor = gcd(c - b, a);
    
    return {
        a,
        b,
        c,
        solution: `${(c - b) / divisor}/${a / divisor}` 
    };
}

function displayEquation({ a, b, c }) {
    document.getElementById('equation').innerText = `${a}x + ${b} = ${c}`;
}

function parseFraction(input) {
    const [numerator, denominator] = input.split('/').map(Number);
    if (denominator) {
        return numerator / denominator;
    }
    return numerator;
}

let currentEquation;

document.getElementById('generateEquationButton').addEventListener('click', () => {
    currentEquation = generateRandomLinearEquation();
    displayEquation(currentEquation);
});

document.getElementById('checkEquationButton').addEventListener('click', () => {
    const userSolution = parseFraction(document.getElementById('userSolutionForEquation').value);
    const correctSolution = parseFraction(currentEquation.solution);
    const isCorrect = userSolution === correctSolution;
    document.getElementById('equationResult').innerText = isCorrect ? 'Richtig!' : `Falsch. Die richtige Lösung ist x = ${currentEquation.solution}.`;
});


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateEquationButton').click();
});

// Animation
document.getElementById('checkEquationButton').addEventListener('click', () => {
    const userSolution = parseFraction(document.getElementById('userSolutionForEquation').value);
    const correctSolution = parseFraction(currentEquation.solution);
    const isCorrect = userSolution === correctSolution;
    
    const resultElement = document.getElementById('equationResult');
    resultElement.innerText = isCorrect ? 'Richtig!' : `Falsch. Die richtige Lösung ist x = ${currentEquation.solution}.`;
    if (isCorrect) {
        resultElement.classList.add('correct-message');
    } else {
        resultElement.classList.remove('correct-message');
    }
});
