import React, { useState } from 'react'
import '../styles/task.css'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import { connect } from 'react-redux'
import { createTask } from '../actions/taskActions'
import { Formik } from 'formik'

function Task({ handleClose, openModal, state, createTask, darkMode }) {
	const [counter, setCounter] = useState(0)
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	}
	const eventChange = ((e) => {
		e.preventDefault()
	})
	const [repeat, setRepeat] = useState('')
	const [tasks, setTasks] = useState(state)
	const validateTask = (taskForm) => {
		let taskValidate = false
		tasks.map((task) => {			
			taskValidate = task.title == taskForm.title
		})
		return taskValidate
	}
	const formStyle = {
		background: darkMode ? '#121212' : '#fff'
	}
	return (
		<div className="form">
			<div>
				<Formik
					initialValues={{
						id: 0,
						title: '',
						description: '',
						subtasks: '',
						status: 'Todo',
						checked: false
					}}
					validate={values => {
						const errors = {};
						if (!values.title) {
							errors.title = 'El campo es necesario'
						}
						if (!values.description) {
							errors.description = 'El campo es necesario'
						}
						if (!values.subtasks) {
							errors.subtasks = 'El campo es necesario'
						}
						return errors;
					}}
					onSubmit={(values) => {
						const taskForm = {
							id: counter,
							title: values.title,
							description: values.description,
							subtasks: values.subtasks,
							status: values.status,
							checked: values.checked
						}
						const validations = validateTask(taskForm)
						if (validations) {
							setRepeat('*El titulo esta en uso*')
						}
						else {
							handleClose()
							setRepeat('')
							createTask(taskForm)
						}
					}}
				>
					{({
						values,
						errors,
						handleChange,
						handleSubmit,
						handleBlur,
						touched
					}) => (
						<Modal
							open={openModal}
							onClose={handleClose}

						>
							<Box sx={style}>
								<form style={formStyle}>
									<p>Add New Task</p>
									<div>
										<p>Title</p>
										<FormControl sx={{ m: 1, width: '250px' }} variant="outlined">
											<OutlinedInput placeholder="e.g landing" value={values.title} onBlur={handleBlur} onChange={handleChange} name='title' />
										</FormControl>
									</div>
									{
										errors.title && touched.title &&
										<label className="task-error" placeholder="e.g landing">{errors.title}</label>
									}
									<div>
										<p>Description</p>
										<FormControl sx={{ m: 1, width: '250px' }} variant="outlined" >
											<OutlinedInput placeholder="e.g landing" multiline
												rows={2}
												onChange={handleChange}
												value={values.description}
												onBlur={handleBlur}
												name='description' />
										</FormControl>
									</div>
									{
										errors.description && touched.description &&
										<label className="task-error" placeholder="e.g landing">{errors.description}</label>
									}
									<div>
										<p>SubTask</p>
										<div className='sub-tasks'>
											<FormControl sx={{ m: 1, width: '250px' }} variant="outlined" >
												<OutlinedInput placeholder="e.g landing" onChange={handleChange} onBlur={handleBlur} value={values.subtasks} name='subtasks' />
											</FormControl>
										</div>
									</div>
									{
										errors.subtasks && touched.subtasks &&
										<label className="task-error" placeholder="e.g landing">{errors.subtasks}</label>
									}
									<div>
										<p>Status</p>
										<FormControl sx={{ m: 1, minWidth: 120, }}>
											<Select
												onBlur={handleBlur}
												value={values.status}
												onChange={handleChange}
												sx={{ width: '250px' }}
												name='status'
											>
												<MenuItem value={'Todo'}>Todo</MenuItem>
												<MenuItem value={'Doing'}>Doing</MenuItem>
												<MenuItem value={'Done'}>Done</MenuItem>
											</Select>
										</FormControl>
									</div>
									<button type='submit' className='form-subtask' onClick={(e) => {
										eventChange(e)
										setCounter(counter + 1)
										handleSubmit()
									}}>Create Task</button>
									<div>
										<label className="task-error"> {repeat} </label>
									</div>
								</form>
							</Box>
						</Modal>
					)}
				</Formik>
			</div>
		</div >
	)
}

const mapStateToProps = (state) => {
	return {
		state: state.tasks
	}
}

export default connect(mapStateToProps, { createTask })(Task)

