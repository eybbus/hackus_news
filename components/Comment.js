import React from 'react';
import {
  StyleSheet, View, Text, Linking,
} from 'react-native';
import HTML from 'react-native-render-html';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  childContainer: {
    paddingLeft: 8,
    borderLeftWidth: 4,
  },
  contentText: {
    borderBottomColor: 'rgb(200, 200, 200)',
    paddingBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth * 1,
  },
  contentInfo: {
    opacity: 0.8,
    fontSize: 14,
    paddingBottom: 2,
  },
});

const openLink = (_, href) => {
  Linking.openURL(href).catch(err => console.error('An error occurred', err));
};

export default class Comment extends React.Component {
  render() {
    let childComments = null;
    const { detail } = this.props;
    if (detail.parent_id === detail.story_id) {
      child = false;
    }
    if (detail.children.length > 0) {
      childComments = detail.children.map(comment => (
        <View key={comment.id} style={styles.childContainer}>
          <Comment detail={comment} />
        </View>
      ));
    }

    const { author, text } = detail;
    if (author === null) {
      return (
        <View
          style={[
            styles.container,
            detail.parent_id !== detail.story_id && { paddingHorizontal: 0 },
          ]}
        >
          <Text style={styles.contentInfo}>[Deleted]</Text>
          {childComments}
        </View>
      );
    }
    return (
      <View
        style={[styles.container, detail.parent_id !== detail.story_id && { paddingHorizontal: 0 }]}
      >
        <Text style={styles.contentInfo}>
          {author}
          {' * '}
          {'Time '}
          {'ago'}
        </Text>
        <HTML onLinkPress={openLink} html={text} containerStyle={styles.contentText} />
        {childComments}
      </View>
    );
  }
}
