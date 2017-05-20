import { Component } from 'react';

import Sidebar from './Sidebar';
import Content from './Content';

const adminItems = {
  Raspoloživost: { subItems: ['Novi unos', 'Pregled'], icon: 'availability.png' },
  Lokacija: { subItems: ['Novi unos', 'Pregled'], icon: 'location.png' },
  Spasitelj: { subItems: ['Novi unos', 'Uređivanje'], icon: 'profile.png' },
  Akcije: { subItems: ['Uređivanje', 'Pregled'] , icon: 'action.png' },
  Šifrarnici: { subItems: ['Novi unos', 'Pregled'], icon: 'key.png' },
};

export default class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { item: 'Raspoloživost' };

    this.changeSidebarItem = this.changeSidebarItem.bind(this);
  }

  changeSidebarItem(item) {
    this.setState({ ...this.state, item });
  }

  render() {
    return (
      <div id="main">
        <Sidebar items={adminItems} click={this.changeSidebarItem} selected={this.state.item} />
        <Content view={this.state.item} />
      </div>
    );
  }
}
