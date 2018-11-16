import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Linking, AsyncStorage,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderBottomColor: 'rgb(220, 220, 220)',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 15,
    paddingRight: 5,
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
});

class NewsItem extends React.Component {
  openLink(url) {
    if (url === null) {
      const { item } = this.props;
      this.props.navigation.navigate('CommentList', {
        itemId: item.id,
        content: item,
        hideTabBar: true,
      });
    } else {
      Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }
  }

  async saveLink(item) {
    try {
      const savedStories = await AsyncStorage.getItem('SAVED_STORIES');

      const stories = savedStories ? JSON.parse(savedStories) : [];
      stories.push(item);
      try {
        AsyncStorage.setItem('SAVED_STORIES', JSON.stringify(stories));
      } catch (e) {
        console.log('failed to save story');
      }
    } catch (e) {
      console.log('failed to load storage');
    }
  }

  async removeLink(item) {
    try {
      const savedStories = await AsyncStorage.getItem('SAVED_STORIES');

      const stories = savedStories ? JSON.parse(savedStories).filter(obj => obj.id !== item.id) : [];
      try {
        AsyncStorage.setItem('SAVED_STORIES', JSON.stringify(stories));
      } catch (e) {
        console.log('failed to save story');
      }
    } catch (e) {
      console.log('failed to load storage');
    }
  }

  render() {
    const { item, removable } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.openLink(item.url)}
        onLongPress={removable ? () => this.removeLink(item) : () => this.saveLink(item)}
      >
        <View style={styles.contentContainer}>
          <Text key="title" numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text key="subText" numberOfLines={1} style={styles.subText}>
            {item.points}
            {' points by '}
            {item.author}
            {item.commentAmount === null ? null : ` | ${item.commentAmount} comments`}
          </Text>
        </View>
        {item.commentAmount === null ? null : (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.props.navigation.navigate('CommentList', {
                itemId: item.id,
                content: item,
                hideTabBar: true,
              });
            }}
          >
            <FontAwesome name="comment-o" size={20} color="orange" />
            <Text>{item.commentAmount}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
}

NewsItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    author: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    commentAmount: PropTypes.number,
    story: PropTypes.string,
  }).isRequired,
  removable: PropTypes.bool,
};

NewsItem.defaultProps = {
  removable: false,
};

export default withNavigation(NewsItem);
