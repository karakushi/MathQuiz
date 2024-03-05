function generateRandomMatrix(size) {
    return Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Math.floor(Math.random() * 10))
    );
}

function displayMatrix(matrix, elementId) {
    const matrixHtml = matrix.map(row => `<span>${row.join(' ')}</span>`).join('<br>');
    document.getElementById(elementId).innerHTML = matrixHtml;
}

function addMatrices(A, B) {
    return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

function subtractMatrices(A, B) {
    return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}

function multiplyMatrices(A, B) {
    return A.map((row, i) => 
        B[0].map((_, j) => row.reduce((acc, val, k) => acc + val * B[k][j], 0))
    );
}

function parseMatrix(input) {
    return input.split(';').map(row => row.split(',').map(Number));
}

let matrixA, matrixB, operationResult;

document.getElementById('generateButton').addEventListener('click', () => {
    matrixA = generateRandomMatrix(3);
    matrixB = generateRandomMatrix(3);
    displayMatrix(matrixA, 'matrixA');
    displayMatrix(matrixB, 'matrixB');
    operationResult = performOperation(matrixA, matrixB, document.getElementById('operation').value);
});

function performOperation(A, B, operation) {
    switch (operation) {
        case 'addition':
            return addMatrices(A, B);
        case 'subtraction':
            return subtractMatrices(A, B);
        case 'multiplication':
            return multiplyMatrices(A, B);
        default:
            return [];
    }
}

function checkSolution() {
    const userSolution = parseMatrix(document.getElementById('userSolution').value);

    const isCorrect = userSolution.length === operationResult.length &&
        userSolution.every((row, i) =>
            row.length === operationResult[i].length &&
            row.every((val, j) => val === operationResult[i][j])
        );

    document.getElementById('result').innerText = isCorrect ? 'Richtig!' : 'Leider falsch. Versuchen Sie es erneut!';
}

document.getElementById('operation').addEventListener('change', () => {

    operationResult = performOperation(matrixA, matrixB, document.getElementById('operation').value);
});

document.getElementById('submitButton').addEventListener('click', checkSolution);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateButton').click();
});
