import { Component } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 150px;
  background-color: #1e656d;
  padding: 20px;
  border-bottom: 1px solid white
`;

const Logo = styled.img`
  height: 110px;
  width: 110px;
`;

const Text = styled.span`
  padding: 20px 20px 20px 20px;
  font-size: 45px;
  float: right;
  color: white;
`;

export default class Header extends Component {
  render() {
    return (
      <HeaderWrapper><Logo src="static/img/hgss-logo.png" alt="HGSS"/><Text>Hrvatska gorska služba spašavanja</Text></HeaderWrapper>
    );
  }
}
