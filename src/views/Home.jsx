import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import '../styles/home.css'
import { connect } from 'react-redux'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { MdClose } from "react-icons/md"
import { Formik } from 'formik'
import { updateTask } from '../actions/taskActions'

const mapStateToProps = (state) => {
  return {
    state: state.tasks
  }
}

function Home({ state, updateTask }) {
  //TaskForm
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //Ocultar vista de tareas
  const hidden = (title) => {
    document.getElementById(title).style.display = 'none'
  }
  //Mostrar vista de tareas
  const show = (title) => {
    document.getElementById(title).style.display = 'flex'
  }
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    setTasks(state)
  }, [tasks])

  return (
    <>
      <NavBar handleClose={handleClose} handleOpen={handleOpen} open={open}></NavBar>
      <main>
        <div className='task-container'>
          <div className="circle"></div>
          {
            tasks.map((task) => {
              return (
                task?.status == 'Todo' ?
                  <>
                    <section className="task" onClick={() => show(`test-${task.title}`)}>
                      <h2 className='task-title'>{task.title}</h2>
                      <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                    </section>
                    <div id={`test-${task.title}`} className={`view-task hide-task`}>
                      <Formik initialValues={{                       
                        title: task.title,
                        description: task.description,
                        subtasks: '',
                        status: task.status,
                        checked: false
                      }}
                        validate={values => {
                          const errors = {};

                        }}
                        onSubmit={(values) => {
                          setTasks(tasks.map((task) => {
                            if (task.title == values.title) {
                              task.status = values.status
                            }
                          }))
                          updateTask(values)

                        }}
                      >
                        {({
                          values,
                          handleChange,
                          handleSubmit,
                          handleBlur,
                        }) => (
                          <form >
                            <div className="task-icon-close">
                              <MdClose className="icon-close" onClick={() => {
                                hidden(`test-${task.title}`)
                                handleSubmit()
                              }} />
                            </div>
                            <h3>{task.title}</h3>
                            <div>
                              <p>{task.description}</p>
                            </div>
                            <div>
                              <p>Subtasks</p>
                              <div className='task-inputs'>
                                <Checkbox value={values.checked} name='checked' onChange={handleChange} checked={values.checked} sx={{
                                  color: '#cbbebe', '&.Mui-checked': {
                                    color: '#6e6ac2',
                                  },

                                }} />
                                <input type="text" disabled onChange={handleChange} onBlur={handleBlur} value={values.subtasks} name='subtasks' className={`${values.checked ? 'task-input' : 'task-input--'}`} placeholder={task.subtasks} />
                              </div>
                            </div>
                            <div>
                              <p>Status</p>
                              <FormControl sx={{ m: 1, minWidth: 120, }}>
                                <Select
                                  value={values.status}
                                  sx={{ width: '250px' }}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  name='status'
                                >
                                  <MenuItem value={'Todo'}>Todo</MenuItem>
                                  <MenuItem value={'Doing'}>Doing</MenuItem>
                                  <MenuItem value={'Done'}>Done</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </>
                  : <></>
              )
            })
          }

        </div>
        <div className='task-container'>
          <div className="circle circle-todo"></div>
          {
            tasks.map((task) => {
              return (
                task?.status == 'Doing' ?
                  <>
                    <section className="task" onClick={() => show(`test-${task.title}`)}>
                      <h2 className='task-title'>{task.title}</h2>
                      <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                    </section>
                    <div id={`test-${task.title}`} className={`view-task hide-task`}>
                      <Formik initialValues={{
                        title: task.title,
                        description: task.description,
                        subtasks: '',
                        status: task.status,
                        checked: false
                      }}
                        validate={values => {
                          const errors = {};

                        }}
                        onSubmit={(values) => {
                          console.log(values)
                          setTasks(tasks.map((task) => {
                            if (task.title == values.title) {
                              task.status = values.status
                            }
                          }))
                          console.log(tasks)                          
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
                          <form >
                            <div className="task-icon-close">
                              <MdClose className="icon-close" onClick={() => {
                                hidden(`test-${task.title}`)
                                handleSubmit()
                              }} />
                            </div>
                            <h3>{task.title}</h3>
                            <div>
                              <p>{task.description}</p>
                            </div>
                            <div>
                              <p>Subtasks</p>
                              <div className='task-inputs'>
                                <Checkbox value={values.checked} name='checked' onChange={handleChange} checked={values.checked} sx={{
                                  color: '#cbbebe', '&.Mui-checked': {
                                    color: '#6e6ac2',
                                  },

                                }} />
                                <input type="text" disabled onChange={handleChange} onBlur={handleBlur} value={values.subtasks} name='subtasks' className={`${values.checked ? 'task-input' : 'task-input--'}`} placeholder={task.subtasks} />
                              </div>
                            </div>
                            <div>
                              <p>Status</p>
                              <FormControl sx={{ m: 1, minWidth: 120, }}>
                                <Select
                                  value={values.status}
                                  sx={{ width: '250px' }}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  name='status'
                                >
                                  <MenuItem value={'Todo'}>Todo</MenuItem>
                                  <MenuItem value={'Doing'}>Doing</MenuItem>
                                  <MenuItem value={'Done'}>Done</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </>
                  : <></>
              )
            })
          }
        </div>
        <div className='task-container'>
          <div className="circle circle-done"></div>
          {
            tasks.map((task) => {
              return (
                task?.status == 'Done' ?
                  <>
                    <section className="task" onClick={() => show(`test-${task.title}`)}>
                      <h2 className='task-title'>{task.title}</h2>
                      <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                    </section>
                    <div id={`test-${task.title}`} className={`view-task hide-task`}>
                      <Formik initialValues={{
                        title: task.title,
                        description: task.description,
                        subtasks: '',
                        status: task.status,
                        checked: false
                      }}
                        validate={values => {
                          const errors = {};

                        }}
                        onSubmit={(values) => {
                          setTasks(tasks.map((task) => {
                            if (task.title == values.title) {
                              task.status = values.status
                            }
                          }))
                          updateTask(values)
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
                          <form >
                            <div className="task-icon-close">
                              <MdClose className="icon-close" onClick={() => {
                                hidden(`test-${task.title}`)
                                handleSubmit()
                              }
                              } />
                            </div>
                            <h3>{task.title}</h3>
                            <div>
                              <p>{task.description}</p>
                            </div>
                            <div>
                              <p>Subtasks</p>
                              <div className='task-inputs'>
                                <Checkbox value={values.checked} name='checked' onChange={handleChange} checked={values.checked} sx={{
                                  color: '#cbbebe', '&.Mui-checked': {
                                    color: '#6e6ac2',
                                  },

                                }} />
                                <input type="text" disabled onChange={handleChange} onBlur={handleBlur} value={values.subtasks} name='subtasks' className={`${values.checked ? 'task-input' : 'task-input--'}`} placeholder={task.subtasks} />
                              </div>
                            </div>
                            <div>
                              <p>Status</p>
                              <FormControl sx={{ m: 1, minWidth: 120, }}>
                                <Select
                                  value={values.status}
                                  sx={{ width: '250px' }}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  name='status'
                                >
                                  <MenuItem value={'Todo'}>Todo</MenuItem>
                                  <MenuItem value={'Doing'}>Doing</MenuItem>
                                  <MenuItem value={'Done'}>Done</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </>
                  : <></>
              )
            })
          }
        </div>
      </main>
    </>
  )
}

export default connect(mapStateToProps, { updateTask })(Home)