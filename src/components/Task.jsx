import React from 'react'
import '../styles/task.css'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import { connect } from 'react-redux'
import { createTask } from '../actions/taskActions'
import { Formik } from 'formik';

function Task({ handleClose, openModal, createTask }) {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	}
	const eventChange = ((e) => {
		e.preventDefault()
	})	
	return (
		<div className="form">			
			<div>
				<Formik
					initialValues={{
						title: '',
						description: '',
						subtasks: [],
						status: 'None'
					}}
					validate={values => {						
						const errors = {};						
						return errors;
					}}
					onSubmit={(values) => {
						createTask(values)
					}}
				>
					{({
						values,
						errors,						
						handleChange,
						handleSubmit,
					}) => (
						<Modal
							open={openModal}
							onClose={handleClose}
							
						>
							<Box sx={style}>
								<form>
									<p>Add New Task</p>
									<div>
										<p>Title</p>
										<FormControl sx={{ m: 1, width: '250px' }} variant="outlined" >
											<OutlinedInput placeholder="e.g landing" value={values.title} onChange={handleChange} name='title'/>
										</FormControl>
									</div>
									<div>
										<p>Description</p>
										<FormControl sx={{ m: 1, width: '250px' }} variant="outlined" >
											<OutlinedInput placeholder="e.g landing" multiline
												rows={2}
												rowsMax={10} 
												onChange={handleChange}
												value={values.description}
												name='description'/>
										</FormControl>
									</div>
									<div>
										<p>SubTask</p>
										<div className='sub-tasks'>
											<FormControl sx={{ m: 1, width: '250px' }} variant="outlined" >
												<OutlinedInput placeholder="e.g landing" onChange={handleChange} value={values.subtasks} name='subtasks'/>
											</FormControl>											
										</div>
									</div>					
									<div>
										<p>Status</p>
										<FormControl sx={{ m: 1, minWidth: 120, }}>
											<Select												
												value={values.status}
												onChange={handleChange}
												sx={{ width: '250px' }}												
												name='status'
											>
												<MenuItem value="None">
													None
												</MenuItem>
												<MenuItem value={'Todo'}>Todo</MenuItem>
												<MenuItem value={'Doing'}>Doing</MenuItem>
												<MenuItem value={'Done'}>Done</MenuItem>
											</Select>
										</FormControl>
									</div>
									<button className='form-subtask' onClick={(e) => {
										eventChange(e)
										handleSubmit()
									}}>Create Task</button>
								</form>
							</Box>
						</Modal>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default connect(null, { createTask })(Task)

