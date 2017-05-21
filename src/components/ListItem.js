import { Component } from 'react';
import styled from 'styled-components';

import { getJSON, postJSON } from '../helpers';

const HiddenLink = styled.a`
  text-decoration: none;
  color: black;
  text-align: left;
  
  &:hover, &:focus {
    text-decoration: none;
    color: black;
  }
`;

const FieldContainer = styled.div`
  padding: 5px;
  width: 100%;
`;

const Input = styled.input`
  width: calc(100% - 150px);
`;

const Label = styled.label`
  font-weight: bold;
  width: 150px;
  float: left;
`;

const Select = styled.select`
  width: calc(100% - 150px);
  padding: 5px;
  border-radius: 0;
  border: 1px solid #ccc; 
  background-color: white;
  padding: 2px;
`;

const Icon = styled.img`
  height: 23px;
  padding-bottom: 2px;
`;

const Button = styled.button`
  text-align: center;
  float: right;
  margin-bottom: 20px;
`;

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = { data: this.props.data, spec: this.props.data.profession.toString(), roles:[] };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderAcordion = this.renderAcordion.bind(this);
  }

  componentWillMount() {
    getJSON('/api/roles', (err, roles) => {
      if (err) {
        console.error(err);
        return;
      }

      this.setState({ ...this.state, roles: roles[0] });
    });
  }

  handleInputChange(e, isArray, isBoolean) {
    const newState = { ...this.state };

    if (isArray) {
      newState.spec = e.target.value;
    } else if (isBoolean) {
      newState.data[e.target.name] = !newState.data[e.target.name];
    } else if (e.target.name === 'address') {
      newState.data.address.addressname = e.target.value;
    } else {
      newState.data[e.target.name] = e.target.value;
    }

    this.setState(newState);
  }

  saveChanges(id) {
    const data = { ...this.state.data };
    data.profession = this.state.spec.split(',');
    data.password = data.username;
    delete data._id;

    if (id === 'new-person') {
      postJSON('/api/people', data, (err, res) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      postJSON(`api/people/${data.username}`, data, (err, res) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }

  renderAcordion(data) {
    if (!this.props.condensed) {
      return (
        <div id={`colapse-${data._id}`} className="collapse" role="tabpanel" aria-labelledby={data._id}>
          <div className="card-block">
            <FieldContainer><Label>Ime:&nbsp;</Label><Input name="firstname" type="text" value={data.firstname} onChange={this.handleInputChange} /></FieldContainer>
            <FieldContainer><Label>Prezime:&nbsp;</Label><Input name="lastname" type="text" value={data.lastname} onChange={this.handleInputChange} /></FieldContainer>
            <FieldContainer><Label>E-mail:&nbsp;</Label><Input name="mail" type="text" value={data.mail} onChange={this.handleInputChange} /></FieldContainer>
            <FieldContainer><Label>Broj mobitela:&nbsp;</Label><Input name="phoneNumber" type="text" value={data.phoneNumber} onChange={this.handleInputChange} /></FieldContainer>
            <FieldContainer><Label>Adresa:&nbsp;</Label><Input name="address" type="text" value={data.address.addressname} onChange={this.handleInputChange} /></FieldContainer>
            <FieldContainer><Label>Korisničko ime:&nbsp;</Label><Input name="username" type="text" value={data.username} onChange={this.handleInputChange} /></FieldContainer>
            <FieldContainer><Label>Specijalnosti:&nbsp;</Label><Input name="profession" type="text" value={this.state.spec} onChange={(e) => this.handleInputChange(e, true)} /></FieldContainer>
            <FieldContainer><Label>Uloga:&nbsp;</Label><Select name="role" value={data.role} onChange={this.handleInputChange}>{this.state.roles.map(role => <option value={role} key={role}>{role}</option>)}</Select></FieldContainer>
            <FieldContainer><Label>Ima smartphone:&nbsp;</Label><Input name="smartphone" className="narrow" checked={data.smartphone} type="checkbox" onChange={(e) => this.handleInputChange(e, false, true)} /></FieldContainer>
            <FieldContainer><Label>Slobodan:&nbsp;</Label><Input name="available" className="narrow" checked={data.available} type="checkbox" onChange={(e) => this.handleInputChange(e, false, true)} /></FieldContainer>
            <Button className="btn btn-success" onClick={e => this.saveChanges(data._id)} ><Icon alt="save" src="static/img/save.png" />&nbsp;&nbsp;Spremi promjene</Button>
          </div>
        </div>);
    }
  }

  render() {
    const data = this.state.data;

    return (
      <div className="card height-fix cursor">
        <HiddenLink data-toggle="collapse" data-parent="#people" href={`#colapse-${data._id}`} aria-expanded="true" aria-controls={`colapse-${data._id}`}>
          <div className="card-header" role="tab" id={data._id}>
            <h5 className="mb-0">
              {`${data.firstname} ${data.lastname}`}
            </h5>
          </div>
        </HiddenLink>
        {this.renderAcordion(data)}
      </div>
    );
  }
}
