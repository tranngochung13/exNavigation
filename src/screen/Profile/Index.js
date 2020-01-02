import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Button, Text} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Login from '../Login';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    const {data} = this.props.user;
  }
  // state = {
  //   persons: [],
  // };
  // componentDidMount() {
  //   axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
  //     const persons = res.data;
  //     this.setState({persons});
  //   });
  // }
  render() {
    console.log('email', this.props.user.email);
    return (
      <View>
        {/* {this.state.persons.map(person => (
          <View>
            <Text>{person.name}</Text>
            <Text>{person.email}</Text>
          </View>
        ))} */}
        <Text>{this.props.user.email}</Text>
        <Button
          onPress={() => {
            Navigation.setRoot({
              root: {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'Login',
                        options: {
                          topBar: {
                            backButton: {
                              visible: false,
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
          }}
          title="Sign Out"
        />
      </View>
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
    // loginHandle: data => dispatch(loginUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
