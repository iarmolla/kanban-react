import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import '../styles/home.css'
import { connect } from 'react-redux'
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'


const mapStateToProps = (state) => {
  return {
    state: state.tasks
  }
}

function Home({ state }) {
  //TaskForm
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //ViewTask
  const [checked, setChecked] = useState(false)
  //Ocultar vista de tareas
  const hidden = (title) => {
    document.getElementById(title).style.display = 'none'
  }
  //Mostrar vista de tareas
  const show = (title) => {
    document.getElementById(title).style.display = 'flex'
  }
  useEffect(()=> {
    
  },[])
  return (
    <>
      <NavBar handleClose={handleClose} handleOpen={handleOpen} open={open}></NavBar>
      <main>
        <div className='task-container'>
          <div className="circle"></div>
          {
            state.map((task) => {
              return (
                task.status == 'Todo' ?
                  <>
                    <section className="task" onClick={() => show(`test-${task.title}`)}>
                      <h2 className='task-title'>{task.title}</h2>
                      <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                    </section>
                    <div>
                      <form id={`test-${task.title}`} onClick={() => hidden(`test-${task.title}`)} className={`view-task`}>
                        <h3 >{task.title}</h3>
                        <div>
                          <p>{task.description}</p>
                        </div>
                        <div>
                          <p>Subtasks</p>
                          <div className='task-inputs'>
                            <Checkbox checked={checked} onClick={() => setChecked(!checked)} sx={{
                              color: '#cbbebe', '&.Mui-checked': {
                                color: '#6e6ac2',
                              },

                            }} />
                            <input type="text" disabled className={`${checked ? 'task-input' : 'task-input--'}`} placeholder={task.subtasks} />
                          </div>
                        </div>
                        <div>
                          <p>Status</p>
                          <FormControl sx={{ m: 1, minWidth: 120, }}>
                            <Select
                              value={task.status}
                              sx={{ width: '250px' }}
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
                      </form>
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
            state.map((task) => {
              return (
                task.status == 'Doing' ?
                  <>
                    <section className="task" onClick={() => show(`test-${task.title}`)}>
                      <h2 className='task-title'>{task.title}</h2>
                      <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                    </section>
                    <div>
                      <form id={`test-${task.title}`} onClick={() => hidden(`test-${task.title}`)} className={`view-task`}>
                        <h3 >{task.title}</h3>
                        <div>
                          <p>{task.description}</p>
                        </div>
                        <div>
                          <p>Subtasks</p>
                          <div className='task-inputs'>
                            <Checkbox checked={checked} onClick={() => setChecked(!checked)} sx={{
                              color: '#cbbebe', '&.Mui-checked': {
                                color: '#6e6ac2',
                              },

                            }} />
                            <input type="text" disabled className={`${checked ? 'task-input' : 'task-input--'}`} placeholder={task.subtasks} />
                          </div>
                        </div>
                        <div>
                          <p>Status</p>
                          <FormControl sx={{ m: 1, minWidth: 120, }}>
                            <Select
                              value={task.status}
                              sx={{ width: '250px' }}
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
                      </form>
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
            state.map((task) => {
              return (
                task.status == 'Done' ?
                  <>
                    <section className="task" onClick={() => show(`test-${task.title}`)}>
                      <h2 className='task-title'>{task.title}</h2>
                      <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                    </section>
                    <div>
                      <form id={`test-${task.title}`} onClick={() => hidden(`test-${task.title}`)} className={`view-task`}>
                        <h3 >{task.title}</h3>
                        <div>
                          <p>{task.description}</p>
                        </div>
                        <div>
                          <p>Subtasks</p>
                          <div className='task-inputs'>
                            <Checkbox checked={checked} onClick={() => setChecked(!checked)} sx={{
                              color: '#cbbebe', '&.Mui-checked': {
                                color: '#6e6ac2',
                              },

                            }} />
                            <input type="text" disabled className={`${checked ? 'task-input' : 'task-input--'}`} placeholder={task.subtasks} />
                          </div>
                        </div>
                        <div>
                          <p>Status</p>
                          <FormControl sx={{ m: 1, minWidth: 120, }}>
                            <Select
                              value={task.status}
                              sx={{ width: '250px' }}
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
                      </form>
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

export default connect(mapStateToProps, null)(Home)