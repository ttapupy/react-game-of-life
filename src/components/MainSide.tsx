import { Row, Col } from 'react-bootstrap';
import ButtonGroup from './ButtonGroup.tsx';
import Description from './Description.tsx';



const MainSide = () => {

  return (
    <div id='main-side'>
      <Row className='desktop-desc'>
        <Col className='d-flex justify-content-center'>
          <Description />
        </Col>
      </Row>
      <Row className='sidebar-wrapper gx-0'>
        <Col className='sidebar-content d-flex flex-column align-items-center justify-content-center' sx={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
          <ButtonGroup />
        </Col>
      </Row >
    </div>
  )
}

export default MainSide;