import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { MenuFilter, MenuObject, Message, UiState } from "../../types/models";
import { remove, uniq } from "lodash";

const initialState: UiState = {
  loading: false,
  loaders: [],
  message: { show: false, type: "Success", body: "" },
  menu: [],
  menuFilter: MenuFilter.TUTTI
};
const uiSlice: Slice<UiState> = createSlice({
  name: "ui",
  initialState,
  reducers: {
    disableLoading(state) {
      state.loading = false;
    },
    enableLoading(state) {
      state.loading = true;
    },
    setMenu(state, action: PayloadAction<MenuObject[]>) {
      state.menu = action.payload;
    },
    setMessage(state, action: PayloadAction<Message>) {
      state.message = action.payload;
    },
    setMenuFilter(state, action: PayloadAction<MenuFilter>) {
      state.menuFilter = action.payload;
    },
    hideMessage(state, action: PayloadAction<Message>) {
      state.message = {
        show: false,
        body: ""
      } as Message;
    },
    addLoaders(state, action) {
      const payload = action.payload;
      state.loaders.push(payload);
      state.loaders = uniq(state.loaders);
    },
    removeLoaders(state, action) {
      const payload = action.payload;
      remove(state.loaders, (a) => a === payload);
    }
  }
});

export const {
  disableLoading,
  enableLoading,
  setMenu,
  setMessage,
  hideMessage,
  addLoaders,
  setMenuFilter,
  removeLoaders
} = uiSlice.actions;
export default uiSlice.reducer;
