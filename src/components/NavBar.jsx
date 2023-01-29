import React, { useState } from 'react'
import '../styles/navbar.css'
import { MdOutlineMoreVert, MdBrightnessLow, MdBrightnessHigh } from 'react-icons/md'
import Task from './Task'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useAuth0 } from "@auth0/auth0-react"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function NavBar({ handleClose, handleOpen, setOpen, open, darkMode, setDarkMode, dark, lightTheme }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const { logout } = useAuth0()
    return (
        <ThemeProvider theme={darkMode ? dark : lightTheme}>
            <CssBaseline />            
            <div>
                <nav className='nav'>
                    <header>
                        <div>
                            
                        </div>
                        <div className='new-task'>
                            <button onClick={handleOpen}>Add New Task</button>
                            <Button
                                id="basic-button"
                                aria-controls={openMenu ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openMenu ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <span className='task-icon'>
                                    <MdOutlineMoreVert></MdOutlineMoreVert>
                                </span>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleCloseMenu}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => {
                                    logout({ returnTo: window.location.origin })
                                }}>Logout</MenuItem>                                
                            </Menu>
                        </div>
                    </header>
                </nav>
                <Task handleClose={handleClose} handleOpen={handleOpen} setOpen={setOpen} openModal={open} darkMode={darkMode}></Task>
            </div>
        </ThemeProvider>
    )
}

export default NavBar