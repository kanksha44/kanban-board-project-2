import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    list: []
  },
  reducers: {
    addList: (state, action) => {
      state.list.push({
        id: action.payload.id,
        title: action.payload.title,
        children: [] // Initialize children as an empty array
      });
    },
    addCard: (state, action) => {
      const { id, title, parentId } = action.payload;
      const list = state.list.find((item) => item.id === parentId);
      if (list) {
        list.children.push({ id, title });
      }
    },
    removeList: (state, action) => {
      const listId = action.payload;
      state.list = state.list.filter((item) => item.id !== listId);
    },
    updateListTitle: (state, action) => {
      const { listId, newTitle } = action.payload;
      const list = state.list.find((item) => item.id === listId);
      if (list) {
        list.title = newTitle;
      }
    },
    removeCard: (state, action) => {
      const { parentId, cardId } = action.payload;
      const list = state.list.find((item) => item.id === parentId);
      if (list) {
        list.children = list.children.filter((item) => item.id !== cardId);
      }
    },
    updateCardTitle: (state, action) => {
      const { parentId, cardId, newTitle } = action.payload;
      const list = state.list.find((item) => item.id === parentId);
      if (list) {
        const card = list.children.find((item) => item.id === cardId);
        if (card) {
          card.title = newTitle;
        }
      }
    }
  }
});

export const {
  addList,
  addCard,
  removeList,
  updateListTitle,
  removeCard,
  updateCardTitle
} = listSlice.actions;

export default listSlice.reducer;