function createTask(task) {
    return {
        type: 'CREATE_TASK',
        task
    }
}

function updateTask(task) {
    return {
        type: 'UPDATE_TASK',
        task
    }
}

function updateTasks(tasks) {
    return {
        type: 'UPDATE_TASKS',
        tasks
    }
}

export {
    createTask,
    updateTask,
    updateTasks
}