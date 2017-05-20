import { Component } from 'react';
import styled from 'styled-components';

import Item from './Item';

const SidebarContainer = styled.div`
  min-height: 100%;
  width: 15%;
  min-width: 100px;
  float: left;
`;

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  renderSidebarItems() {
    const items = Object.keys(this.props.items).map(item => {
      if (this.props.selected === item) {
        // TODO mini items
        //return <MiniItem click={this.props.click} key={item} subItems={this.props.items[item].subItems} icon={this.props.items[item].icon}>{item}></MiniItem>
      }

      return <Item click={this.props.click} key={item} subItems={this.props.items[item].subItems} icon={this.props.items[item].icon}>{item}</Item>
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
