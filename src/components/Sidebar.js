import { Component } from 'react';
import styled from 'styled-components';

import Item from './Item';

const SidebarContainer = styled.div`
  height: calc(100vh - 150px);
  width: 15%;
  min-width: 100px;
  float: left;
`;

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: 'Raspoloživost' };
  }

  renderSidebarItems() {
    const items = Object.keys(this.props.items).map(item => {
      if (this.props.selected === item) {
        return <Item click={this.props.click} style={{ backgroundColor: '#123456' }} key={item} icon={this.props.items[item].icon}>{item}</Item>
      }

      return <Item click={this.props.click} key={item} icon={this.props.items[item].icon}>{item}</Item>
    });

    return items;
  }

  render() {
    return (
      <SidebarContainer>
        {this.renderSidebarItems()}
      </SidebarContainer>
    );
  }
}
