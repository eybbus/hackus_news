import React from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchNews from '../actions/fetchNews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Hackernews',
    headerStyle: {
      backgroundColor: '#ff6600',
    },
  };

  componentDidMount() {
    this.props.fetchNews();
  }

  render() {
    const { news, isFetching } = this.props.news;
    console.log(news);

    if (isFetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    const titles = news.hits.map(item => <Text key={item.objectID}>{item.title}</Text>);
    return <View style={styles.container}>{titles}</View>;
  }
}

function mapStateToProps(state) {
  return {
    news: state.news,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ fetchNews }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
