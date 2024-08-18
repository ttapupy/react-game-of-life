import { memo } from 'react';
import { maxRounds } from "../constants";

const Description = memo(() => {
  return (
    <aside>
      <div className='description'>
        {
          `You can draw a shape (initial pattern) in the grid.
          When you are done, the process can be started.`}<br/>
        {`It works based on the `} <strong>{'Game of Life'}</strong> {`rules, which you can read more about `}
        <span>
          <a style={{textDecoration: 'underline'}} href={'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'}
             target={'_blank'} rel="noreferrer">{'here'}</a>
        </span>
        {`. `}<br/>
        {`In current version it takes ${maxRounds} rounds per start.`}<br/>
        {'After that, the game can be continued from the existing pattern (if any), or even from a supplemented one.'}<br/>
        {`Please note, that a board can be resized only when it is inactive (at the very beginning or after pressing `}
        <strong>{`clear/reset`} </strong>{`).`}
        <br/>
        {`Have fun!`}
      </div>
    </aside>
  )
})

export default Description;