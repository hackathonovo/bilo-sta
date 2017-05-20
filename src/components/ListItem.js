import { Component } from 'react';
import styled from 'styled-components';

const HiddenLink = styled.a`
  text-decoration: none;
  color: black;
  
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
  padding: 5px;
  width: calc(100% - 150px);
`;

const Label = styled.label`
  font-weight: bold;
  width: 150px;
`;

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = { data: this.props.data };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const newState = { ...this.state };
    newState.data[e.target.name] = e.target.value;

    this.setState(newState);
  }

  render() {
    const data = this.state.data;
    console.log(data);

    return (
      <div className="card height-fix cursor">
        <HiddenLink data-toggle="collapse" data-parent="#people" href={`#colapse-${data._id}`} aria-expanded="true" aria-controls={`colapse-${data._id}`}>
          <div className="card-header" role="tab" id={data._id}>
            <h5 className="mb-0">
              {`${data.firstname} ${data.lastname}`}
            </h5>
          </div>
        </HiddenLink>

        <div id={`colapse-${data._id}`} className="collapse" role="tabpanel" aria-labelledby={data._id}>
          <div className="card-block">
            <FieldContainer><Label>Ime:&nbsp;</Label><Input name="firstname" type="text" value={data.firstname} onChange={this.handleInputChange} /></FieldContainer>
            <FieldContainer><Label>Prezime:&nbsp;</Label><Input name="lastname" type="text" value={data.lastname} onChange={this.handleInputChange} /></FieldContainer>
            <FieldContainer><Label>E-mail:&nbsp;</Label><Input name="mail" type="text" value={data.mail} onChange={this.handleInputChange} /></FieldContainer>
            <FieldContainer><Label>Broj mobitela&nbsp;</Label><Input name="phoneNumber" type="text" value={data.phoneNumber} onChange={this.handleInputChange} /></FieldContainer>
            {/*<FieldContainer><Label>Specijalnosti&nbsp;</Label><Input type="text" value={data.profession} onChange={this.handleInputChange} /></FieldContainer>*/}
            {/*<FieldContainer><Label>Uloga&nbsp;</Label><Input type="text" value={data.role} onChange={this.handleInputChange} /></FieldContainer>*/}
            {/*<FieldContainer><Label>Ima smartphone&nbsp;</Label><Input type="checkbox" checked data-toggle="toggle" onChange={this.handleInputChange} /></FieldContainer>*/}
          </div>
        </div>
      </div>
    );
  }
}
