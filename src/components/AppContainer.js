import { Component } from 'react';

import Sidebar from './Sidebar';
import Content from './Content';

const adminItems = {
  Raspoloživost: { subItems: ['Novi unos', 'Pregled'], icon: 'availability.png' },
  Lokacija: { subItems: ['Novi unos', 'Pregled'], icon: 'location.png' },
  Spašavatelji: { subItems: ['Novi unos', 'Uređivanje'], icon: 'profile.png' },
  Akcije: { subItems: ['Uređivanje', 'Pregled'] , icon: 'action.png' },
  Šifrarnici: { subItems: ['Novi unos', 'Pregled'], icon: 'key.png' },
};

export default class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Sidebar items={adminItems} />
        <Content />
      </div>
    );
  }
}
