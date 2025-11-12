const LS_KEY = "cards_collections";
let collections = JSON.parse(localStorage.getItem(LS_KEY)) || [];
let currentId = null,
    index = 0,
    flipped = false;

const save = () => localStorage.setItem(LS_KEY, JSON.stringify(collections));
const getCol = id => collections.find(c => c.id === id);