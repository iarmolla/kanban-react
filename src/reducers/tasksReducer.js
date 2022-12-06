const initialState = {
  tasks: [
    {
      id: 0,
      title: "",
      description: "",
      subtasks: "",
      status: "",
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
            task.status = action.task.status;
          }
        }),
      };
    default:
      return state;
  }
}
