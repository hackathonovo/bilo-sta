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

export default class KeyItem extends Component {
  constructor(props) {
    super(props);

    this.state = { data: this.props.data };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderAcordion = this.renderAcordion.bind(this);
  }

  handleInputChange(e) {
    this.setState({ ...this.state, data: e.target.value });
  }

  saveChanges(id) {
    console.log({ rolesList: id });

    postJSON('api/roles', { rolesList: id }, (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  }

  renderAcordion(data) {
    if (!this.props.condensed) {
      return (
        <div id={`colapse-${data}`} className="collapse" role="tabpanel" aria-labelledby={data}>
          <div className="card-block">
            <FieldContainer>
              <Label>Uloga:&nbsp;</Label>
              <Input name="role" value={data} onChange={this.handleInputChange} />
            </FieldContainer>
            <Button className="btn btn-success" onClick={e => this.saveChanges(data)} ><Icon alt="save" src="static/img/save.png" />&nbsp;&nbsp;Spremi</Button>
          </div>
        </div>);
    }
  }

  render() {
    const data = this.state.data;

    return (
      <div className="card height-fix cursor">
        <HiddenLink data-toggle="collapse" data-parent="#people" href={`#colapse-${data}`} aria-expanded="true" aria-controls={`colapse-${data}`}>
          <div className="card-header" role="tab" id={data}>
            <h5 className="mb-0">
              {data}
            </h5>
          </div>
        </HiddenLink>
        {this.renderAcordion(data)}
      </div>
    );
  }
}
