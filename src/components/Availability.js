import { Component } from 'react';
import styled from 'styled-components';

import ListItem from './ListItem';
import { getJSON } from '../helpers';

const ListContainer = styled.div`
`;

const Title = styled.h1`
  text-align: left;
  font-size: 40px;
  font-weight: 300;
  width: calc(100% - 200px);
  display: inline-block;
`;

const Loading = styled.img`
  height: 100px;
  width: 100px;
  margin-left: calc(50% - 100px);
`;

export default class Availability extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    getJSON('/api/people/available', (err, available) => {
      if (err) {
        console.error(err);
        return;
      }

      this.setState({ ...this.state, available });
    });
  }

  render() {
    if (!this.state.available) {
      return <Loading alt="Loading" src="static/img/spinner.gif" />;
    }

    return (
      <ListContainer>
        <Title>Trenutno dostupni spašavatelji</Title>
        <br /><br />
        <div id="people" role="tablist" aria-multiselectable="true">
          {this.state.available.map(p => <ListItem key={p._id} data={p} condensed={true} />)}
        </div>
      </ListContainer>
    );
  }
}
