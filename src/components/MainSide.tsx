import { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import ButtonGroup from './ButtonGroup';
import Description from './Description';


const MainSide = memo(() => {

  return (
    <div id='main-side'>
      <Row className='sidebar-wrapper gx-0'>
        <Col role='navigation'
             className='sidebar-content d-flex flex-sm-column align-items-center justify-content-center'
             sx={{span: 10, offset: 1}} sm={{span: 8, offset: 2}} md={{span: 6, offset: 3}}>
          <ButtonGroup/>
        </Col>
      </Row>
      <Row className='desktop-desc'>
        <Col>
          <Description/>
        </Col>
      </Row>
    </div>
  )
})

export default MainSide;