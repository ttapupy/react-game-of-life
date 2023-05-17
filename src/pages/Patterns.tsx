import PatternSide from '../components/PatternsSide';
import { useBoardContext } from '../BoardContext.ts';
import Pattern from '../components/Pattern';
import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';



export default function Patterns() {
  const { savedPatterns, setStarted }: { savedPatterns: number[][][], setStarted: React.Dispatch<React.SetStateAction<boolean>> } = useBoardContext()

  useEffect(() => {
    setStarted(false)
  }, [setStarted])

  return (
    <Row>
      <Col xs={12} lg={3} className='sidebar-wrapper'>
        <PatternSide />
      </Col>
      <Col xs={12} lg={9} className='patterns-wrapper'>

        {savedPatterns.map((pattern, index) => <Pattern key={index} pattern={pattern} index={index} />)}

      </Col>
    </Row>
  );
}