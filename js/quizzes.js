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

function renderList() {
    listBox.innerHTML = '';
    quizzes.forEach(q => {
        const card = document.createElement('div');
        card.className = 'rounded-xl border border-gray-200 bg-white p-6 shadow-sm relative flex flex-col';
        card.innerHTML = `
        <div class="flex-1">
          <div class="absolute top-4 right-4 text-blue-400"><i data-lucide="help-circle" class="w-6 h-6"></i></div>
          <h3 class="text-lg font-bold text-gray-800 pr-8">${q.title}</h3>
          <div class="mt-4 inline-block bg-gray-100 text-gray-700 text-sm font-semibold px-3 py-1 rounded-md">${q.questions.length} Questions</div>
        </div>
        <button class="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 font-semibold hover:opacity-90 flex items-center justify-center gap-2">
          <i data-lucide="play" class="w-5 h-5"></i> Commencer
        </button>
      `;
        card.querySelector('button').addEventListener('click', () => startQuiz(q.id));
        listBox.appendChild(card);
    });
    lucide.createIcons();
}

function startQuiz(id) {
    current = quizzes.find(x => x.id === id);
    qi = 0;
    score = 0;
    selectedTF = null;
    show(pageHeader, false);
    show(listView, false);
    show(runView, true);
    show(resultView, false);
    showQuestion();
}

function showQuestion() {
    const q = current.questions[qi];
    titleEl.textContent = current.title;
    qText.textContent = q.question;
    progress.style.width = ((qi + 1) / current.questions.length) * 100 + '%';
    progressLabel.textContent = `Question ${qi+1}/${current.questions.length}`;
    show(feedback, false);
    answerArea.innerHTML = '';

    if (q.type === 'text') {
        answerArea.innerHTML += `<input id="q-text-answer" class="w-full bg-gray-100 border-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Votre réponse ..."/>`;
    } else {
        answerArea.innerHTML = `<div class="flex gap-4"><button id="btn-true" class="flex-1 border-2 bg-gray-50 border-gray-300 rounded-lg py-3 font-semibold hover:border-green-500 hover:bg-green-100">Vrai</button><button id="btn-false" class="flex-1 border-2 bg-gray-50 border-gray-300 rounded-lg py-3 font-semibold hover:border-red-500 hover:bg-red-100">Faux</button></div>`;
        document.getElementById('btn-true').onclick = () => selectedTF = true;
        document.getElementById('btn-false').onclick = () => selectedTF = false;
    }
}