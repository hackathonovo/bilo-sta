import { Component } from 'react';
import styled from 'styled-components';

import { getJSON } from '../helpers';

const Title = styled.h1`
  text-align: left;
  font-size: 40px;
  font-weight: 300;
  width: calc(100% - 200px);
  padding-bottom: 20px;
`;

let map;
let center;

const renderMap = () => {
  center = new google.maps.LatLng(44.9, 15.9799927);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center,
  });
};

export default class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    getJSON('/api/locations', (err, locations) => {
      if (err) {
        console.error(err);
        return;
      }

      this.setState({ ...this.state, locations });
    });
  }

  componentDidUpdate() {
    if (this.state.locations) {
      renderMap();

      this.state.locations.forEach(user => {
        if (user.address.coords) {
          const infoWindow = new google.maps.InfoWindow({
            content: `${user.firstname} ${user.lastname} - ${user.phoneNumber}`
          });

          const marker = new google.maps.Marker({
            position: { lat: user.address.coords[1], lng: user.address.coords[0] },
            map,
          });

          google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker);
          });
       }
      });
    }
  }

  render() {
    console.log(this.state.locations);

    if (!this.state.locations) {
      return null;
    }

    return (
      <div>
        <Title>Prebivališta spašavatelja</Title>
        <div id="map"></div>
      </div>
    );
  }

}
