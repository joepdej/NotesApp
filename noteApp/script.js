const addButton = document.getElementById("add-button");
const noteInput = document.getElementById("note-input");
const noteTitle = document.getElementById("note-title");
const notesList = document.getElementById("notes-list");
const formContainer = document.getElementById("form");
const notesContainer = document.getElementById("notesCon");

window.addEventListener("load", function() {
  notes = JSON.parse(sessionStorage.getItem("notes")) || [];
  renderNotes();
});

let notes = [];

const addNote = (event) => {
  event.preventDefault();
  const note = noteInput.value;
  if (note) {
    let title = noteTitle.value;
    const existingNote = notes.find((n) => n.title === title);
    if (existingNote) {
      return;
    }
    notes.push({ title: title, content: note });
    noteInput.value = "";
    noteTitle.value = "";
    renderNotes();
  }
};

const renderNotes = () => {
  sessionStorage.setItem("notes", JSON.stringify(notes));
  notesList.innerHTML = "";
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const li = document.createElement("div");
    li.style.position = "absolute";
    li.style.left = sessionStorage.getItem(note.title + "-left") || "12em";
    li.style.top = sessionStorage.getItem(note.title + "-top") || "37em";
    const title = document.createElement("h3");
    const content = document.createElement("p");
    title.innerHTML = note.title;
    content.innerHTML = note.content;
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", () => {
      notes.splice(i, 1);
      renderNotes();
    });
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.style.marginLeft = "6em";
    editButton.addEventListener("click", () => {
      noteTitle.value = note.title;
      noteInput.value = note.content;
      notes.splice(i, 1);
      renderNotes();
    });
    li.appendChild(title);
    li.appendChild(content);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    notesList.appendChild(li);

    $(li).draggable({
      containment: notesContainer,
      stop: function (event, ui) {
        sessionStorage.setItem(note.title + "-left", ui.position.left + "px");
        sessionStorage.setItem(note.title + "-top", ui.position.top + "px");
      },
    });
  }
};

addButton.addEventListener("click", addNote);
