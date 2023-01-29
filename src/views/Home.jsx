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
import Aside from '../components/Aside'

const mapStateToProps = (state) => {
  return {
    state: state.tasks
  }
}

function Home({ state, updateTask, updateTasks }) { 
  return (
    <>
      <Aside test={state} updateTask={updateTask} updateTasks={updateTasks}></Aside>      
    </>
  )
}

export default connect(mapStateToProps, { updateTask, updateTasks })(Home)