import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HTML from 'react-native-render-html';
import Comments from './Comment';
import { fetchComments } from '../actions/fetchComments';
import Color from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  storyContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
    borderBottomColor: Color.tabBar,
    borderBottomWidth: StyleSheet.hairlineWidth * 4,
    backgroundColor: Color.footerBackground,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: '#eeeeee',
    paddingBottom: 5,
  },
  subText: {
    fontSize: 12,
  },
  contentText: {
    borderBottomColor: 'rgb(200, 200, 200)',
    paddingBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth * 1,
  },
});

class CommentList extends React.Component {
  componentDidMount() {
    this.props.store.comments = [];
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId');
    this.props.fetchComments(itemId);
  }

  // eslint-disable-next-line class-methods-use-this
  openLink(url) {
    if (url !== null) {
      Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }
  }

  render() {
    const { navigation } = this.props;
    const content = navigation.getParam('content');
    const { comments, isFetching } = this.props.store;
    if (content.story === null) {
      content.story = '';
    }

    return (
      <FlatList
        style={{ flex: 1 }}
        data={comments}
        renderItem={({ item }) => <Comments detail={item} />}
        ListEmptyComponent={
          isFetching ? (
            <View style={styles.container}>
              <ActivityIndicator size="large" color={Color.activityIndicator} />
            </View>
          ) : (
            <View style={styles.container}>
              <Text>No comments here</Text>
            </View>
          )
        }
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={(
          <TouchableOpacity
            style={styles.storyContainer}
            onPress={() => this.openLink(content.url)}
          >
            <View style={styles.contentContainer}>
              <Text key="title" numberOfLines={2} style={styles.title}>
                {content.title.trim()}
              </Text>
              <Text style={styles.subText}>{content.url}</Text>
              {content.story.length > 0 ? (
                <HTML
                  onLinkPress={(evt, href) => this.openLink(href)}
                  html={content.story}
                  containerStyle={styles.contentText}
                />
              ) : null}
              <Text key="subText" numberOfLines={1} style={styles.subText}>
                {content.points}
                {' points by '}
                {content.author}
                {' | '}
                {content.commentAmount}
                {' comments'}
              </Text>
            </View>
          </TouchableOpacity>
)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state.commentsStore,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ fetchComments }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentList);
