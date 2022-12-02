import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function ViewTask({handleOpenTask, openTask, handleCloseTask, taskTitle, taskStatus, taskSubtasks, taskDescription}) {
    console.log(taskTitle, taskStatus, taskSubtasks)
    //TaskView
    const [checked, setChecked] = useState(false)
    const [status, setStatus] = useState('None')
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
    return (
        <div>
            <Modal
                open={openTask}
                onClose={handleCloseTask}
            >
                <Box sx={style}>
                    <form className='view-task'>
                        <h3>{taskTitle}</h3>
                        <div>
                            <p>{taskDescription}</p>
                        </div>
                        <div>
                            <p>Subtasks</p>
                            <div className='task-inputs'>
                                <Checkbox checked={checked} onClick={()=> setChecked(!checked)}  sx={{
                                    color: '#cbbebe','&.Mui-checked': {
                                        color: '#6e6ac2',
                                      },
                                      
                                }}/>
                                <input type="text" disabled className={`${checked ? 'task-input' : 'task-input--'}`} placeholder={taskSubtasks}/>
                            </div>                          
                        </div>
                        <div>
                            <p>Status</p>
                            <FormControl sx={{ m: 1, minWidth: 120, }}>
                                <Select
                                    value={taskStatus}
                                    onChange={(e)=> setStatus(e.target.value)}
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
                </Box>
            </Modal>
        </div>
    )
}

export default ViewTask