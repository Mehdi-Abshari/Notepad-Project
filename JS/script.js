// --Varibales
// form select
const form = document.querySelector("#form");
// paret of all notes
const noteList = document.querySelector("#note-list");

// -- Events
// submit new note
form.addEventListener("submit", newNote);
document.addEventListener("DOMContentLoaded", showSavedNotes);
noteList.addEventListener("click", removeNote);

// --Function
function newNote(e) {
  e.preventDefault();

  // Access to textarea value
  const noteText = document.querySelector("#note").value;

  createUINote(noteText);

  // Adding Data to localstorage
  addToLs(noteText);
}

function removeNote(e) {
  if( e.target.classList.contains('removeBtn') ){
    e.target.parentElement.remove();

    removeFromLS(e.target.parentElement.textContent);
  };


}

function removeFromLS(noteText){
  let cleanNoteText = noteText.substring(0,noteText.length - 1)

  let oldNotes = getLS();
  oldNotes.forEach((eachNote, noteIndex)=>{
    if( eachNote == cleanNoteText){
      oldNotes.splice(noteIndex,1);
    }
  })

  localStorage.setItem('historyNotes',JSON.stringify(oldNotes))

  getLS()
}



function addToLs(noteText) {
  if (localStorage.getItem("historyNotes")) {
    let arrayParsed = getLS();
    arrayParsed.push(noteText);
    let arrayStringfy = JSON.stringify(arrayParsed);
    localStorage.setItem("historyNotes", arrayStringfy);
  } else {
    let historyArray = [];
    historyArray.push(noteText);
    let arrayStringfy = JSON.stringify(historyArray);
    localStorage.setItem("historyNotes", arrayStringfy);
  }
}

function getLS() {
  return JSON.parse(localStorage.getItem("historyNotes"));
}

function showSavedNotes() {
  let oldNotes = getLS();
  oldNotes.forEach((eachNote) => { createUINote(eachNote) });
}

function createUINote(noteValue) {
  const div = document.createElement("div");
  div.innerText = noteValue;
  div.classList.add("noteBox");

  // --Craete remove button (X)
  // Create <a> tag for remove button
  const removeBtn = document.createElement("a");

  // Set (X) to remove button
  removeBtn.innerText = "✖";
  // Set class for removeBtn
  removeBtn.classList.add("removeBtn");

  // Adding removeBtn to <div>
  div.appendChild(removeBtn);
  // Adding <div> to noteList
  noteList.appendChild(div);
}
