const rootNode = document.getElementById('root');
let todoItems = [];
let id = 1;
//const todoItems = [
//{isDone: false, id: 1, description: 'Todo 1'}
//];

const myStorage = window.localStorage;
console.log(myStorage.getItem('TODOITEMS'));

if (myStorage.getItem('TODOITEMS') !== null
	&& myStorage.getItem('TODOITEMS') !== ''
	&& myStorage.getItem('TODOITEMS') !== '[]') {
	todoItems = JSON.parse(myStorage.getItem('TODOITEMS'));
	id = todoItems.reduce((max, item) => item.id > max ? item.id : max, todoItems[0].id) + 1;
}
console.log(todoItems);

showMain();

function showMain() {
	let elemDiv = document.createElement('div');
	elemDiv.classList.add('main-todo');
	elemDiv.id = 'main';

	let elemH1 = document.createElement('H1');
	elemH1.innerHTML = `Simple TODO application`;

	let btnAdd = document.createElement('button');
	btnAdd.classList.add('button-list');
	btnAdd.name = 'button';
	btnAdd.id = `btn_add1`;
	btnAdd.innerHTML = `Add new task`;

	elemDiv.appendChild(elemH1);
	elemDiv.appendChild(btnAdd);

	if (todoItems.length === 0) {
		let elemH3 = document.createElement('H3');
		elemH3.innerHTML = `TODO is empty`;
		elemDiv.appendChild(elemH3);
	} else {
		let elemDivWrap = document.createElement('div');
		elemDivWrap.classList.add('main-todo-items');
		elemDivWrap.id = 'main-todo-items';

		for (let i = 0; i < todoItems.length; i = i + 1) {
			let elemDivItem = document.createElement('div');
			elemDivItem.classList.add('main-todo-item');
			elemDivItem.id = `main-todo-item${todoItems[i].id}`;

			let checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.name = 'checkbox';
			checkbox.id = `checkbox${todoItems[i].id}`;
			checkbox.checked = todoItems[i].isDone;

			let divTask = document.createElement('div');
			divTask.innerHTML = todoItems[i].description;
			divTask.id = `divTask${todoItems[i].id}`;
			if (todoItems[i].isDone) {
				divTask.style.backgroundColor = 'gray';
			}

			let btnDelete = document.createElement('button');
			btnDelete.classList.add('button-del');
			btnDelete.name = 'button';
			btnDelete.id = `btn_del${todoItems[i].id}`;
			btnDelete.innerHTML = `<i class='material-icons '>delete</i>`;

			elemDivItem.appendChild(checkbox);
			elemDivItem.appendChild(divTask);
			elemDivItem.appendChild(btnDelete);
			elemDivWrap.appendChild(elemDivItem);
			checkbox.addEventListener('click', this.checked);
			divTask.addEventListener('click', this.editClick);
			btnDelete.addEventListener('click', this.btnDel);
		}

		elemDiv.appendChild(elemDivWrap);
	}
	rootNode.appendChild(elemDiv);

	document.getElementById('btn_add1').addEventListener('click', this.btnAdd);
}

function showAdd() {
	let elemDiv = document.createElement('div');
	elemDiv.classList.add('main-todo-add');
	elemDiv.id = 'add';

	let elemH1 = document.createElement('H1');
	elemH1.innerHTML = `Add task`;

	let inputAdd = document.createElement('input');
	inputAdd.type = 'text';
	inputAdd.name = 'text';
	inputAdd.id = 'input_add';

	let elemDivButtons = document.createElement('div');
	elemDivButtons.classList.add('main-todo-add-buttons');
	elemDivButtons.id = 'add-buttons';

	let btnCancel = document.createElement('button');
	btnCancel.classList.add('button-list');
	btnCancel.name = 'button';
	btnCancel.id = `btn_cancel1`;
	btnCancel.innerHTML = `Cancel`;

	let btnSave = document.createElement('button');
	btnSave.classList.add('button-list');
	btnSave.name = 'button';
	btnSave.id = `btn_save1`;
	btnSave.disabled = 'disabled';
	btnSave.innerHTML = `Save changes`;

	elemDiv.appendChild(elemH1);
	elemDiv.appendChild(inputAdd);
	elemDivButtons.appendChild(btnCancel);
	elemDivButtons.appendChild(btnSave);
	elemDiv.appendChild(elemDivButtons);
	rootNode.appendChild(elemDiv);

	btnCancel.addEventListener('click', this.btnCancel);
	btnSave.addEventListener('click', this.btnSave);
	inputAdd.addEventListener('input', this.inputAddChange);
}

