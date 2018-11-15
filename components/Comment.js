import React from 'react';
import {
  StyleSheet, View, Text, Linking, TouchableOpacity,
} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import HTML from 'react-native-render-html';

dayjs.extend(relativeTime); // using plugin to add reletive time functionality. Source: https://github.com/iamkun/dayjs/blob/master/docs/en/Plugin.md#relativetime

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  childContainer: {
    paddingLeft: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#617c93',
  },
  contentText: {
    borderBottomColor: '#617c93',
    paddingBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth * 4,
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
  constructor(props) {
    super(props);

    this.state = {
      hide: false,
    };
  }

  hideOnPress() {
    this.setState({ hide: !this.state.hide });
  }

  render() {
    let childComments = null;
    const { hide } = this.state;
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
        <TouchableOpacity onPress={() => this.hideOnPress()}>
          <Text style={styles.contentInfo}>
            {hide ? '[+]  ' : '[-]  '}
            {author}
            {' | '}
            {dayjs(detail.created_at_i * 1000).fromNow()}
          </Text>
        </TouchableOpacity>
        {hide ? null : (
          <HTML onLinkPress={openLink} html={text} containerStyle={styles.contentText} />
        )}
        {hide ? null : childComments}
      </View>
    );
  }
}
