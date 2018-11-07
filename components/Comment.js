import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({});

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { detail } = this.props;
    console.log(detail.children);
    const childComments = detail.children.map(comment => (
      <Comment key={comment.id} detail={comment} />
    ));

    const { id, author, text } = detail;
    return (
      <View>
        <Text>
          {id}
          {' '}
          {author}
          {' '}
          {text}
        </Text>
        {childComments}
      </View>
    );
  }
}
