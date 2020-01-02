import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  View,
  Alert,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  BackHandler,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Form from '../Login/Form';
import Submit from '../Login/Button';
import { addUser } from './../../redux/actions/userAction/action';
import { connect } from 'react-redux';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secure: true,

      username: 'hang2807',
      email: 'hang@gmail.com',
      phoneNumber: '0965243205',
      password: 'hang2807',
      name: 'Hang',
      confirmPassword: 'hang2807',

      userError: '',
      emailError: '',
      phoneNumberError: '',
      usernameError: '',
      passwordError: '',
      confirmPasswordError: '',
    };
  }

  onRestart = () => {
    this.setState({ userError: '' });
    this.setState({ emailError: '' });
    this.setState({ phoneNumberError: '' });
    this.setState({ usernameError: '' });
    this.setState({ passwordError: '' });
    this.setState({ confirmPasswordError: '' });
  };

  onPress = () => {
    const { username, email, phoneNumber, name, password } = this.state;
    const data = {
      username: username,
      email: email,
      password: password,
      name: name,
      phoneNumber: phoneNumber
    }
    this.props.registerHandle(data);


    // this.onRestart();
    // let {
    //   user,
    //   email,
    //   phoneNumber,
    //   username,
    //   password,
    //   confirmPassword,
    // } = this.state;
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // if (user === '') {
    //   this.setState({ userError: 'You need type user' });
    // }
    // // Validation email
    // if (email === '') {
    //   this.setState({ emailError: 'You need type email' });
    // } else if (reg.test(email) === false) {
    //   this.setState({ emailError: 'Email wrong' });
    // }
    // //Validation phone number
    // if (phoneNumber === '') {
    //   this.setState({ phoneNumberError: 'You need type phone number' });
    // } else if (phoneNumber.length < 9 || phoneNumber.length > 11) {
    //   this.setState({ phoneNumberError: 'Phone number length error' });
    // }
    // // Validation username
    // if (username === '') {
    //   this.setState({ usernameError: 'You need type username' });
    // }
    // // Validation password
    // if (password === '') {
    //   this.setState({ passwordError: 'You need type password' });
    // }
    // // Validation confirm password
    // if (confirmPassword === '') {
    //   this.setState({ confirmPasswordError: 'You need type confirm password' });
    // } else if (confirmPassword === password) {
    // } else {
    //   this.setState({
    //     confirmPasswordError:
    //       'Password confirmation does not match the password',
    //   });
    // }
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  onExit = () => Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  backButton: {
                    visible: true,
                  },
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
    },
  });



  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Form
              labelName="Name of user*"
              placeHolder="John"
              // value={this.state.name}
              getData={val => this.onChangeText('name', val)}
              valueError={this.state.userError}
            />
            <Form
              labelName="Email*"
              // value={this.state.email}
              placeHolder="abc@gmail.com"
              getData={val => this.onChangeText('email', val)}
              valueError={this.state.emailError}
            />
            <Form
              labelName="Phone number*"
              // value={this.state.phoneNumber}
              placeHolder="012345678..."
              getData={val => this.onChangeText('phoneNumber', val)}
              valueError={this.state.phoneNumberError}
            />
            <Form
              labelName="Username*"
              // value={this.state.username}
              placeHolder="john123"
              getData={val => this.onChangeText('username', val)}
              valueError={this.state.usernameError}
            />
            <Form
              labelName="Password*"
              // value={this.state.password}
              placeHolder="****************"
              getData={val => this.onChangeText('password', val)}
              valueError={this.state.passwordError}
              isSecure={true}
            />
            <Form
              // value={this.state.confirmPassword}
              labelName="Confirm password*"
              placeHolder="****************"
              getData={val => this.onChangeText('confirmPassword', val)}
              valueError={this.state.confirmPasswordError}
              isSecure={true}
            />
            <View style={styles.buttonSubmit}>
              <Submit submit={this.onPress} labelSubmit="Register" />
              <Submit submit={this.onExit} labelSubmit="Exit" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerHandle: data => dispatch(addUser(data)),
  }
}

export default connect(null, mapDispatchToProps)(Register);

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







