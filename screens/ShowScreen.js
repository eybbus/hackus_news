import React from 'react';
import SearchList from '../components/SearchList';

export default class ShowScreen extends React.Component {
  static navigationOptions = {
    title: 'Hackernews',
    headerStyle: {
      backgroundColor: '#ff6600',
    },
  };

  render() {
    return <SearchList type="show_hn" />;
  }
}
