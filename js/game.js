function generateBingoCard() {
    const bingoCard = document.getElementById("bingoCard");
    for (let i = 1; i <= 25; i++) {
        const cell = document.createElement("div");
        cell.classList.add("bingo-cell");
        cell.innerText = Math.floor(Math.random() * 75) + 1; // Número aleatorio entre 1 y 75
        cell.onclick = () => cell.classList.toggle("marked");
        bingoCard.appendChild(cell);
    }
}

function markRandomCell() {
    const cells = document.querySelectorAll(".bingo-cell");
    const randomIndex = Math.floor(Math.random() * cells.length);
    cells[randomIndex].classList.add("marked");
}

document.addEventListener("DOMContentLoaded", generateBingoCard);
