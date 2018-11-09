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
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
    borderBottomColor: 'rgb(220, 220, 220)',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: 'black',
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

const openLink = (_, href) => {
  Linking.openURL(href).catch(err => console.error('An error occurred', err));
};

class CommentList extends React.Component {
  componentDidMount() {
    this.props.store.comments = [];
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId');
    this.props.fetchComments(itemId);
  }

  openLink(url) {
    if (url !== null) {
      Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }
  }

  render() {
    const { navigation } = this.props;
    const content = navigation.getParam('content');
    console.log(content);
    const { comments, isFetching } = this.props.store;
    if (content.story === null) {
      content.story = '';
    }

    console.log(content.story !== null);

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
                  onLinkPress={openLink}
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