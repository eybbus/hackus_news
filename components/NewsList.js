import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  Text,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNews, fetchNewNews } from '../actions/fetchNews';
import Color from '../constants/Colors';

import NewsItem from './NewsItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerStyle: {
    flex: 1,
    backgroundColor: Color.footerBackground,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  footerText: {
    color: Color.footerText,
  },
});

class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0;
  }

  componentDidMount() {
    this.props.fetchNewNews();
  }

  getData() {
    this.page += 1;
    this.props.fetchNews(this.page);
  }

  setupNews = item => ({
    id: item.objectID,
    title: item.title,
    url: item.url,
    author: item.author,
    points: item.points,
    commentAmount: item.num_comments,
    story: item.story_text,
  });

  customKeyExtractor = item => item.objectID;

  fetchReset = () => {
    this.props.fetchNewNews();
    this.page = 0;
  };

  render() {
    const { news, isFetching, isFetchingMore } = this.props.store;
    const { hits, nbPages } = news;

    if (isFetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Color.activityIndicator} />
        </View>
      );
    }
    return (
      <FlatList
        data={hits}
        renderItem={({ item }) => <NewsItem item={this.setupNews(item)} />}
        keyExtractor={this.customKeyExtractor}
        refreshing={isFetching}
        onRefresh={() => this.fetchReset()}
        extraData={this.props}
        ListFooterComponent={
          isFetchingMore === true ? (
            <View style={styles.footerStyle}>
              <ActivityIndicator size="small" color={Color.activityIndicator} />
            </View>
          ) : nbPages == this.page + 1 ? (
            <TouchableHighlight style={styles.footerStyle}>
              <Text style={styles.footerText}>You reached the end!</Text>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight style={styles.footerStyle} onPress={() => this.getData()}>
              <Text style={styles.footerText}>Load more?</Text>
            </TouchableHighlight>
          )
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state.newsStore,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ fetchNews, fetchNewNews }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsList);
