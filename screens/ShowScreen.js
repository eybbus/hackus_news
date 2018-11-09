import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import NewsList from '../components/NewsList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#eee',
  },
});

export default class ShowScreen extends React.Component {
  static navigationOptions = {
    title: 'Hackernews',
    headerStyle: {
      backgroundColor: '#ff6600',
    },
  };

  render() {
    return <Text> Show page </Text>;
  }
}
