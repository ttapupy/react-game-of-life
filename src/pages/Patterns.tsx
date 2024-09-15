import { useLayoutEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Pattern from "../components/Pattern";
import PatternSide from "../components/PatternsSide";
import { setStarted } from "@/store/gameSlice";
import type { RootState } from "@/store/store";

export default function Patterns() {
  const dispatch = useDispatch();

  const savedPatterns = useSelector((state: RootState) => state.savedPatterns);

  useLayoutEffect(() => {
    dispatch(setStarted(false));
  }, [setStarted]);

  return (
    <main className="patterns">
      <Row>
        <Col xs={12} lg={3} className="sidebar-wrapper">
          <PatternSide />
        </Col>
        <Col xs={12} lg={9} className="patterns-wrapper">
          {savedPatterns.map((pattern, index) =>
            pattern ? <Pattern key={index} pattern={pattern} index={index} /> : null,
          )}
        </Col>
      </Row>
    </main>
  );
}
