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

const Input = styled.textarea`
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

export default class ActionItem extends Component {
  constructor(props) {
    super(props);

    this.state = { data: this.props.data };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderAcordion = this.renderAcordion.bind(this);
  }

  handleInputChange(e) {
    const newState = { ...this.state };
    newState.data.details = e.target.value;

    this.setState(newState);
  }

  saveChanges(id) {
    postJSON(`api/action/${id}`, this.state.data, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  renderAcordion(data) {
    if (!this.props.condensed) {
      return (
        <div id={`colapse-${data._id}`} className="collapse" role="tabpanel" aria-labelledby={data._id}>
          <div className="card-block">
            <FieldContainer>
              <Label>Opis:&nbsp;</Label>
              <Input name="details" value={data.details} onChange={this.handleInputChange} />
            </FieldContainer>
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
              {data.title}
            </h5>
          </div>
        </HiddenLink>
        {this.renderAcordion(data)}
      </div>
    );
  }
}
