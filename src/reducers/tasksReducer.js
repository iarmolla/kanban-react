const initialState = {
    tasks: []
}

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return {
        ...state,
        task: state.tasks.push(action.task)
      }
    case 'UPDATE_TASK': 
      return {
        ...state,
        task: state.tasks.forEach((task)=> {            
          if(task.title == action.task.title) {
            task.status = action.task.status       
          }
        })
      }
    default:
      return state;
  }
}
