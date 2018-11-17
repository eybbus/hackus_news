import React from 'react';
import { View, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import SearchList from '../components/SearchList';
import Color from '../constants/Colors';
import Layout from '../constants/Layout';

const styles = StyleSheet.create({
  dropdown: {
    width: 100,
    marginTop: 0,
    marginRight: 8,
    backgroundColor: Color.dropDownBackground,
  },
  dropdownDropdown: {
    marginTop: Layout.dropDownMarginTop,
    width: 100,
    height: 'auto',
  },
  dropdownButtonText: {
    paddingVertical: 10,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdownRowText: {
    backgroundColor: Color.dropDownBackground,
    color: Color.dropdownText,
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default class ShowScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Hn - Show',
      headerRight: (
        <ModalDropdown
          style={styles.dropdown}
          textStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdownDropdown}
          dropdownTextStyle={styles.dropdownRowText}
          defaultValue="New"
          options={Layout.dropDownOptions}
          onSelect={(idx, value) => params.selectValue(value)}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: 'new',
    };

    this.onDropDownChange = this.onDropDownChange.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ selectValue: this.onDropDownChange });
  }

  onDropDownChange(type) {
    this.setState({ selected: type });
  }

  render() {
    const { selected } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <SearchList type="show_hn" sortBy={selected} />
      </View>
    );
  }
}
