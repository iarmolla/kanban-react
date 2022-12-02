function createTask(task) {
    return {
        type: 'CREATE_TASK',
        task
    }
}

export {
    createTask
}