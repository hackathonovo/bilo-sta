import { Component } from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
   background-color: red;
   height: 20%;
   font-size: 20px;
   border-bottom: 1px solid green;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const Name = styled.div`
  font-size: larger;
  padding-left: 30px;
  height: initial;
`;

const Icon = styled.img`
  float: left;
  max-width: 50px;
`;

export default class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <ItemWrapper>
        <Icon src={`/static/img/${this.props.icon}`} />
        <Name>{this.props.children}</Name>
      </ItemWrapper>
    );
  }
}
