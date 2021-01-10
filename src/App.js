import React, { useState } from 'react';
import Calendar  from 'react-calendar';

const App = () => {
	const [value, onChange] = useState(new Date());
	console.log(value.toLocaleString('default', { month: 'long' }));
	return (
		<>
			<div className='row'>
				<div className='col-12 col-md-6 p-4'>
					<Calendar onChange={onChange} value={value} />
				</div>
				<div className='col-12 col-md-6 p-4'>
					<div className='bg-success text-white text-center rounded'>{taskDisplay(value)}</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 col-md-6 p-4'>{addTask(value)}</div>
				<div className='col-12 col-md-6'>asdf</div>
			</div>
		</>
	);
};

const taskDisplay = (date) => {
	const heading = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
	return (
		<>
			<h2> {heading}</h2>
		</>
	);
};

const addTask = (date) => {
	return (
		<>
			<div className='bg-lt-green p-5 rounded'>
				<h2 className='text-light text-center rounded'>Add Task</h2>
				<form>
					<div class='form-group'>
						<label>Title</label>
						<input type='text' class='form-control' />
					</div>
					<div class='form-group'>
						<label>Another label</label>
						<textarea type='text' class='form-control' />
					</div>
				</form>
				<button type='button' class='btn  btn-success btn-lg'>
					Save
				</button>
				<button type='button' class='btn float-right btn-secondary btn-lg'>
					Discard
				</button>
			</div>
		</>
	);
};

export default App;
