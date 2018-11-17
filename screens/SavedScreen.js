import React from 'react';
import SavedList from '../components/SavedList';

export default class SavedScreen extends React.Component {
  static navigationOptions = {
    title: 'HN - Read later',
  };

  render() {
    return <SavedList />;
  }
}
