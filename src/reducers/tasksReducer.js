const initialState = {
    tasks: []
}

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_TASK":
      return {
        ...state,
        task: state.tasks.push(action.task)
      }
    default:
      return state;
  }
}
