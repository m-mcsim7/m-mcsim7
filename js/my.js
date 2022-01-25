const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let boardLocked = false;
let firstCard;
let secondCard;
const flipcard = (e) => {
  if (boardLocked) return;
  const target = e.target.parentElement;
  if (target === firstCard) return;
  target.classList.add("flip");
  console.log(target.dataset.club);

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = target;
  } else {
    hasFlippedCard = false;
    secondCard = target;
    chekForMatch();
  }
};
const chekForMatch = () => {
  if (firstCard.dataset.club === secondCard.dataset.club) {
    firstCard.removeEventListener("click", flipcard);
    secondCard.removeEventListener("click", flipcard);
    console.log("Бинго - карточки совпали");
  } else {
    boardLocked = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
  }
};

const resetBoard = () => {
  boardLocked = hasFlippedCard = false;
  firstCard = secondCard = null;
};

cards.forEach((card) => {
  card.addEventListener("click", flipcard);

  const randomIndex = Math.floor(Math.random() * cards.length);
  card.style.order = randomIndex;
  console.log(randomIndex);
});
