const animals = ["cat", "dog", "fox"];
let currentIndex = 0;

const squareContainer = document.getElementById('square-container');
const staticSquaresContainer = document.getElementById('static-squares');
const button = document.querySelector('#button-container button');

function createSquaresForString(string) {
    // Clear existing squares
    squareContainer.innerHTML = '';
    staticSquaresContainer.innerHTML = '';
    
    string.toUpperCase().split('').forEach((char, index) => {
        // Draggable squares
        const square = document.createElement('div');
        square.className = 'square';
        square.textContent = char;
        square.style.left = `${20 + index * 80}px`;
        square.style.top = '60px'; // Adjust top position

        square.addEventListener('mousedown', (e) => {
            const onMouseMove = (event) => {
                square.style.left = `${event.clientX - offsetX}px`;
                square.style.top = `${event.clientY - offsetY}px`;
            };

            let offsetX = e.clientX - square.getBoundingClientRect().left;
            let offsetY = e.clientY - square.getBoundingClientRect().top;

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        });

        squareContainer.appendChild(square);

        // Static squares
        const staticSquare = document.createElement('div');
        staticSquare.className = 'static-square';
        staticSquare.textContent = char;
        staticSquaresContainer.appendChild(staticSquare);
    });
}

createSquaresForString(animals[currentIndex]);

button.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % animals.length;
    createSquaresForString(animals[currentIndex]);
});