import React, { useState } from 'react';
import Calendar from 'react-calendar';

const App = () => {
	const [value, onChange] = useState(new Date());
	console.log(value.toLocaleString('default', { month: 'long' }));
	return (
		<>
			<div className='row'>
				<div className='col-12 col-md-6 px-4 mt-2'>
					<Calendar onChange={onChange} value={value} />
				</div>
				<div className='col-12 col-md-6 px-4 mt-2'>
					<div>{taskDisplay(value)}</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 p-1 px-4'>{AddTask(value)}</div>
				<div className='col-12 p-1 px-4'>{editTask(value)}</div>
			</div>
		</>
	);
};

const taskDisplay = (date) => {
	const allTasks = JSON.parse(localStorage.getItem('tasks'));

	let todaystask = {};
	if (allTasks) {
		todaystask = {};
		for (let index = 0; index < allTasks.length; index += 1) {
			if (allTasks[index].date.slice(0, 10) === JSON.stringify(date).slice(1, 11)) {
				todaystask.title = allTasks[index].title;
				todaystask.notes = allTasks[index].notes;
			}
		}
	}
	const heading = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
	return (
		<>
			<h2 className='bg-success text-white text-center rounded'> {heading}</h2>
			<h3 className='text-center'>Task for Today</h3>
			<div>{todaystask !== {} && taskDisplayBoard(todaystask)}</div>
		</>
	);
};

const AddTask = (date, title = '', notes = '') => {
	const task = {
		date,
		title: '',
		notes: ''
	};
	let tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));
	if (tasksFromStorage) {
		for (let index = 0; index < tasksFromStorage.length; index += 1) {
			if (tasksFromStorage[index].date.slice(0, 10) === JSON.stringify(date).slice(1, 11)) {
				return '';
			}
		}
	}

	const handleSubmit = () => {
		let tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));
		console.log(tasksFromStorage);
		if (!tasksFromStorage) {
			console.log('nono');
			tasksFromStorage = [];
		}
		task.title = document.getElementById('title').value;
		task.notes = document.getElementById('notes').value;
		if (task.title === '' || task.notes === '') {
			return;
		}
		tasksFromStorage.push(task);
		localStorage.removeItem('tasks');
		localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
		window.location = '/';
		document.getElementById('title').value = '';
		document.getElementById('notes').value = '';
	};
	const handleDiscard = () => {
		document.getElementById('title').value = '';
		document.getElementById('notes').value = '';
	};

	return (
		<>
			<div className='bg-lt-green p-5 rounded'>
				<h2 className='text-light text-center rounded'>Add Task</h2>
				<form>
					<div className='form-group'>
						<label>Title</label>
						<input id='title' type='text' className='form-control' />
					</div>
					<div className='form-group'>
						<label>Notes</label>
						<textarea id='notes' type='text' className='form-control' />
					</div>
				</form>
				<button type='button' className='btn  btn-success btn-lg' onClick={handleSubmit}>
					Save
				</button>
				<button type='button' className='btn float-right btn-secondary btn-lg' onClick={handleDiscard}>
					Discard
				</button>
			</div>
		</>
	);
};

const taskDisplayBoard = (todaystask) => {
	if (!todaystask.title) {
		return (
			<div className='bg-success p-4 rounded '>
				<p style={{ background: '#38CC77' }} className='rounded p-2'>
					No Task For Today!
				</p>
			</div>
		);
	}

	return (
		<>
			<div className='bg-success p-4 rounded '>
				<b style={{ background: '#38CC77' }} className='rounded p-2'>
					Title:{' '}
				</b>
				<p style={{ background: '#38CC77' }} className='rounded p-2'>
					{todaystask.title}
				</p>
				<b style={{ background: '#38CC77' }} className='rounded p-2'>
					Notes:{' '}
				</b>
				<p style={{ background: '#38CC77' }} className='rounded p-2'>
					{todaystask.notes}
				</p>
			</div>
		</>
	);
};

const editTask = (date) => {
	let tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));
	let tasksFromStorageToday = {};
	if (tasksFromStorage) {
		for (let index = 0; index < tasksFromStorage.length; index += 1) {
			if (tasksFromStorage[index].date.slice(0, 10) === JSON.stringify(date).slice(1, 11)) {
				tasksFromStorageToday.title = tasksFromStorage[index].title;
				tasksFromStorageToday.notes = tasksFromStorage[index].notes;
			}
		}
	}

	const handleSubmit = () => {
		let tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));

		if (!tasksFromStorage) {
			tasksFromStorage = [];
		}
		if (document.getElementById('title2').value === '' || document.getElementById('notes2').value === '') {
			return;
		}
		for (let index = 0; index < tasksFromStorage.length; index += 1) {
			if (tasksFromStorage[index].date.slice(0, 10) === JSON.stringify(date).slice(1, 11)) {
				tasksFromStorage[index].title = document.getElementById('title2').value;
				tasksFromStorage[index].notes = document.getElementById('notes2').value;
			}
		}
		console.log('localstorate new ', tasksFromStorage);
		localStorage.removeItem('tasks');
		document.getElementById('title2').value = '';
		document.getElementById('notes2').value = '';
		document.getElementById('title2').placeholder = '';
		document.getElementById('notes2').placeholder = '';
		localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
	};
	const handleDiscard = () => {
		document.getElementById('title').value = '';
		document.getElementById('notes').value = '';
	};
	console.log(tasksFromStorageToday === {});

	const getDisplayClass = (title) => {
		if (!title) {
			return 'd-none';
		}
		return '';
	};
	return (
		<>
			<div className={'bg-lt-green p-5 rounded ' + getDisplayClass(tasksFromStorageToday.title)}>
				<h2 className='text-light text-center rounded'>Edit Task</h2>
				<form>
					<div className='form-group'>
						<label>Title</label>
						<input id='title2' type='text' className='form-control' placeholder={tasksFromStorageToday.title} />
					</div>
					<div className='form-group'>
						<label>Notes</label>
						<textarea id='notes2' type='text' className='form-control' placeholder={tasksFromStorageToday.notes} />
					</div>
				</form>
				<button type='button' className='btn  btn-success btn-lg' onClick={handleSubmit}>
					Save
				</button>
				<button type='button' className='btn float-right btn-secondary btn-lg' onClick={handleDiscard}>
					Discard
				</button>
			</div>
		</>
	);
};

export default App;
