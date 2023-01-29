import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import '../styles/aside.css'
import NavBar from '../components/NavBar'
import '../styles/home.css'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { MdClose } from "react-icons/md"
import { Formik } from 'formik'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

function ResponsiveDrawer(props, { test, state, updateTask, updateTasks }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const hidden = (title) => {
    document.getElementById(title).style.display = 'none'
  }
  const show = (title) => {
    document.getElementById(title).style.display = 'flex'
  }
  const [darkMode, setDarkMode] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    setTasks(props.test)
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Divider />
      <List>
        <div className='container-title'>
          <span className='container-title--lines'></span>
          <span className='container-title--lines'></span>
          <span className='container-title--lines'></span>
          <h1 className={`${darkMode ? 'title-app--dark' : 'title-app'}`} >Kanban</h1>
        </div>
        {['Dark Mode'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => setDarkMode(!darkMode)}>
              <ListItemIcon>
                {index % 2 !== 0 ? <span className={`${darkMode ? 'person-icon--dark' : ''}`} ><PersonIcon /></span> : <span className={`${darkMode ? 'icon-darkmode' : 'icon-darkmode--'}`}><Brightness4Icon /></span>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ background: formStyle.background, padding: 0, boxShadow: 'none' }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ background: '#6e626254', position: 'absolute', left: '10%', top: '30%', mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <NavBar handleClose={handleClose} handleOpen={handleOpen} setOpen={setOpen} open={open} dark={darkTheme} darkMode={darkMode} lightTheme={lightTheme}></NavBar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: formStyle.background, color: formStyle.color },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: formStyle.background, color: formStyle.color },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, marginTop: '6rem', display: 'flex', flexDirection: 'row' }}
        className="probar"
      >
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
            props.updateTasks(tasksAux)
          }}>
            <Droppable droppableId='todo' direction='vertical'>
              {(droppableProvided) => (
                <div {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  <div className='task-container'>
                    <div className="circle"></div>
                    {
                      tasks?.map((task, index) => {
                        return (
                          <Draggable key={task?.id} draggableId={`'${task?.id}'`} index={index}>
                            {(draggableProvided) => (
                              task?.status === 'Todo' ?
                                <>
                                  <div className="task--padding">
                                    <section className={`${darkMode ? 'dark-mode--' : 'task'}`} {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} onClick={() => show(`test-${task.title}`)}>
                                      <h2 className='task-title'>{task.title}</h2>
                                      <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                                    </section>
                                  </div>
                                  <div id={`test-${task.title}`} className={`view-task hide-task`}>
                                    <Formik initialValues={{
                                      id: task.id,
                                      title: task.title,
                                      description: task.description,
                                      subtasks: '',
                                      status: task.status,
                                      checked: task.checked
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
                                              <input type="text" maxLength={'16'} disabled onChange={handleChange} onBlur={handleBlur} value={values.subtasks} name='subtasks' className={`${values.checked ? 'task-input' : 'task-input--'}`} placeholder={task.subtasks} />
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
            props.updateTasks(tasksAux)
          }}>
            <Droppable droppableId='doing' direction='vertical'>
              {(droppableProvided) => (

                <div {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  <div className='task-container'>
                    <div className="circle circle-todo"></div>
                    {
                      tasks?.map((task, index) => {
                        return (
                          <Draggable key={task?.id} draggableId={`'${task?.id}'`} index={index}>
                            {(draggableProvided) => (
                              task?.status === 'Doing' ?
                                <>
                                 <div className="task--padding">
                                    <section className={`${darkMode ? 'dark-mode--' : 'task'}`} {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} onClick={() => show(`test-${task.title}`)}>
                                      <h2 className='task-title'>{task.title}</h2>
                                      <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                                    </section>
                                  </div>
                                  <div id={`test-${task.title}`} className={`view-task hide-task`}>
                                    <Formik initialValues={{
                                      id: task.id,
                                      title: task.title,
                                      description: task.description,
                                      subtasks: '',
                                      status: task.status,
                                      checked: task.checked
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
            props.updateTasks(tasksAux)
          }}>
            <Droppable droppableId='done' direction='vertical'>
              {(droppableProvided) => (

                <div {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  <div className='task-container'>
                    <div className="circle circle-done"></div>
                    {
                      tasks?.map((task, index) => {
                        return (
                          <Draggable key={task?.id} draggableId={`'${task?.id}'`} index={index}>
                            {(draggableProvided) => (
                              task?.status === 'Done' ?
                                <>
                                  <div className="task--padding">
                                    <section className={`${darkMode ? 'dark-mode--' : 'task'}`} {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} onClick={() => show(`test-${task.title}`)}>
                                      <h2 className='task-title'>{task.title}</h2>
                                      <p className='task-paragraph'>Subtasks: {task.subtasks}</p>
                                    </section>
                                  </div>
                                  <div id={`test-${task.title}`} className={`view-task hide-task`}>
                                    <Formik initialValues={{
                                      id: task.id,
                                      title: task.title,
                                      description: task.description,
                                      subtasks: '',
                                      status: task.status,
                                      checked: task.checked
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
      </Box>
    </Box>
  );


}

ResponsiveDrawer.propTypes = {

  window: PropTypes.func,
};

export default ResponsiveDrawer;
