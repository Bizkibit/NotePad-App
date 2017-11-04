window.onload = function()  {
  displayNotes();
  let form = document.querySelector('#new-note-form');

  form.addEventListener('submit', function(e) {
  	e.preventDefault();
  	let {currentTarget} = e;
  	let fData = new FormData(currentTarget);
  	fetch('/notes', {
  		method: 'POST',
  		body: fData
  	}).then(displayNotes);
    currentTarget.reset();
  });

}

function getNotes() {
  return fetch('/notes').then(res => res.json());
}

function renderNotes(notes)  {
  let board = document.querySelector('.board');
  let notesHTML = notes.map( note => {
    return `
      <div class="note" id="note-${note.id}">
        <h3>${note.title}</h3>
        <input class="delete" type="button" name="deleteButton" value="X">
        <p>${note.content}</p>
      </div>
    `
  }).join('')
  board.innerHTML = notesHTML;
}

function displayNotes() {
  getNotes()
  .then(renderNotes)
  .then(function() {
    let notes = document.querySelectorAll('.note');
    let deleteButtons = document.querySelectorAll('.delete');
    let contents = document.querySelectorAll('.note>p, .note>h3')
    deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', deleteNotes));
    contents.forEach(content => content.addEventListener('dblclick', EditNotes));
  })
}

function deleteNotes(e)  {
  e.stopPropagation();
  let {currentTarget} = e;
  let id = currentTarget.parentElement.id.split('-')[1];
  fetch(`/notes/${id}`, {
    method: 'delete'
  })
  .then(displayNotes);
}

  function EditNotes(e)  {
  let body = document.querySelector('body');
  let html = document.querySelector('html');
  body.style.filter = "blur(5px)";
  let {parentElement} = e.target;
  // debugger;
  // editBox(parentElement);
  // let editBox = document.createElement('div');
  // editBox.id = "editBox"
  // editBox.classList.add('note');
  // editBoxHTML = `
  //   <form class='edit-note-form' data-note-id="${parentElement.id}">
  //
  //       <input type="text" name="title" id="title"
  //       value="${parentElement.firstElementChild.textContent}" placeholder="Title">
  //
  //       <textarea name="content" id="content" placeholder="Create a new note" wrap="soft"
  //       required>${parentElement.lastElementChild.textContent}</textarea>
  //
  //       <input type="submit" id="save" value="Save">
  //       <input type="submit" id="cancel" value="Cancel">
  //
  //   </form>
  // `
  // editBox.innerHTML = editBoxHTML;
  let popUp = editBox(parentElement);
  html.appendChild(popUp);
  let saveButton = document.querySelector('#save');
  let cancelButton = document.querySelector('#cancel');
  popUp.firstElementChild.addEventListener('submit', saveChanges);
  // saveButton.addEventListener('click', saveChanges);
}


function saveChanges(event) {
  event.preventDefault();
  // let {parentElement} = event.currentTarget;
  let {currentTarget} = event;
  let fData = new FormData(currentTarget);
  let id = currentTarget.dataset.noteId.split('-')[1];
  debugger;
  fetch(`/notes/${id}`, {
    method: 'PATCH',
    body: fData
  })
  .then(note => {
      currentTarget.parentElement.remove();
      let body = document.querySelector('body');
      body.style.filter = "";
  })
  .then(displayNotes);
}

function editBox(parentElement)  {
  let editBox = document.createElement('div');
  editBox.id = "editBox"
  editBox.classList.add('note');
  editBoxHTML = `
    <form class='edit-note-form' data-note-id="${parentElement.id}">

        <input type="text" name="title" id="title"
        value="${parentElement.firstElementChild.textContent}" placeholder="Title">

        <textarea name="content" id="content" placeholder="Create a new note" wrap="soft"
        required>${parentElement.lastElementChild.textContent}</textarea>

        <input type="submit" id="save" value="Save">
        <input type="button" id="cancel" value="Cancel">

    </form>
  `
  editBox.innerHTML = editBoxHTML;
  return editBox
}
