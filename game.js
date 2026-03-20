/**
 * game.js — The Urinal Test
 * Game engine. Depends on window.LEVELS defined in levels.js.
 */

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let currentLevel = 0;
let totalScore   = 0;
let levelScores  = []; // array of score tiers per level (e.g. ['perfect', 'wrong', …])
let answered     = false;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SCORE_POINTS = { perfect: 100, good: 75, okay: 50, wrong: 0 };

const SCORE_EMOJI  = { perfect: '🏆', good: '👍', okay: '😐', wrong: '💀' };

// CSS class applied to a urinal based on score tier (used during reveal)
const TIER_CLASS   = { perfect: 'result-perfect', good: 'result-good', okay: 'result-okay', wrong: 'result-wrong' };

const LS_KEY = 'urinaltest_best';

// Inline SVG for an occupied urinal's person silhouette
const PERSON_SVG = `
<svg viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="7" r="5"/>
  <rect x="6" y="14" width="12" height="16" rx="3"/>
  <rect x="6" y="28" width="5" height="12" rx="2"/>
  <rect x="13" y="28" width="5" height="12" rx="2"/>
</svg>`;

// ---------------------------------------------------------------------------
// initGame — entry point
// ---------------------------------------------------------------------------
function initGame() {
  // Wire up buttons
  document.getElementById('btn-start').addEventListener('click', startGame);
  document.getElementById('btn-next').addEventListener('click', nextLevel);
  document.getElementById('btn-restart').addEventListener('click', startGame);
  document.getElementById('btn-share').addEventListener('click', shareResult);

  // Display best score on title screen if one exists
  const best = localStorage.getItem(LS_KEY);
  const bestDisplay = document.getElementById('best-score-display');
  if (best !== null) {
    bestDisplay.textContent = `Best score: ${best} / ${window.LEVELS.length * 100}`;
  } else {
    bestDisplay.textContent = '';
  }

  showScreen('screen-title');
}

// ---------------------------------------------------------------------------
// startGame — reset state and begin from level 0
// ---------------------------------------------------------------------------
function startGame() {
  currentLevel = 0;
  totalScore   = 0;
  levelScores  = [];
  answered     = false;

  showScreen('screen-game');
  loadLevel(currentLevel);
}

// ---------------------------------------------------------------------------
// showScreen — hide all screens, activate the requested one
// ---------------------------------------------------------------------------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ---------------------------------------------------------------------------
// loadLevel — render a level from window.LEVELS[levelIndex]
// ---------------------------------------------------------------------------
function loadLevel(levelIndex) {
  answered = false;

  const level    = window.LEVELS[levelIndex];
  const total    = window.LEVELS.length;
  const bathroom = document.getElementById('bathroom');

  // Update HUD
  document.getElementById('level-label').textContent  = `Level ${levelIndex + 1} / ${total}`;
  document.getElementById('score-label').textContent   = `Score: ${totalScore}`;

  // Set scenario text
  document.getElementById('scenario-name').textContent = level.name || '';
  document.getElementById('scenario-desc').textContent = level.description || '';

  // Clear previous urinals
  bathroom.innerHTML = '';

  // Render each urinal defined in the level
  level.urinals.forEach(urinal => {
    bathroom.appendChild(renderUrinal(urinal));
  });

  // Hide feedback + next button
  const feedbackArea = document.getElementById('feedback-area');
  feedbackArea.classList.add('hidden');
  feedbackArea.classList.remove('visible');

  document.getElementById('btn-next').classList.add('hidden');
}

// ---------------------------------------------------------------------------
// renderUrinal — build and return a urinal DOM element
// ---------------------------------------------------------------------------
function renderUrinal(urinal) {
  const el = document.createElement('div');
  el.classList.add('urinal');
  el.dataset.id = urinal.id;

  if (urinal.occupied) {
    el.classList.add('occupied');
  }

  // Inner structure
  el.innerHTML = `
    <div class="urinal-body">
      <div class="urinal-bowl"></div>
    </div>
    ${urinal.occupied ? `<div class="person-icon">${PERSON_SVG}</div>` : ''}
  `;

  // Only non-occupied urinals are clickable
  if (!urinal.occupied) {
    el.addEventListener('click', () => handleChoice(urinal.id));
  }

  return el;
}

