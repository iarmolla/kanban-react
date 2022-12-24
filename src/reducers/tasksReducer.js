const initialState = {
  tasks: [
    {
      id: 0,
      title: "Landing page",
      description: "",
      subtasks: "speak with tester",
      status: "Todo",
      checked: false
    },
  ],
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_TASK":
      return {
        ...state,
        task: state.tasks.push(action.task),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        task: state.tasks.forEach((task) => {
          if (task.id == action.task.id) {
            task.status = action.task.status
            task.checked = action.task.checked
          }
        }),
      };
    case "UPDATE_TASKS" :
      return {
        ...state, tasks: state.tasks = action.tasks
      }
    default:
      return state;
  }
}
