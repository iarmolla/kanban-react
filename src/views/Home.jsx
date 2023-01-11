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
import { updateTask, updateTasks } from '../actions/taskActions'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'

const mapStateToProps = (state) => {
  return {
    state: state.tasks
  }
}

function Home({ state, updateTask, updateTasks }) {
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
  const [darkMode, setDarkMode] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    setTasks(state)
  }, [tasks])
  const reorder = (list, startIndex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  })
  const formStyle = {
    background: darkMode ? '#121212' : '#fff',
    color: 'rgb(159, 154, 154)'
  }
  return (
    <>
      <NavBar handleClose={handleClose} handleOpen={handleOpen} open={open} darkMode={darkMode} setDarkMode={setDarkMode} dark={darkTheme} lightTheme={lightTheme}></NavBar>
      <main>
        <DragDropContext onDragEnd={(result) => {
          const { source, destination } = result
          if (!destination) {
            return
          }
          if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return
          }
          const tasksAux = reorder(tasks, source.index, destination.index)
          setTasks(tasksAux)
          updateTasks(tasksAux)
        }}>
          <Droppable droppableId='todo' direction='vertical'>
            {(droppableProvided) => (
              <div {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <div className='task-container'>
                  <div className="circle"></div>
                  {
                    tasks.map((task, index) => {
                      return (
                        <Draggable key={task?.id} draggableId={`'${task?.id}'`} index={index}>
                          {(draggableProvided) => (
                            task?.status === 'Todo' ?
                              <>
                                <section className={`${darkMode ? 'dark-mode--' : 'task'}`} {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} onClick={() => show(`test-${task.title}`)}>
                                  <h2 className='task-title'>{task.title}</h2>
                                  <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                                </section>
                                <div id={`test-${task.title}`} className={`view-task hide-task`}>
                                  <Formik initialValues={{
                                    id: task.id,
                                    title: task.title,
                                    description: task.description,
                                    subtasks: '',
                                    status: task.status,
                                    checked: task.checked
                                  }}
                                    validate={values => {
                                      const errors = {}

                                    }}
                                    onSubmit={(values) => {
                                      setTasks(tasks.map((task) => {
                                        if (task.id == values.id) {
                                          task.status = values.status
                                          task.checked = values.checked
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
                                      <form style={formStyle}>
                                        <div className="task-icon-close">
                                          <MdClose className="icon-close" onClick={() => {
                                            hidden(`test-${task.title}`)
                                            handleSubmit()
                                          }}></MdClose>                                       
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
                                          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                                            <FormControl style={formStyle} sx={{ m: 1, minWidth: 120, color: '#fff' }}>
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
                                          </ThemeProvider>
                                        </div>
                                      </form>
                                    )}
                                  </Formik>
                                </div>
                              </>
                              : <section className='hide-section' {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}></section>
                          )}
                        </Draggable>
                      )
                    })
                  }
                  {droppableProvided.placeholder}
                </div>
              </div>

            )}
          </Droppable>
        </DragDropContext>
        <DragDropContext onDragEnd={(result) => {
          const { source, destination } = result
          if (!destination) {
            return
          }
          if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return
          }
          const tasksAux = reorder(tasks, source.index, destination.index)
          setTasks(tasksAux)
          updateTasks(tasksAux)
        }}>
          <Droppable droppableId='doing' direction='vertical'>
            {(droppableProvided) => (

              <div {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <div className='task-container'>
                  <div className="circle circle-todo"></div>
                  {
                    tasks.map((task, index) => {
                      return (
                        <Draggable key={task?.id} draggableId={`'${task?.id}'`} index={index}>
                          {(draggableProvided) => (
                            task?.status === 'Doing' ?
                              <>
                                <section  {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} className={`${darkMode ? 'dark-mode--' : 'task'}`}  onClick={() => show(`test-${task.title}`)}>
                                  <h2 className='task-title'>{task.title}</h2>
                                  <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                                </section>
                                <div id={`test-${task.title}`} className={`view-task hide-task`}>
                                  <Formik initialValues={{
                                    id: task.id,
                                    title: task.title,
                                    description: task.description,
                                    subtasks: '',
                                    status: task.status,
                                    checked: task.checked
                                  }}
                                    validate={values => {
                                      const errors = {}

                                    }}
                                    onSubmit={(values) => {
                                      setTasks(tasks.map((task) => {
                                        if (task.id == values.id) {
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
                                      <form style={formStyle}>
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
                                          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                                            <FormControl style={formStyle} sx={{ m: 1, minWidth: 120, color: '#fff' }}>
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
                                          </ThemeProvider>
                                        </div>
                                      </form>
                                    )}
                                  </Formik>
                                </div>
                              </>
                              : <section className='hide-section' {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}></section>
                          )}
                        </Draggable>
                      )
                    })
                  }
                  {droppableProvided.placeholder}
                </div>
              </div>

            )}
          </Droppable>
        </DragDropContext>

        <DragDropContext onDragEnd={(result) => {
          const { source, destination } = result
          if (!destination) {
            return
          }
          if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return
          }
          const tasksAux = reorder(tasks, source.index, destination.index)
          setTasks(tasksAux)
          updateTasks(tasksAux)
        }}>
          <Droppable droppableId='done' direction='vertical'>
            {(droppableProvided) => (

              <div {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <div className='task-container'>
                  <div className="circle circle-done"></div>
                  {
                    tasks.map((task, index) => {
                      return (
                        <Draggable key={task?.id} draggableId={`'${task?.id}'`} index={index}>
                          {(draggableProvided) => (
                            task?.status === 'Done' ?
                              <>
                                <section  {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} className={`${darkMode ? 'dark-mode--' : 'task'}`}  onClick={() => show(`test-${task.title}`)}>
                                  <h2 className='task-title'>{task.title}</h2>
                                  <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                                </section>
                                <div id={`test-${task.title}`} className={`view-task hide-task`}>
                                  <Formik initialValues={{
                                    id: task.id,
                                    title: task.title,
                                    description: task.description,
                                    subtasks: '',
                                    status: task.status,
                                    checked: task.checked
                                  }}
                                    validate={values => {
                                      const errors = {}

                                    }}
                                    onSubmit={(values) => {
                                      setTasks(tasks.map((task) => {
                                        if (task.id == values.id) {
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
                                      <form style={formStyle}>
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
                                          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                                            <FormControl style={formStyle} sx={{ m: 1, minWidth: 120, color: '#fff' }}>
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
                                          </ThemeProvider>
                                        </div>
                                      </form>
                                    )}
                                  </Formik>
                                </div>
                              </>
                              : <section className='hide-section'  {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}></section>
                          )}
                        </Draggable>
                      )
                    })
                  }
                  {droppableProvided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </>
  )
}

export default connect(mapStateToProps, { updateTask, updateTasks })(Home)