import { Component } from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  background-color: #f1f3ce;
  height: 20%;
  font-size: 20px;
  border-bottom: 1px solid #a5a5a5;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #1e656d;
    color: white;
  }
`;

const Name = styled.div`
  font-size: larger;
  height: initial;
  text-align: center;
`;

const Icon = styled.img`
  float: left;
  max-width: 50px;
  margin-left: 30px;
`;

export default class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ItemWrapper onClick={() => { this.props.click(this.props.children) }}>
        <Icon src={`/static/img/${this.props.icon}`} />
        <Name>{this.props.children}</Name>
      </ItemWrapper>
    );
  }
}
