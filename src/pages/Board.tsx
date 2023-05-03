import React, { useState } from 'react';
import Cell from '../components/Cell';




const Board = () => {

  const [pressed, setPressed] = useState(false)

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <Cell pressed={pressed} setPressed={setPressed} />
      <Cell pressed={pressed} setPressed={setPressed} />
      <Cell pressed={pressed} setPressed={setPressed} />
      <Cell pressed={pressed} setPressed={setPressed} />
    </div>
  );
}

export default Board;