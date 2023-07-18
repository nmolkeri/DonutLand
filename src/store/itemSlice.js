import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProductId: "",
  selectedProductName: "",
  type: "",
  addEdit: "",
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      const { id, name, type, addEdit } = action.payload;
      state.selectedProductId = id;
      state.selectedProductName = name;
      state.type = type;
      state.addEdit = addEdit;
    },
  },
});
