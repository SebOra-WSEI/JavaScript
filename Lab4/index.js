const localStorageKey = 'notes'
const defaultNoteColor = '#FF6868'

let notes = [];

function displayNotes() {
  let noteContainer = document.querySelector('#note_container');
  let templateElement = document.querySelector('#note_template');

  noteContainer.innerHTML = null

  notes.forEach(({ title, content, timestamp, color }, i) => {
    let noteElement = templateElement.cloneNode(true)

    noteElement.querySelector('#note-title').innerText = title;
    noteElement.querySelector('#note-content').innerText = content

    noteElement.querySelectorAll('#note-icon').forEach(el => {
      el.setAttribute('id', i);
    });

    noteElement.querySelector('#deleteNote').addEventListener('click', () => {
      deleteNote(title)
    });

    noteElement.setAttribute('class', 'note');
    noteElement.setAttribute('style', `background-color: ${color};`);

    noteElement.querySelector('#note-date').innerText = new Date(timestamp).toDateString()

    noteContainer.appendChild(noteElement);

    noteElement.removeAttribute('hidden');
  });
}

const loadNotes = () => JSON.parse(localStorage.getItem(localStorageKey));
const saveNotes = () => localStorage.setItem(localStorageKey, JSON.stringify(notes));

function createNote() {
  let creator = document.getElementById('note_creator');

  let note = {
    title: creator.querySelector('#note_title_creator').value,
    content: creator.querySelector('#note_content_creator').value,
    color: creator.querySelector('#note_color').value,
    timestamp: Date.now(),
  }

  notes.push(note);

  saveNotes();
  displayNotes();
}

function deleteNote(title) {
  notes = notes.filter(n => n.title !== title);
  saveNotes();
  displayNotes();
}

notes = loadNotes();
document.querySelector('#note_color').value = defaultNoteColor
document.querySelector('#addBtn').addEventListener('click', createNote);

displayNotes();