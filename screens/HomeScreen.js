import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import NewsList from '../components/NewsList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#eee',
  },
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Hackernews',
  };

  render() {
    return <NewsList onNavigate={this.props.navigation.navigate} />;
  }
}
