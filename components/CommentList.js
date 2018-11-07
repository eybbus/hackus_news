import React from 'react';
import {
  StyleSheet, View, ActivityIndicator, Text,
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
  kidsContainer: {
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
    paddingBottom: 5,
  },
});

class CommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchComments(18390264);
  }

  render() {
    const { comments, isFetching } = this.props.comments;
    // console.log(this.props.comments.comments);
    // console.log(comments);

    // console.log(this.props);
    // console.log(this.props.comments);

    if (isFetching || comments.length === 0) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    // console.log(comments);
    const listItems = comments.map(comment => <Comments key={comment.id} detail={comment} />);

    return <View>{listItems}</View>;
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
