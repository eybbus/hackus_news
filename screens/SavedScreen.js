import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SavedList from '../components/SavedList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#eee',
  },
});

export default class SavedScreen extends React.Component {
  static navigationOptions = {
    title: 'HN - Read later',
  };

  render() {
    return <SavedList />;
  }
}
