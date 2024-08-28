import PatternSide from "../components/PatternsSide";
import Pattern from "../components/Pattern";
import { Row, Col } from "react-bootstrap";
import { useBoundStore } from "../store/useBoundStore";
import { useLayoutEffect } from "react";

export default function Patterns() {
  const { savedPatterns } = useBoundStore(state => state)
  const setStarted = useBoundStore(state => state.setStarted)

  useLayoutEffect(() => {
    setStarted(false);
  }, [setStarted]);

  return (
    <main className='patterns'>
      <Row>
        <Col xs={12} lg={3} className='sidebar-wrapper'>
          <PatternSide/>
        </Col>
        <Col xs={12} lg={9} className='patterns-wrapper'>
          {savedPatterns.map((pattern, index) => (
            pattern ?
              <Pattern key={index} pattern={pattern} index={index}/> :
              null
          ))}
        </Col>
      </Row>
    </main>
  );
}
