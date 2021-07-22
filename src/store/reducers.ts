import { Board, Checklist, Obj, Store, Swimlane, Task } from "../types";
import { orderItems } from "../utils/utils";

interface Action {
  type: string;
  data: any;
}

export let store: Store = {
  boards: [],
  swimlanes: [],
  tasks: [],
  checklists: [],
  app: {}
};

try {
  const persistedData = localStorage.getItem("trello_store");
  if (persistedData) {
    const temp = JSON.parse(persistedData);
    store = { ...store, ...temp };
  }
} catch (error) {
  console.log("No persisted data from local storage");
}

function persistData() {
  try {
    const temp = JSON.stringify(store);
    localStorage.setItem("trello_store", temp);
  } catch (error) {
    console.log("Error while parsing JSON");
  }
}

function boardReducer(state: Board[] = store.boards, action: Action) {
  switch (action.type) {
    case "addBoard":
      state.push(action.data);
      persistData();
      return state;
    case "updateBoard":
      const updateIndex = state.findIndex((i) => i.id === action.data.id);
      state[updateIndex] = action.data;
      persistData();
      return state;
    case "removeBoard":
      const removeIndex = state.findIndex((i) => i.id === action.data.id);
      state.splice(removeIndex, 1);
      persistData();
      return state;
    default:
      return state;
  }
}

function swimlaneReducer(state: Swimlane[] = store.swimlanes, action: Action) {
  switch (action.type) {
    case "addSwimlane":
      state.push(action.data);
      persistData();
      return state;
    case "updateSwimlane":
      const updateIndex = state.findIndex((i) => i.id === action.data.id);
      state[updateIndex] = action.data;
      persistData();
      return state;
    case "removeSwimlane":
      const removeIndex = state.findIndex((i) => i.id === action.data.id);
      state.splice(removeIndex, 1);
      persistData();
      return state;
    case "changeOrder":
      const items = state.filter((i) => i.boardId === store.app.currentBoard);
      const swimlanes = orderItems(
        items,
        action.data.draggable,
        action.data.target,
        "id"
      );
      if (swimlanes && swimlanes.length) {
        state.forEach((i) => {
          swimlanes.forEach((j) => {
            if (i.id === j.id) {
              i.order = j.order;
            }
          });
        });
      }
      persistData();
      return state;
    default:
      return state;
  }
}

function taskReducer(state: Task[] = store.tasks, action: Action) {
  switch (action.type) {
    case "addTask":
      state.push(action.data);
      persistData();
      return state;
    case "updateTask":
      const updateIndex = state.findIndex((i) => i.id === action.data.id);
      state[updateIndex] = action.data;
      persistData();
      return state;
    case "removeTask":
      const removeIndex = state.findIndex((i) => i.id === action.data.id);
      state.splice(removeIndex, 1);
      persistData();
      return state;
    default:
      return state;
  }
}

function checklistReducer(
  state: Checklist[] = store.checklists,
  action: Action
) {
  switch (action.type) {
    case "addChecklist":
      state.push(action.data);
      persistData();
      return state;
    case "updateChecklist":
      const updateIndex = state.findIndex((i) => i.id === action.data.id);
      state[updateIndex] = action.data;
      persistData();
      return state;
    case "removeChecklist":
      const removeIndex = state.findIndex((i) => i.id === action.data.id);
      state.splice(removeIndex, 1);
      persistData();
      return state;
    default:
      return state;
  }
}

function appReducer(state: Obj = {}, action: Action) {
  switch (action.type) {
    case "setCurrentBoard":
      state.currentBoard = action.data.id;
      persistData();
      return state;
    default:
      return state;
  }
}

function combineReducers(reducers: any) {
  return (state: any, action: any) => {
    const newState: any = {};
    for (const key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}

export const reducers = combineReducers({
  boards: boardReducer,
  swimlanes: swimlaneReducer,
  tasks: taskReducer,
  checklists: checklistReducer,
  app: appReducer
});
