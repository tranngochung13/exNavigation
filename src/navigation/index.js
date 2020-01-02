import {Navigation} from 'react-native-navigation';
import React from 'react';

import Login from '../screen/Login';
import {Provider} from 'react-redux';
import store from '../redux/store';
import TodoList from '../screen/Todos/TodoList';
import Register from '../screen/Register';
import Edit from '../screen/Todos/Edit';
import Home from '../screen/Home/Home';

import demo from '../screen/demoGetAPI';

function ReduxProvider(Component) {
  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

Navigation.registerComponent(
  'demo',
  () => ReduxProvider(demo),
  () => demo,
);

Navigation.registerComponent(
  'TodoList',
  () => ReduxProvider(TodoList),
  () => TodoList,
);

Navigation.registerComponent(
  'Register',
  () => ReduxProvider(Register),
  () => Register,
);

Navigation.registerComponent(
  'Login',
  () => ReduxProvider(Login),
  () => Login,
);

Navigation.registerComponent(
  'Edit',
  () => ReduxProvider(Edit),
  () => Edit,
);

Navigation.registerComponent(
  'Home',
  () => ReduxProvider(Home),
  () => Home,
);

export default function app() {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  title: {
                    text: 'Login',
                    alignment: 'center',
                    fontSize: 30,
                  },
                },
              },
            },
          },
        ],
      },
    });
  });
}

export const onChangeIntoMainScreen = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home',
                    options: {
                      topBar: {
                        title: {
                          text: 'Upcoming Event',
                          alignment: 'center',
                          fontSize: 30,
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Event',
                  icon: require('../asset/image/Events.jpg'),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'TodoList',
                    options: {
                      topBar: {
                        title: {
                          text: 'Todo List',
                          alignment: 'center',
                          fontSize: 30,
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Todo',
                  icon: require('../asset/image/todo.png'),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Profile',
                    options: {
                      topBar: {
                        title: {
                          text: 'Profile',
                          alignment: 'center',
                          fontSize: 30,
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Profile',
                  icon: require('../asset/image/profile.png'),
                },
              },
            },
          },
        ],
        options: {},
      },
    },
  });
};
