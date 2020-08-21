import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom';


class Logout extends Component {

  componentWillMount(){
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
  }

  render(){
    return <Redirect to="/" />
  }
}

export default withRouter(Logout);

