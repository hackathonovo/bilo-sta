import { Component } from 'react';
import styled from 'styled-components';

import Availability from './Availability';
import People from './People';
import Actions from './Actions';

const ContentWrapper = styled.div`
  margin-left: 15%;
  width: 85%;
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
        return <div>Lokacija</div>;
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