function showModify() {
	let id = window.location.hash.replace('#/modify/', '');

	let item = todoItems.filter(item => item.id === parseInt(id, 10));

	let elemDiv = document.createElement('div');
	elemDiv.classList.add('main-todo-modify');
	elemDiv.id = 'modify';

	let elemH1 = document.createElement('H1');
	elemH1.innerHTML = `Modify item`;

	const valueName = item[0].description;
	let inputModify = document.createElement('input');
	inputModify.type = 'text';
	inputModify.name = 'text';
	inputModify.id = 'input_modify';
	inputModify.value = valueName;

	let elemDivButtons = document.createElement('div');
	elemDivButtons.classList.add('main-todo-modify-buttons');
	elemDivButtons.id = 'modify-buttons';

	let btnCancel = document.createElement('button');
	btnCancel.classList.add('button-list');
	btnCancel.name = 'button';
	btnCancel.id = `btn_cancel2`;
	btnCancel.innerHTML = `Cancel`;

	let btnSave = document.createElement('button');
	btnSave.classList.add('button-list');
	btnSave.name = 'button';
	btnSave.id = `btn_save1`;
	btnSave.innerHTML = `Save changes`;

	elemDiv.appendChild(elemH1);
	elemDiv.appendChild(inputModify);
	elemDivButtons.appendChild(btnCancel);
	elemDivButtons.appendChild(btnSave);
	elemDiv.appendChild(elemDivButtons);
	rootNode.appendChild(elemDiv);
	btnCancel.addEventListener('click', this.btnCancel);
	btnSave.addEventListener('click', this.btnEditSave);
	inputModify.addEventListener('input', this.inputModifyChange);
}

function btnAdd() {
	window.location.hash = '#/add';
}

function checked(e) {
	let index = Array.prototype.indexOf.call(e.target.parentNode.parentNode.children, e.target.parentNode);

	if (e.target.checked) {
		document.getElementById(`divTask${todoItems[index].id}`).style.backgroundColor = 'gray';
		todoItems[index].isDone = true;

		const temp = document.getElementById(`divTask${todoItems[index].id}`).parentNode;
		console.log(temp);
		document.getElementById(`divTask${todoItems[index].id}`).parentNode.parentNode
			.removeChild(document.getElementById(`divTask${todoItems[index].id}`)
				.parentNode.parentNode.children[index]);
		document.getElementById('main-todo-items').appendChild(temp);

		todoItems.push(todoItems.splice(index, 1)[0]);
	} else {
		document.getElementById(`divTask${todoItems[index].id}`).style.backgroundColor = 'white';

		const temp = document.getElementById(`divTask${todoItems[index].id}`).parentNode;
		//console.log(temp);
		let placeTo = todoItems.filter(item => item.isDone === false).length;
		//console.log("placeTo=", placeTo);

		document.getElementById(`divTask${todoItems[index].id}`).parentNode.parentNode
			.removeChild(document.getElementById(`divTask${todoItems[index].id}`)
							.parentNode.parentNode.children[index]);

		if (placeTo === 0) {
			const elemTo = document.getElementById('main-todo-items').firstChild;
			document.getElementById('main-todo-items').insertBefore(temp, elemTo);
		} else if (placeTo === todoItems.length - 1) {
			document.getElementById('main-todo-items').appendChild(temp);
		} else if (placeTo !== index) {
			const elemTo = document.getElementById(`divTask${todoItems[placeTo].id}`).parentNode;
			document.getElementById('main-todo-items').insertBefore(temp, elemTo);
		} else {
			const elemTo = document.getElementById(`divTask${todoItems[placeTo + 1].id}`).parentNode;
			document.getElementById('main-todo-items').insertBefore(temp, elemTo);
		}

		todoItems[index].isDone = false;
		todoItems.splice(placeTo, 0, todoItems[index]);
		todoItems.splice(index + 1, 1);
	}

	myStorage.setItem('TODOITEMS', JSON.stringify(todoItems));
}

