import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import NewsList from '../components/NewsList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Hackernews',
    headerStyle: {
      backgroundColor: '#ff6600',
    },
  };

  render() {
    console.log(this.props);

    return <NewsList onNavigate={this.props.navigation.navigate} />;
  }
}