// ---------------------------------------------------------------------------
// handleChoice — process the player's urinal selection
// ---------------------------------------------------------------------------
function handleChoice(urinalId) {
  if (answered) return;
  answered = true;

  const level   = window.LEVELS[currentLevel];
  const tier    = (level.scores && level.scores[urinalId]) || 'wrong';
  const points  = SCORE_POINTS[tier] ?? 0;

  // Record this level's result
  levelScores.push(tier);
  totalScore += points;

  // Mark the chosen urinal with a "selected" class first, then its tier
  const chosenEl = document.querySelector(`.urinal[data-id="${urinalId}"]`);
  if (chosenEl) {
    chosenEl.classList.add('selected', TIER_CLASS[tier] || 'wrong');
  }

  // Reveal tier of every unoccupied urinal
  document.querySelectorAll('.urinal:not(.occupied)').forEach(el => {
    const id      = el.dataset.id;
    const elTier  = (level.scores && level.scores[id]) || 'wrong';

    // Always show perfect spots as green for learning purposes
    if (elTier === 'perfect') {
      el.classList.add('result-perfect');
    }

    // If this is the chosen urinal, tier class was already applied above
    // For all others, add their tier class subtly so the player can learn
    if (id !== String(urinalId)) {
      el.classList.add('reveal', TIER_CLASS[elTier] || 'wrong');
    }
  });

  // Update score in HUD immediately
  document.getElementById('score-label').textContent = `Score: ${totalScore}`;

  // Show feedback message
  showFeedback(tier, currentLevel);

  // Reveal next button with a short delay for polish
  setTimeout(() => {
    document.getElementById('btn-next').classList.remove('hidden');
  }, 600);
}

// ---------------------------------------------------------------------------
// showFeedback — display emoji + message for the chosen tier
// ---------------------------------------------------------------------------
function showFeedback(tier, levelIndex) {
  const level       = window.LEVELS[levelIndex];
  const emoji       = SCORE_EMOJI[tier] || '❓';
  const message     = (level.feedback && level.feedback[tier]) || '';

  document.getElementById('feedback-emoji').textContent = emoji;
  document.getElementById('feedback-msg').textContent   = message;

  const feedbackArea = document.getElementById('feedback-area');
  feedbackArea.classList.remove('hidden');

  // Trigger CSS transition on next frame
  requestAnimationFrame(() => feedbackArea.classList.add('visible'));
}

// ---------------------------------------------------------------------------
// nextLevel — advance to next level or show results
// ---------------------------------------------------------------------------
function nextLevel() {
  currentLevel++;

  if (currentLevel < window.LEVELS.length) {
    loadLevel(currentLevel);
  } else {
    showResults();
  }
}

// ---------------------------------------------------------------------------
// showResults — display final score and rating
// ---------------------------------------------------------------------------
function showResults() {
  showScreen('screen-results');

  const maxScore   = window.LEVELS.length * 100;
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  // Determine rating tier
  let rating, ratingDesc;

  if (percentage >= 100) {
    rating      = 'Urinal Grandmaster';
    ratingDesc  = 'You were born knowing The Code.';
  } else if (percentage >= 80) {
    rating      = 'The Silent Professional';
    ratingDesc  = 'Minimal eye contact. Maximum distance. Respect.';
  } else if (percentage >= 60) {
    rating      = 'Situationally Aware';
    ratingDesc  = 'You get it, mostly. The code runs deep in you.';
  } else if (percentage >= 40) {
    rating      = 'The Naive One';
    ratingDesc  = 'You mean well. The guys next to you don\'t.';
  } else if (percentage >= 20) {
    rating      = 'The Menace';
    ratingDesc  = 'Multiple violations. A danger to the ecosystem.';
  } else {
    rating      = 'The War Criminal';
    ratingDesc  = 'You stood next to people ON PURPOSE.';
  }

  // Populate results screen
  document.getElementById('result-score-display').textContent = `${totalScore} / ${maxScore}`;
  document.getElementById('result-rating').textContent        = rating;
  document.getElementById('result-description').textContent   = ratingDesc;

  // Save best score to localStorage
  const prev = parseInt(localStorage.getItem(LS_KEY), 10);
  if (isNaN(prev) || totalScore > prev) {
    localStorage.setItem(LS_KEY, totalScore);
  }
}

// ---------------------------------------------------------------------------
// shareResult — copy a shareable result string to the clipboard
// ---------------------------------------------------------------------------
function shareResult() {
  const maxScore = window.LEVELS.length * 100;
  const url      = window.location.href;
  const text     = `I scored ${totalScore}/${maxScore} on The Urinal Test. Can you beat me? ${url}`;

  navigator.clipboard.writeText(text)
    .then(() => showToast('Copied!'))
    .catch(() => {
      // Fallback for browsers that block clipboard without HTTPS
      showToast('Copy failed — share manually!');
    });
}

// ---------------------------------------------------------------------------
// showToast — brief notification overlay
// ---------------------------------------------------------------------------
function showToast(message) {
  // Reuse an existing toast element if one is already in the DOM
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }

  // Clone to restart CSS animation on each show
  const newToast = toast.cloneNode(false);
  newToast.textContent = message;
  newToast.classList.remove('hidden');
  toast.parentNode.replaceChild(newToast, toast);
}

// ---------------------------------------------------------------------------
// Expose entry point and kick off on DOM ready
// ---------------------------------------------------------------------------
window.initGame = initGame;
