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

export {
    createTask,
    updateTask
}