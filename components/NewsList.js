import React from 'react';
import {
  StyleSheet, View, ActivityIndicator, FlatList,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchNews from '../actions/fetchNews';
import NewsItem from './NewsItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class NewsList extends React.Component {
  componentDidMount() {
    this.props.fetchNews();
  }

  setupNews = item => ({
    id: item.objectID,
    title: item.title,
    url: item.url,
    author: item.author,
    points: item.points,
    commentAmount: item.num_comments,
  });

  customKeyExtractor = item => item.objectID;

  fetch = () => {
    this.props.fetchNews();
  };

  render() {
    const { news, isFetching } = this.props.news;
    if (isFetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <FlatList
        data={news.hits}
        renderItem={({ item }) => <NewsItem item={this.setupNews(item)} />}
        keyExtractor={this.customKeyExtractor}
        refreshing={isFetching}
        onRefresh={this.fetch}
      />
    );
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
)(NewsList);
