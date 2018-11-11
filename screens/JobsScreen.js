import React from 'react';

import SearchList from '../components/SearchList';

export default class JobsScreen extends React.Component {
  static navigationOptions = {
    title: 'Jobs',
    headerStyle: {
      backgroundColor: '#ff6600',
    },
  };

  render() {
    return <SearchList type="job" />;
  }
}
