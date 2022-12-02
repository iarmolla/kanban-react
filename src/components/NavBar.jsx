import React, { useState } from 'react'
import '../styles/navbar.css'
import { MdOutlineMoreVert } from 'react-icons/md'
import Task from './Task'

function NavBar({handleClose, handleOpen, setOpen, open}) {
    return (
        <div>
            <nav>
                <header>
                    <h1>Platform Launch</h1>
                    <div className='new-task'>
                        <button onClick={handleOpen}>Add New Task</button>
                        <span className='task-icon'>
                            <MdOutlineMoreVert></MdOutlineMoreVert>
                        </span>
                    </div>
                </header>
            </nav>
            <Task handleClose = {handleClose} handleOpen = {handleOpen} setOpen = {setOpen} openModal = {open}></Task>
        </div>
    )
}

export default NavBar