function editClick(e) {
	let index = Array.prototype.indexOf.call(e.target.parentNode.parentNode.children, e.target.parentNode);

	if (todoItems[index].isDone) {
		alert(`Error!You can't edit already done item`);
		let elemDiv = document.createElement('div');
		elemDiv.classList.add('main-todo-modify-alert');
		elemDiv.id = 'modify-alert';
		if (!window.navigator.userAgent.includes('Chrome')) {
			//console.log("opera");
			elemDiv.style.right = 0;
		}

		let elemDiv1 = document.createElement('div');
		elemDiv1.innerHTML = `Danger!`;
		elemDiv.appendChild(elemDiv1);

		let elemDivButtons = document.createElement('div');
		elemDivButtons.classList.add('main-todo-modify-buttons-close');
		elemDivButtons.id = 'modify-buttons-alert-close';

		let btnCancel = document.createElement('button');
		btnCancel.classList.add('button-close');
		btnCancel.name = 'button';
		btnCancel.id = `btn_cancel2`;
		btnCancel.innerHTML = `<i class='material-icons '>close</i>`;
		elemDivButtons.appendChild(btnCancel);
		elemDiv.appendChild(elemDivButtons);

		let elemDiv2 = document.createElement('div');
		elemDiv2.innerHTML = `Error!You can't edit already done item`;
		elemDiv.appendChild(elemDiv2);

		rootNode.appendChild(elemDiv);

	} else {
		window.location.hash = `#/modify/${todoItems[index].id}`;
	}
}

function inputAddChange() {
	document.getElementById('btn_save1').disabled = false;
}

function inputModifyChange(e) {
	if (e.target.value === '') {
		document.getElementById('btn_save1').disabled = true;
	} else {
		document.getElementById('btn_save1').disabled = false;
	}
}

function btnDel(e) {
	const two = 2;
	let index = Array.prototype.indexOf.call(e.target.parentNode.parentNode.parentNode.children,
		e.target.parentNode.parentNode);

	todoItems.splice(index, 1);
	myStorage.setItem('TODOITEMS', JSON.stringify(todoItems));
	e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode.children[index]);

	if (todoItems.length === 0) {
		let elemDiv = document.getElementById('main');
		elemDiv.removeChild(elemDiv.children[two]);
		let elemH3 = document.createElement('H3');
		elemH3.innerHTML = `TODO is empty`;
		elemDiv.appendChild(elemH3);
	}
}

function btnSave() {
	const inputAdd = document.getElementById('input_add');
	const duplicate = todoItems.filter(item => item.description === inputAdd.value);

	if (duplicate.length > 0) {
		alert(`Error! You can't add already exist item`);
	} else {
		const placeTo = todoItems.filter(item => item.isDone === false).length;
		todoItems.splice(placeTo, 0, { isDone: false, id: id, description: inputAdd.value });
		window.location.hash = '';
		myStorage.setItem('TODOITEMS', JSON.stringify(todoItems));
		id = id + 1;
	}
}

function btnEditSave() {
	const id = parseInt(window.location.hash.replace('#/modify/', ''), 10);
	const index = todoItems.findIndex(item => item.id === id);
	console.log(index);
	const inputEdit = document.getElementById('input_modify');
	const duplicate = todoItems.filter(item => item.description === inputEdit.value);
	if (duplicate.length > 0 && duplicate[0].id !== id) {
		alert(`Error! You can't add already exist item`);
	} else {
		let item = todoItems[index];
		console.log(item);
		item.description = inputEdit.value;
		todoItems[index] = item;
		window.location.hash = '';
		myStorage.setItem('TODOITEMS', JSON.stringify(todoItems));
	}
}

function btnCancel() {
	window.location.hash = '';
}

function changePage() {
	rootNode.removeChild(rootNode.children[0]);
	if (window.location.hash === '#/add') {
		showAdd();
	} else if (window.location.hash.includes('#/modify/')) {
		showModify();
	} else {
		showMain();
	}
}

window.addEventListener('hashchange', changePage, false);
