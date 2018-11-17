import { AsyncStorage } from 'react-native';
import { SAVED_LIST_ADD, SAVED_LIST_REMOVE, SAVED_LIST_FETCH } from '../constants/Reducers';

function addToSavedListSuccesss(data) {
  return {
    type: SAVED_LIST_ADD,
    data,
  };
}

function removeFromSavedListSuccess(data) {
  return {
    type: SAVED_LIST_REMOVE,
    data,
  };
}

function fetchSavedListSuccess(data) {
  return {
    type: SAVED_LIST_FETCH,
    data,
  };
}

export function fetchSavedList() {
  return (dispatch) => {
    AsyncStorage.getItem('SAVED_STORIES').then((savedStories) => {
      const stories = savedStories ? JSON.parse(savedStories) : [];
      dispatch(fetchSavedListSuccess(stories));
    });
  };
}

export function addToSavedList(item) {
  return (dispatch) => {
    AsyncStorage.getItem('SAVED_STORIES').then((savedStories, getErr) => {
      if (getErr) {
        console.log('failed to get stories');
      } else {
        const stories = savedStories ? JSON.parse(savedStories) : [];
        if (stories.filter(e => e.id === item.id).length > 0) {
          dispatch(addToSavedListSuccesss(stories));
        } else {
          stories.push(item);
          AsyncStorage.setItem('SAVED_STORIES', JSON.stringify(stories)).then((err) => {
            if (err) {
              console.log('Failed to save stories');
            } else {
              dispatch(addToSavedListSuccesss(stories));
            }
          });
        }
      }
    });
  };
}

export function removeFromSavedList(item) {
  return (dispatch) => {
    AsyncStorage.getItem('SAVED_STORIES').then((savedStories, getErr) => {
      if (getErr) {
        console.log('failed getting stories');
      } else {
        const stories = savedStories
          ? JSON.parse(savedStories).filter(obj => obj.id !== item.id)
          : [];
        AsyncStorage.setItem('SAVED_STORIES', JSON.stringify(stories)).then((err) => {
          if (err) {
            console.log('Failed removing story');
          } else {
            dispatch(removeFromSavedListSuccess(stories));
          }
        });
      }
    });
  };
}
