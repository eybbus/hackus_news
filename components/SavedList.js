import React from 'react';
import {
  FlatList, AsyncStorage, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Color from '../constants/Colors';

const styles = StyleSheet.create({
  text: {
    backgroundColor: Color.info,
    color: Color.infoText,
    fontSize: 16,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
});

class SavedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedStories: [],
    };
  }

  componentWillMount() {}

  async getSavedStories() {
    try {
      const savedStories = await AsyncStorage.getItem('SAVED_STORIES');
      this.setState({ savedStories: savedStories ? JSON.parse(savedStories) : [] });
    } catch (error) {
      console.log('error occurred while getting storage');
    }
  }

  componentDidMount() {
    this.getSavedStories();
  }

  customKeyExtractor(item) {
    return item.id;
  }

  render() {
    const { savedStories } = this.state;

    if (!savedStories.length) {
      return (
        <Text style={styles.text}>
          {
            ' Nothing saved? To add to your reading list, press and hold any story. The story will then be added. '
          }
        </Text>
      );
    }
    return (
      <FlatList
        data={savedStories}
        renderItem={({ item }) => <NewsItem item={item} removable />}
        keyExtractor={this.customKeyExtractor}
        refreshing={false}
        onRefresh={() => this.getSavedStories()}
        ListHeaderComponent={
          <Text style={styles.text}> Press and hold to remove items from this list. </Text>
        }
        // extraData={this.props}
      />
    );
  }
}

SavedList.propTypes = {};

export default SavedList;
