import { Component } from 'react';
import styled from 'styled-components';

import { postJSON } from '../helpers';

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

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '' };

    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ ...this.state, username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ ...this.state, password: e.target.value });
  }

  handleClick() {
    postJSON('api/login', this.state, (err, user) => {
      if (err) {
        console.error(err);
        return;
      }

      if (user.ADMIN) {
        window.location.href = '/administrator';
      } else {
        window.location.href = '/home';
      }
    });
  }

  render() {
    return (<div className="card custom-card">
      <div className="card-block">
        <Title className="card-title"><Logo src="/static/img/hgss-logo.png" alt="HGSS" />&nbsp;&nbsp;Organizacija</Title>
        <br />
        <div className="card-text">
          <Input type="text" placeholder="Korisničko ime" value={this.state.username} onChange={this.handleUsernameChange} />
          <Input type="password" placeholder="Lozinka" value={this.state.password} onChange={this.handlePasswordChange} />
        </div>
        <br />
        <input type="submit" className="btn btn-primary" style={{float: 'right'}} value="Prijavi se" onClick={this.handleClick} />
      </div>
    </div>);
  }
}
