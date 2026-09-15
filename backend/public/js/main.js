// Only run Study Mode code if the Study page exists
const studySection = document.querySelector('.card'); // your study section
if (studySection) {
  // Grab cards from JSON in the <script> tag
  const cards = JSON.parse(document.getElementById('cards-data').textContent);

  let currentIndex = 0;
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('answer');
  const showBtn = document.getElementById('showBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressEl = document.getElementById('progress');

  function showCard(index) {
    const card = cards[index];
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;
    answerEl.hidden = true;
    showBtn.hidden = false;
    nextBtn.hidden = true;
    progressEl.textContent = `Card ${index + 1} of ${cards.length}`;
  }

  showBtn.addEventListener('click', () => {
    answerEl.hidden = false;
    showBtn.hidden = true;
    nextBtn.hidden = false;
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= cards.length) {
      alert('You finished all cards!');
      currentIndex = 0; // loop back to start
    }
    showCard(currentIndex);
  });

  if (cards.length > 0) showCard(currentIndex);
  else questionEl.textContent = 'No cards to study.';
}
