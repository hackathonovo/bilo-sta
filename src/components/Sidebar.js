import { Component } from 'react';
import styled from 'styled-components';

import Item from './Item';

const SidebarContainer = styled.div`
  min-height: 100%;
  width: 20%;
  min-width: 50px;
  float: left;
`;

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SidebarContainer>
        {Object.keys(this.props.items).map(item => <Item key={item} subItems={this.props.items[item].subItems} icon={this.props.items[item].icon}>{item}</Item>)}
      </SidebarContainer>
    );
  }
}
