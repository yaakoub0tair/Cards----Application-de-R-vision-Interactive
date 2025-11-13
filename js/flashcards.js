const LS_KEY = "cards_collections";
let collections = JSON.parse(localStorage.getItem(LS_KEY)) || [];
let currentId = null,
    index = 0,
    flipped = false;

const save = () => localStorage.setItem(LS_KEY, JSON.stringify(collections));
const getCol = id => collections.find(c => c.id === id);

const collectionsList = document.getElementById("collectionsList");
const studyArea = document.getElementById("studyArea");
const newCollectionInput = document.getElementById("newCollection");
const addCollectionBtn = document.getElementById("addCollection");
const addCardBtn = document.getElementById("addCardBtn");
const selectCollection = document.getElementById("selectCollection");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const saveCardBtn = document.getElementById("saveCard");
const cardModal = document.getElementById("cardModal");
const closeModal = document.getElementById("closeModal");


function renderCollections() {
    collectionsList.innerHTML = "";
    selectCollection.innerHTML = "";

    if (collections.length === 0) {
        collectionsList.innerHTML = "<p class='text-gray-400 text-sm'>Aucune collection</p>";
        addCardBtn.disabled = true;
        return;
    }

    addCardBtn.disabled = false;

    collections.forEach(c => {
        const div = document.createElement("button");
        div.className = "flex justify-between items-center bg-slate-100 p-4 rounded-lg text-left hover:bg-slate-200 transition";
        div.innerHTML = `<div><p class='font-bold text-base text-gray-800'>${c.title}</p>
        <p class='text-sm text-gray-500 mt-1'>${(c.cards||[]).length} carte(s)</p></div>
        <i data-lucide='chevron-right' class='w-5 h-5 text-gray-400'></i>`;
        div.addEventListener("click", () => {
            currentId = c.id;
            showCard(0, false);
        });
        collectionsList.appendChild(div);

        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.title;
        selectCollection.appendChild(opt);
    });
    lucide.createIcons();
}

function showCard(i, keepFlip) {
    const col = getCol(currentId);
    if (!col || !col.cards.length) {
        studyArea.innerHTML = `<p class='text-gray-500'>Aucune carte dans cette collection.</p>`;
        studyArea.classList.remove("bg-transparent");
        studyArea.classList.add("bg-white", "shadow-sm", "border", "border-gray-200/80");
        return;
    }
    index = Math.max(0, Math.min(i, col.cards.length - 1));
    if (!keepFlip) flipped = false;
    const card = col.cards[index];

    studyArea.classList.remove("bg-white", "shadow-sm", "border", "border-gray-200/80");
    studyArea.classList.add("bg-transparent");

    studyArea.innerHTML = `
      <div class='flex flex-col items-center justify-center w-full'>
        <span class='mb-3 text-gray-700'>Carte ${index+1} / ${col.cards.length}</span>
        <div id="cardBox" 
          class="rounded-2xl w-full max-w-lg cursor-pointer text-white text-center py-20 px-6 
          bg-gradient-to-br ${flipped ? 'from-blue-500 to-blue-600' : 'from-pink-500 to-fuchsia-600'} 
          transition-all duration-300 transform hover:scale-[1.02]">
          <div class="text-sm opacity-80 mb-2">
            ${flipped ? 'RÉPONSE' : 'QUESTION'}
          </div>
          <div class="text-2xl font-bold">
            ${flipped ? card.answer : card.question}
          </div>
          <div class="mt-3 text-xs opacity-80 flex items-center justify-center gap-1">
            <i data-lucide="corner-up-left" class="w-3 h-3 rotate-icon ${flipped?'flipped':''}"></i>
            Cliquez pour retourner
          </div>
        </div>
        <div class='flex justify-center gap-5 w-full max-w-lg mt-6'>
          <button id='prevCard' class='px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300' style="background-color: #FFAEE9;">< Précédent</button>
          <button id='nextCard' class='px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-300'>Suivant  ></button>
        </div>
      </div>
    `;

    document.getElementById("cardBox").onclick = () => {
        flipped = !flipped;
        showCard(index, true);
    };
    document.getElementById("prevCard").onclick = () => showCard(index - 1);
    document.getElementById("nextCard").onclick = () => showCard(index + 1);

    lucide.createIcons();
}

addCollectionBtn.onclick = () => {
    const title = newCollectionInput.value.trim();
    if (!title) return alert("Entrez un titre !");
    const id = title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString(36);
    collections.push({ id, title, cards: [] });
    save();
    newCollectionInput.value = "";
    currentId = id;
    renderCollections();
    showCard(0);
};
addCardBtn.onclick = () => {
    renderCollections();
    if (currentId) selectCollection.value = currentId;
    cardModal.classList.remove("hidden");
    cardModal.classList.add("flex");
};

closeModal.onclick = () => {
    cardModal.classList.add("hidden");
    cardModal.classList.remove("flex");
};
saveCardBtn.onclick = () => {
    const cid = selectCollection.value;
    const q = questionInput.value.trim();
    const a = answerInput.value.trim();

    if (!cid || !q || !a) return alert("Remplissez tous les champs !");

    const col = getCol(cid);
    if (!col) { alert("Erreur : La collection sélectionnée est introuvable."); return; }
    if (!col.cards) col.cards = [];

    col.cards.push({ id: "c" + Date.now(), question: q, answer: a });
    save();
    renderCollections();

    currentId = cid;
    showCard(col.cards.length - 1);

    questionInput.value = "";
    answerInput.value = "";
    cardModal.classList.add("hidden");
    cardModal.classList.remove("flex");
};
document.getElementById("menuBtn").onclick = () => document.getElementById("menuMobile").classList.toggle("hidden");
renderCollections();