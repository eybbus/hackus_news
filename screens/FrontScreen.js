import React from 'react';
import { StyleSheet } from 'react-native';
import NewsList from '../components/NewsList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#eee',
  },
});

export default class FrontScreen extends React.Component {
  static navigationOptions = {
    title: 'HN - Front Page',
  };

  render() {
    return <NewsList />;
  }
}
