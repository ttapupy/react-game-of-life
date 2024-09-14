import { Link } from "react-router-dom";

const PatternSide = () => {
  const selection = (
    <div className="description selection">{`You can choose and load from here one of your favorite patterns.`}</div>
  );

  return (
    <div className="sidebar-content d-flex flex-column align-items-center justify-content-center">
      <aside>
        <small>{selection}</small>
      </aside>

      <div className="p-4 px-lg-1">
        <span>
          <Link to={"/"}>
            <button className="py-0 my-0">{"Back to Game Board"}</button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PatternSide;
