import { Component } from 'react';
import styled from 'styled-components';

import KeyItem from './KeyItem';
import { getJSON } from '../helpers';

const ListContainer = styled.div`
`;

const Title = styled.h1`
  text-align: left;
  font-size: 40px;
  font-weight: 300;
  width: calc(100% - 200px);
  display: inline-block;
  padding-bottom: 20px;
`;

const Loading = styled.img`
  height: 100px;
  width: 100px;
  margin-left: calc(50% - 100px);
`;

const Button = styled.button`
  text-align: center;
  float: right;
`;

const Icon = styled.img`
  height: 23px;
  padding-bottom: 2px;
`;

export default class Roles extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.addRole = this.addRole.bind(this);
  }

  componentDidMount() {
    getJSON('/api/roles', (err, roles) => {
      if (err) {
        console.error(err);
        return;
      }

      this.setState({ ...this.state, roles: roles[0] });
    });
  }

  addRole() {
    this.setState({ ...this.state, roles: [''].concat(this.state.roles) });

    setTimeout(() => {
      $('.collapse:first').addClass('show');
    }, 250);
  }

  render() {
    if (!this.state.roles) {
      return <Loading alt="Loading" src="static/img/spinner.gif" />;
    }

    console.log(this.state);

    return (
      <ListContainer>
        <Title>Uloge</Title>
        <Button className="btn btn-info" onClick={this.addRole} ><Icon alt="plus" src="static/img/plus.png" />&nbsp;&nbsp;Nova uloga</Button>
        <div id="people" role="tablist" aria-multiselectable="true">
          {this.state.roles.map(p => <KeyItem key={p} data={p} />)}
        </div>
      </ListContainer>
    );
  }
}
