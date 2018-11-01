import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

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
        {item.url && (
          <TouchableOpacity style={styles.buttonContainer}>
            <Text> article </Text>
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
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    commentAmount: PropTypes.number.isRequired,
  }).isRequired,
};

export default NewsItem;
