const Description = () => {
  return (
    <div >
      <aside><small>
        <div className='description'>
          {
            `You can draw a shape (initial pattern) in the grid with the mouse button pressed or tapping on cells one by one on mobile.
      When you are done, the process can be started.`}<br />
          {`It works based on the `} <b>{'Game of Life'}</b> {`rules, which you can read more about `}
          <span>
            <a style={{ textDecoration: 'underline' }} href={'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'} target={'_blank'}>{'here'}</a>
          </span>
          {`. `}<br />
          {'In current version it takes 10 rounds per start.'}<br />
          {'After that, the game can be continued from the existing pattern (if any), or even from a supplemented one.'}<br />
          {`Have fun!`}
        </div>
      </small>
      </aside>
    </div>
  )
}

export default Description;