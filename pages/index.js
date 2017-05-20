import styled from 'styled-components';

import Login from '../src/components/Login';

const FullCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(/static/img/cover.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

export default () => <div>
  <FullCover />
  <Login />
</div>;
