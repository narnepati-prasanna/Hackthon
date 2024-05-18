document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('diceCanvas');
    const context = canvas.getContext('2d');

    function drawDice(number) {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the border of the dice
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.strokeRect(10, 10, 180, 180);

        // Draw the dots
        context.fillStyle = 'black';
        const dotSize = 20;

        const positions = [
            // Positions for each face of the dice (1-6)
            [], // No zero face
            [[100, 100]], // 1
            [[60, 60], [140, 140]], // 2
            [[60, 60], [100, 100], [140, 140]], // 3
            [[60, 60], [60, 140], [140, 60], [140, 140]], // 4
            [[60, 60], [60, 140], [100, 100], [140, 60], [140, 140]], // 5
            [[60, 60], [60, 100], [60, 140], [140, 60], [140, 100], [140, 140]] // 6
        ];

        positions[number].forEach(pos => {
            context.beginPath();
            context.arc(pos[0], pos[1], dotSize / 2, 0, Math.PI * 2);
            context.fill();
        });
    }

    function rollDice() {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        drawDice(randomNumber);
    }

    // Initial dice face
    drawDice(1);

    // Listen for space key press
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            rollDice();
        }
    });
});