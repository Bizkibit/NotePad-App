window.onload = function()  {

  let form = document.querySelector('#new-note-form');
  // let board = document.querySelector('.board');
  // let notes;
  // getNotes()
  // .then(renderNotes)
  // .then(function() {
  //   notes = document.querySelectorAll('.note');
  //   debugger;
  //   notes.forEach( note => note.addEventListener('mousedown', () => {
  //     alert('cunt')
  //   }))
  // })
  displayNotes();


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
        <p>${note.content}</p>
        <button class='delete'>delete</button>
      </div>
    `
  }).join('')
  board.innerHTML = notesHTML;
}

function displayNotes() {
  getNotes()
  .then(renderNotes)
  .then(function() {
    // let notes = document.querySelectorAll('.note');
    let deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', deleteNotes));
    // notes.forEach( note => note.addEventListener('mousedown', () => {
    //   alert('cunt')
    // }))
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
