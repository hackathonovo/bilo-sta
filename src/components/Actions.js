import { Component } from 'react';
import styled from 'styled-components';

import { getJSON } from '../helpers';
import ActionItem from './ActionItem';
import SearchBar from './SearchBar';

const ListContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  text-align: left;
  font-size: 40px;
  font-weight: 300;
  width: calc(100% - 200px);
`;

const Loading = styled.img`
  height: 100px;
  width: 100px;
  margin-left: calc(50% - 100px);
`;

export default class Actions extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    getJSON('/api/actions', (err, actions) => {
      if (err) {
        console.error(err);
        return;
      }

      this.setState({ ...this.state, actions });
    });
  }

  render() {
    if (!this.state.actions) {
      return <Loading alt="Loading" src="static/img/spinner.gif" />;
    }

    return (
      <ListContainer>
        <Title>Akcije</Title>
        <br /><SearchBar/><br /><br />
        <div id="people" role="tablist" aria-multiselectable="true">
          {this.state.actions.map(p => <ActionItem key={p._id} data={p} />)}
        </div>
      </ListContainer>
    );
  }
}
