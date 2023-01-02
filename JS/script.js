// --Varibales
// form select
const form = document.querySelector("#form");
// paret of all notes
const noteList = document.querySelector("#note-list");

// -- Events
// submit new note
form.addEventListener("submit", newnote);

// --Function
function newnote(e) {
  e.preventDefault();

  // Access to taxt area value
  const noteText = document.querySelector("#note").value;
  // Access to text input value
  const noteTitle = document.querySelector("#title").value;

  // Craete <div> tag
  let div = document.createElement("div");
  (div.innerText = noteTitle), noteText;

  // Craete remove button (✖)
  const removeBtn = document.createElement("a");
  removeBtn.innerText = "✖";
  removeBtn.classList.add("removeBtn");

  // Adding remove button to div
  div.appendChild(removeBtn);

  // Adding <div> to the #note-list
  noteList.appendChild(div);
}
