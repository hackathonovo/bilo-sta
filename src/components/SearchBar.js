import { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  padding: 5px;
  border: 1px solid #ddd;
  display: inline-block;
`;

const Input = styled.input`
  border: 0;
  border-radius: 0;
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const Button = styled.button`
  display: inline-block;
  border-radius: none;
  margin-bottom: 1px;
`;

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        <Container>
          <Input type="text" placeholder="Search"/>
        </Container>
        <Button className="btn btn-primary">Go</Button>
      </div>
    );
  }
}
