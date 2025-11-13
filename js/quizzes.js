lucide.createIcons();
menuBtn.addEventListener("click", () => menuMobile.classList.toggle("hidden"));

let quizzes = [];
let current = null,
    qi = 0,
    score = 0,
    selectedTF = null;

const pageHeader = document.getElementById('page-header');
const listView = document.getElementById('q-list-view');
const listBox = document.getElementById('q-list');
const runView = document.getElementById('q-run-view');
const titleEl = document.getElementById('q-title');
const qText = document.getElementById('q-text');
const progress = document.getElementById('q-progress');
const progressLabel = document.getElementById('q-progress-label');
const answerArea = document.getElementById('q-answer-area');
const feedback = document.getElementById('q-feedback');
const resultView = document.getElementById('q-result-view');
const scoreEl = document.getElementById('q-score');
const percentEl = document.getElementById('q-percent');


function show(el, yes) { el.classList[yes ? 'remove' : 'add']('hidden'); }

function norm(s) { return (s || '').toString().trim().toLowerCase(); }