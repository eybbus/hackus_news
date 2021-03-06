import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import FrontScreen from '../screens/FrontScreen';
import CommentList from '../components/CommentList';
import ShowScreen from '../screens/ShowScreen';
import AskScreen from '../screens/AskScreen';
import JobsScreen from '../screens/JobsScreen';
import StoryScreen from '../screens/StoryScreen';
import SavedScreen from '../screens/SavedScreen';

import Color from '../constants/Colors';

const Front = createStackNavigator({
  Front: {
    screen: FrontScreen,
    navigationOptions: {
      headerLeft: null,
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: {
      headerTitle: 'Comments',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
});

const Story = createStackNavigator({
  Story: {
    screen: StoryScreen,
    navigationOptions: {
      headerLeft: null,
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: {
      headerTitle: 'Comments',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
});

const Show = createStackNavigator({
  Show: {
    screen: ShowScreen,
    navigationOptions: {
      headerLeft: null,
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: {
      headerTitle: 'Comments',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
});

const Ask = createStackNavigator({
  Ask: {
    screen: AskScreen,
    navigationOptions: {
      headerLeft: null,
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: {
      headerTitle: 'Comments',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
});

const Jobs = createStackNavigator({
  Jobs: {
    screen: JobsScreen,
    navigationOptions: {
      headerLeft: null,
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
});

const Later = createStackNavigator({
  Later: {
    screen: SavedScreen,
    navigationOptions: {
      headerLeft: null,
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: {
      headerTitle: 'Comments',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
});

// Creates the Bottom tabs
const DashboardTabRoutes = createBottomTabNavigator(
  {
    Front,
    Story,
    Show,
    Ask,
    Jobs,
    Later,
  },
  {
    initialRouteName: 'Front',
    navigationOptions: ({ navigation }) => {
      const { routeName, routes } = navigation.state;
      const params = routes && routes[1] && routes[1].params;
      return {
        tabBarIcon: ({ tintColor }) => {
          let iconName;
          if (routeName === 'Front') {
            iconName = 'ios-book';
          } else if (routeName === 'Story') {
            iconName = 'ios-filing';
          } else if (routeName === 'Show') {
            iconName = 'ios-bulb';
          } else if (routeName === 'Ask') {
            iconName = 'md-hand';
          } else if (routeName === 'Jobs') {
            iconName = 'ios-briefcase';
          } else if (routeName === 'Later') {
            iconName = 'ios-archive';
          }
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        tabBarVisible: params && params.hideTabBar != null ? !params.hideTabBar : true,
      };
    },
    tabBarOptions: {
      activeTintColor: Color.tabIconSelected,
      inactiveTintColor: Color.tabIconDefault,
      style: {
        height: 60,
        paddingVertical: 5,
        backgroundColor: Color.tabBar,
      },
      labelStyle: {
        fontSize: 12,
        lineHeight: 20,
      },
    },
    tabBarPosition: 'bottom',
  },
);

export default DashboardTabRoutes;
