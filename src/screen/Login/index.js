import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import Form from './Form';
import Submit from './Button';
import Home from '../Home/Home';
import {Navigation} from 'react-native-navigation';
import Profile from '../Profile';
import Detail from '../Home/Detail';
import TodoList from '../Todos/TodoList';
import Edit from '../Todos/Edit';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import {onChangeIntoMainScreen} from '../../navigation';
import {loginUser} from '../../redux/actions/userAction/action';
import {connect} from 'react-redux';

function ReduxProvider(Component) {
  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

Navigation.registerComponent(
  'Edit',
  () => ReduxProvider(Edit),
  () => Edit,
);

Navigation.registerComponent(
  'Profile',
  () => ReduxProvider(Profile),
  () => Profile,
);
Navigation.registerComponent(
  'Detail',
  () => ReduxProvider(Detail),
  () => Detail,
);
Navigation.registerComponent(
  'TodoList',
  () => ReduxProvider(TodoList),
  () => TodoList,
);
// Navigation.registerComponent('Edit', () => Edit);

// export default connect(null)(Index);
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secure: true,

      email: 'hang@gmail.com',
      password: 'hang2807',

      usernameError: '',
      passwordError: '',
    };
  }

  onRestart = () => {
    this.setState({usernameError: ''});
    this.setState({passwordError: ''});
  };

  // onPress = () => {
  //   onChangeIntoMainScreen();
  // };

  onPress = () => {
    const {email, password} = this.state;
    const data = {
      email: email,
      password: password,
    };
    this.props.loginHandle(data);
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Form
              value={this.state.email}
              labelName="Username*"
              placeHolder="john123"
              getData={val => this.onChangeText('email', val)}
              valueError={this.state.usernameError}
            />
            <Form
              value={this.state.password}
              labelName="Password*"
              placeHolder="****************"
              getData={val => this.onChangeText('password', val)}
              valueError={this.state.passwordError}
              isSecure={true}
            />

            <View style={styles.buttonSubmit}>
              <Submit submit={this.onPress} labelSubmit="Login" />
            </View>

            <View>
              <Text
                onPress={() =>
                  Navigation.setRoot({
                    root: {
                      stack: {
                        children: [
                          {
                            component: {
                              name: 'Register',
                              options: {
                                topBar: {
                                  title: {
                                    text: 'Register',
                                    alignment: 'center',
                                    fontSize: 30,
                                  },
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  })
                }>
                Register
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = data => {
  return {
    user: data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginHandle: data => dispatch(loginUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  borders: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  borders1: {
    flex: 1,
    fontSize: 40,
  },
  buttonSubmit: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
  },
});
