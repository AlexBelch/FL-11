let rootNode = document.getElementById('root');
const maxItems = 10;
let id = 1;
let dragSrcEl = null;
let checkedEdit = [];

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAlloved = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    this.classList.add('dragElem');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragLeave() {
    this.classList.remove('over');
}

function handleDrop(e) {  
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragSrcEl !== this) {
        this.parentNode.removeChild(dragSrcEl);
        let dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin',dropHTML);
        let dropElem = this.previousSibling;
        if (dropElem.children[0].disabled) {
        dropElem.children[0].checked = true;
        }
        addDnDHandlers(dropElem);
        const editButton = 2;
        const delButton = 3; 
        document.getElementById(dropElem.children[0].id).addEventListener('click', checked);
        document.getElementById(dropElem.children[editButton].id).addEventListener('click', editTask);
        document.getElementById(dropElem.children[delButton].id).addEventListener('click', delTask);
    }
    this.classList.remove('over');
    return false;
}

function handleDragEnd() {
    this.classList.remove('over');
    this.classList.remove('dragElem');
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);
}

function changeInput() {
    const name = document.getElementById('list-add-name').value;
    if (name === '') {
        document.getElementById('list-add-btn').disabled = 'disabled';
    } else {
        document.getElementById('list-add-btn').disabled = '';
    }
}

function checked(event) {
    event.target.disabled='disabled';
    checkedEdit[event.target.id] = true;
}

function addTask() {

    const name = document.getElementById('list-add-name').value;
    let listsNode = document.getElementById('list-tasks');

    let elemDiv = document.createElement('div');
    elemDiv.classList.add('list-item-tasks');
    elemDiv.draggable = 'true';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'checkbox';
    checkbox.id = id;  
    let div = document.createElement('div');
    div.innerHTML = name;
    let btnEdit = document.createElement('button');	
    btnEdit.classList.add('button-list');
    btnEdit.name = 'button';
    btnEdit.id = `btn_edit${id}`;
    btnEdit.innerHTML = `<i class='material-icons md-36'>edit</i>`;
    let btnDelete = document.createElement('button');
    btnDelete.classList.add('button-list');
    btnDelete.name = 'button';
    btnDelete.id = `btn_del${id}`;
    btnDelete.innerHTML = `<i class='material-icons md-36'>delete</i>`;

    elemDiv.appendChild(checkbox);
    elemDiv.appendChild(div);
    elemDiv.appendChild(btnEdit);
    elemDiv.appendChild(btnDelete);
    listsNode.appendChild(elemDiv);
    let countItems = listsNode.childElementCount;

    if ( countItems === maxItems) {
        document.getElementById('list-add-btn').disabled = 'disabled';
        document.getElementById('list-add-name').disabled = 'disabled';
        document.getElementById('notification').style.display = 'block';
    }
    document.getElementById(checkbox.id).addEventListener('click', checked);
    document.getElementById(btnDelete.id).addEventListener('click', delTask);
    document.getElementById(btnEdit.id).addEventListener('click', editTask);
    addDnDHandlers(elemDiv);
    id = id + 1;
}

function editTask(event) {
    let listsNode = document.getElementById('list-tasks');
    const item = document.createElement('div');
    const valueName = event.target.parentNode.parentNode.children[1].innerHTML
    let inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.name = 'text';
    inputName.id = event.target.parentNode.parentNode.children[0].id;
    inputName.value = valueName;

    let btnSave = document.createElement('button');	
    btnSave.classList.add('button-list');
    btnSave.name = 'button';
    btnSave.id = `btn_save${id}`;
    btnSave.innerHTML = `<i class='material-icons md-36'>save</i>`;

    item.appendChild(inputName);
    item.appendChild(btnSave);

    listsNode.replaceChild(item, event.target.parentNode.parentNode);

    document.getElementById(btnSave.id).addEventListener('click', saveTask);
    id = id + 1;
}

function saveTask(event) {
    let listsNode = document.getElementById('list-tasks');

    let elemDiv = document.createElement('div');
    elemDiv.classList.add('list-item-tasks');
    elemDiv.draggable = 'true';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'checkbox';
    checkbox.id = id;
    if (checkedEdit[event.target.parentNode.parentNode.children[0].id]) {
        checkbox.checked = true;
        checkbox.disabled = 'disabled';
    }
    let div = document.createElement('div');
    div.innerHTML = event.target.parentNode.parentNode.children[0].value;
    let btnEdit = document.createElement('button');
    btnEdit.classList.add('button-list');
    btnEdit.name = 'button';
    btnEdit.id = `btn_edit${id}`;
    btnEdit.innerHTML = `<i class='material-icons md-36'>edit</i>`;
    let btnDelete = document.createElement('button');
    btnDelete.classList.add('button-list');
    btnDelete.name = 'button';
    btnDelete.id = `btn_del${id}`;
    btnDelete.innerHTML = `<i class='material-icons md-36'>delete</i>`;

    elemDiv.appendChild(checkbox);
    elemDiv.appendChild(div);
    elemDiv.appendChild(btnEdit);
    elemDiv.appendChild(btnDelete);

    listsNode.replaceChild(elemDiv, event.target.parentNode.parentNode);

    document.getElementById(checkbox.id).addEventListener('click', checked);
    document.getElementById(btnDelete.id).addEventListener('click', delTask);
    document.getElementById(btnEdit.id).addEventListener('click', editTask);
    addDnDHandlers(elemDiv);
    id = id + 1;
}


function delTask(event) {
    let listsNode = document.getElementById('list-tasks');
    const countItems = listsNode.childElementCount;
    if ( countItems === maxItems) {
        document.getElementById('list-add-btn').disabled = '';
        document.getElementById('list-add-name').disabled = '';
        document.getElementById('notification').style.display = 'none';
    }
    listsNode.removeChild(event.target.parentNode.parentNode);
}

document.getElementById('list-add-name').addEventListener('input', changeInput);
document.getElementById('list-add-btn').addEventListener('click', addTask);
