import { Component } from 'react';
import styled from 'styled-components';

import Availability from './Availability';
import People from './People';
import Actions from './Actions';
import Location from './Location';

const ContentWrapper = styled.div`
  margin-left: 15%;
  width: 85%;
  height: 100vh;
  padding: 20px;
  background-color: whitesmoke;
  overflow: auto;
`;

export default class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  chooseContentView() {
    switch (this.props.view) {
      case 'Lokacija':
        return <Location />;
      case 'Spasitelj':
        return <People />;
      case 'Akcije':
        return <Actions />;
      case 'Šifrarnici':
        return <div />;
      default: return <Availability />;
    }
  }

  render() {
    return (
      <ContentWrapper>{this.chooseContentView()}</ContentWrapper>
    );
  }
}
