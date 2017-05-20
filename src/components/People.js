import { Component } from 'react';
import styled from 'styled-components';

import ListItem from './ListItem';
import { getJSON } from '../helpers';

const Loading = styled.img`
  height: 100px;
  width: 100px;
`;

const ListContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 300;
  padding-bottom: 20px; 
`;

export default class People extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  render() {
    console.log(this.state);

    if (!this.state.people) {
      return <ListContainer><Loading alt="Loading" src="static/img/spinner.gif" /></ListContainer>;
    }

    return (
      <ListContainer>
        <Title>Svi spasitelji</Title>
        <div id="people" role="tablist" aria-multiselectable="true">
          {this.state.people.map(p => <ListItem key={p._id} data={p} />)}
        </div>
      </ListContainer>
    );
  }
}
