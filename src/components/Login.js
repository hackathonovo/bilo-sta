import { Component } from 'react';
import styled from 'styled-components';
import 'whatwg-fetch';

import { getJSON } from '../helpers';

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 2px;
  font-size: larger;
`;

const Logo = styled.img`
  height: 100px;
`;

const handlePasswordChange = e => {
  this.setState({ ...this.state, password: e.target.value });
};

const handleUsernameChange = e => {
  this.setState({ ...this.state, username: e.target.value });
};

const handleClick = e => {
  e.target.blur();

  getJSON('api/login', this.state, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  console.log('Login succesfull', data);

  //window.location.href = '/${data}';
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '' };
  }

  render() {
    return (<div className="card">
      <div className="card-block">
        <Title className="card-title"><Logo src="/static/img/hgss-logo.png" alt="HGSS" />&nbsp;&nbsp;Organizacija</Title>
        <br />
        <div className="card-text">
          <Input type="text" placeholder="Korisničko ime" value={this.state.username} onChange={handleUsernameChange} />
          <Input type="password" placeholder="Lozinka" value={this.state.password} onChange={handlePasswordChange} />
        </div>
        <br />
        <input type="submit" className="btn btn-primary" style={{float: 'right'}} value="Prijavi se" onClick={handleClick}/>
      </div>
    </div>);
  }
}
