import { Component } from 'react';
import styled from 'styled-components';

import Availability from './Availability';
import People from './People';
import Actions from './Actions';
import Location from './Location';
import Roles from './Roles';

const ContentWrapper = styled.div`
  margin-left: 15%;
  width: 85%;
  height: calc(100vh - 150px);
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
      case 'Prebivališta':
        return <Location />;
      case 'Spašavatelj':
        return <People />;
      case 'Akcije':
        return <Actions />;
      case 'Šifrarnici':
        return <Roles />;
      default: return <Availability />;
    }
  }

  render() {
    return (
      <ContentWrapper>{this.chooseContentView()}</ContentWrapper>
    );
  }
}
