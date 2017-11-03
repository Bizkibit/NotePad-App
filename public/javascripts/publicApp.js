window.onload = function()  {

  let form = document.querySelector('#new-note-form');
  let board = document.querySelector('.board');
  getNotes().then(renderNotes);

  form.addEventListener('submit', function(e) {
  	e.preventDefault();
  	let {currentTarget} = e;
  	let fData = new FormData(currentTarget);
  	fetch('/notes', {
  		method: 'POST',
  		body: fData
  	}).then(() => getNotes())
      .then(renderNotes);
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
      </div>
    `
  }).join('')
  board.innerHTML = notesHTML;
}
