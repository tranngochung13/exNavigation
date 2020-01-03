import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  AsyncStorage,
} from 'react-native';
import Form from '../../components/Form';
import Submit from '../../components/Button';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import {onChangeIntoMainScreen, onRegister} from '../../navigation';
import {loginUser} from '../../redux/actions/userAction/action';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secure: true,

      email: 'tranngochung1302@gmail.com',
      password: '0965243205',

      emailError: '',
      passwordError: '',

      loading: false,
    };
  }

  onRestart = () => {
    this.setState({emailError: ''});
    this.setState({passwordError: ''});
  };

  componentDidMount() {
    AsyncStorage.getItem('@login:email').then(email => {
      if (!email || email === '') {
        this.setState({loading: true});
      } else {
        this.onLogin(email);
      }
    });
  }

  onLogin = () => {
    const {email, password} = this.state;
    const data = {
      email: email,
      password: password,
    };

    this.onRestart();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data.email === '') {
      this.setState({emailError: 'You need type email'});
    } else if (reg.test(data.email) === false) {
      this.setState({emailError: 'Email wrong'});
    } else if (data.password === '') {
      this.setState({passwordError: 'You need type password'});
    } else {
      this.props.loginHandle(data);
      AsyncStorage.setItem('@login:email', this.state.email);
    }
    // if (!this.props.loginHandle(data)) {
    //   AsyncStorage.setItem('@login:email', this.state.email);
    //   this.props.Login(this.state.email);
    // }
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    if (!this.state.loading) {
      return <View />;
    }
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Form
              labelName="Email*"
              placeHolder="john123@gmail.com"
              getData={val => this.onChangeText('email', val)}
              valueError={this.state.emailError}
            />
            <Form
              labelName="Password*"
              placeHolder="****************"
              getData={val => this.onChangeText('password', val)}
              valueError={this.state.passwordError}
              isSecure={true}
            />

            <View style={styles.buttonSubmit}>
              <Submit submit={this.onLogin} labelSubmit="Login" />
            </View>

            <View>
              <Text onPress={() => onRegister()}>Register</Text>
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
