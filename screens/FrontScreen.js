import React from 'react';
import NewsList from '../components/NewsList';

export default class FrontScreen extends React.Component {
  static navigationOptions = {
    title: 'HN - Front Page',
  };

  render() {
    return <NewsList />;
  }
}
