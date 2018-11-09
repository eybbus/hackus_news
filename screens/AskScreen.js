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

export default class AskScreen extends React.Component {
  render() {
    return <Text> Ask page </Text>;
  }
}
