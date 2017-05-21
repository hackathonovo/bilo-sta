import { Component } from 'react';
import styled from 'styled-components';

import ListItem from './ListItem';
import { getJSON, postJSON } from '../helpers';
import Item from './Item';
import SearchBar from './SearchBar';

const Loading = styled.img`
  height: 100px;
  width: 100px;
`;

const ListContainer = styled.div`
  text-align: center
`;

const Title = styled.h1`
  text-align: left;
  font-size: 40px;
  font-weight: 300;
  width: calc(100% - 200px);
  display: inline-block;
`;

const Icon = styled.img`
  height: 23px;
  padding-bottom: 2px;
`;

const Button = styled.button`
  text-align: center;
  float: right;
`;

const emptyPerson = {
  available: true,
  firstname: '',
  lastname: '',
  mail: '',
  address: { addressname: '' },
  phoneNumber: '',
  password: '',
  profession: [],
  role: 'Admin',
  smartphone: true,
  _id: 'new-person',
};

export default class People extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.addPerson = this.addPerson.bind(this);
  }

  componentWillMount() {
    getJSON('/api/people', (err, people) => {
      if (err) {
        console.error(err);
        return;
      }

      this.setState({ ...this.state, people });
    });
  }

  addPerson() {
    this.setState({ ...this.state, people: [emptyPerson].concat(this.state.people) });

    setTimeout(() => {
      $('.collapse:first').addClass('show');
    }, 250);
  }

  render() {
    if (!this.state.people) {
      return <ListContainer><Loading alt="Loading" src="static/img/spinner.gif" /></ListContainer>;
    }

    return (
      <ListContainer>
        <Title>Spašavatelji</Title>
        <Button className="btn btn-info" onClick={this.addPerson} ><Icon alt="plus" src="static/img/plus.png" />&nbsp;&nbsp;Novi spasitelj</Button>
        <br /><br /><SearchBar/><br /><br />
        <div id="people" role="tablist" aria-multiselectable="true">
          {this.state.people.map(p => <ListItem key={p._id} data={p} condensed={false} />)}
        </div>
      </ListContainer>
    );
  }
}
