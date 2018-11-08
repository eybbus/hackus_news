import React from 'react';
import {
  StyleSheet, View, ActivityIndicator, Text, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Comments from './Comment';
import fetchComments from '../actions/fetchComments';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 15,
  },
});

class CommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId');
    this.props.fetchComments(itemId);
  }

  render() {
    const { comments, isFetching } = this.props.comments;

    if (isFetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    // console.log(comments);
    // const listItems = comments.map(comment => <Comments key={comment.id} detail={comment} />);

    return (
      <FlatList
        style={{ flex: 1 }}
        data={comments}
        renderItem={({ item }) => <Comments detail={item} />}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
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
