import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
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
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.contentContainer}>
          <Text key="title" numberOfLines={2} style={styles.title}>
            {item.title.trim()}
          </Text>
          <Text key="subText" numberOfLines={1} style={styles.subText}>
            {item.points}
            {' points by '}
            {item.author}
            {' | '}
            {item.commentAmount}
            {' comments'}
          </Text>
        </View>
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
    commentAmount: PropTypes.number.isRequired,
  }).isRequired,
};

export default withNavigation(NewsItem);
