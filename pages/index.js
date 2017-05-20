import styled from 'styled-components';

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

const Card = styled.div`

`;

export default () => <div>
  <FullCover />
  <div className="card">
    <div className="card-block">
      <h4 className="card-title">Special title treatment</h4>
      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>;
