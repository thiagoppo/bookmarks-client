import { createReducer } from '@reduxjs/toolkit';
import {
  GET_MY_BOOKMARKS_SUCCESS,
  DELETE_BOOKMARK_SUCCESS,
  SELECTED_BOOKMARK_CHANGE,
} from '../constants/actionTypes';

const INITIAL_STATE = {
  bookmarks: {
    meta: {
      count: 0,
      offset: 1,
      limit: 10,
      total: 0,
    },
    data: [],
  },
  selectedBookmark: {},
};

const applySuccessGetMyBookmarks = (state, action) => {
  const { meta, data } = action.payload;
  state.bookmarks.meta = meta;
  state.bookmarks.data = data;
};

const applySuccessDeleteBookmark = (state, action) => {
  const { bookmarkId } = action.payload;
  state.bookmarks.data = state.bookmarks.data.filter(bookmark => bookmark.id !== bookmarkId);
};

const applyChangeSelectedBookmark = (state, action) => {
  const { bookmark } = action.payload;
  state.selectedBookmark = bookmark;
};

const userReducer = createReducer(INITIAL_STATE, {
  [GET_MY_BOOKMARKS_SUCCESS]: (state, action) => applySuccessGetMyBookmarks(state, action),
  [DELETE_BOOKMARK_SUCCESS]: (state, action) => applySuccessDeleteBookmark(state, action),
  [SELECTED_BOOKMARK_CHANGE]: (state, action) => applyChangeSelectedBookmark(state, action),
});

export default userReducer;
