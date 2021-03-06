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
import dayjs from 'dayjs';
import { fetchSearch, fetchMoreSearch } from '../actions/fetchSearch';
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

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0;
  }

  componentDidMount() {
    this.props.fetchSearch('search_by_date', this.props.type, 0, undefined);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sortBy !== prevProps.sortBy) {
      this.fetchReset();
    }
  }

  getData() {
    this.page += 1;
    const unix = this.getNumerical();
    if (unix === '') {
      this.props.fetchSearch('search_by_date', this.props.type, this.page, undefined);
    } else {
      this.props.fetchSearch('search', this.props.type, this.page, unix);
    }
  }

  getNumerical() {
    const { sortBy } = this.props;
    let unix = 0;

    if (sortBy === 'New') {
      return '';
    }
    if (sortBy === 'Day') {
      unix = dayjs()
        .subtract(1, 'day')
        .unix();
    } else if (sortBy === 'Week') {
      unix = dayjs()
        .subtract(7, 'day')
        .unix();
    } else if (sortBy === 'Month') {
      unix = dayjs()
        .subtract(1, 'month')
        .unix();
    } else if (sortBy === 'Year') {
      unix = dayjs()
        .subtract(1, 'year')
        .unix();
    } else {
      unix = 0;
    }

    return `created_at_i>${unix}`;
  }

  setupNews = (item) => {
    const setupItem = {
      id: item.objectID,
      title: item.title,
      url: item.url,
      author: item.author,
      points: item.points,
      commentAmount: item.num_comments,
      story: item.story_text,
    };
    return setupItem;
  };

  customKeyExtractor = item => item.objectID;

  fetchReset() {
    const unix = this.getNumerical();
    if (unix === '') {
      this.props.fetchSearch('search_by_date', this.props.type, 0, undefined);
    } else {
      this.props.fetchSearch('search', this.props.type, 0, unix);
    }
    this.page = 0;
  }

  render() {
    const { search, isFetching, isFetchingMore } = this.props.store;
    const { hits, nbPages } = search[this.props.type];

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
          // eslint-disable-next-line no-nested-ternary
          isFetchingMore === true ? (
            <View style={styles.footerStyle}>
              <ActivityIndicator size="small" color={Color.activityIndicator} />
            </View>
          ) : nbPages === this.page + 1 ? (
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
    store: state.searchStore,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ fetchSearch, fetchMoreSearch }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchList);
