const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) ||  [];

function addItem(e){
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
        <button data-item=${i} class="delete" value="delete">X</button>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if(!e.target.matches('input')) return;
  let itemIndex = e.target.dataset.index;
  console.log(items[itemIndex].done)
  items[itemIndex].done = !items[itemIndex].done;
  console.log(items[itemIndex].done)
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function deleteItem(e) {
  items.splice(e.target.attributes['data-item'].value, 1);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', (e) => {
  (e.target.value === "delete")
    ? deleteItem(e)
    : toggleDone(e)
});


populateList(items, itemsList);
