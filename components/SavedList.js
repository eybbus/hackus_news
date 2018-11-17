import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSavedList } from '../actions/savedListActions';
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
  }

  componentDidMount() {
    this.props.fetchSavedList();
  }

  customKeyExtractor(item) {
    return item.id;
  }

  render() {
    const { store } = this.props;
    if (!store.savedList.length) {
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
        data={store.savedList}
        renderItem={({ item }) => <NewsItem item={item} removable />}
        keyExtractor={this.customKeyExtractor}
        refreshing={false}
        onRefresh={() => this.props.fetchSavedList()}
        ListHeaderComponent={
          <Text style={styles.text}> Press and hold to remove items from this list. </Text>
        }
        // extraData={this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state.savedListStore,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ fetchSavedList }, dispatch),
  };
}

SavedList.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedList);
