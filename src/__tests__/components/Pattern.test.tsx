import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { BoardContext } from "../../BoardContext";
import Pattern from "../../components/Pattern";

const pattern = [
  [0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 1, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const setStarted = jest.fn();
const setActive = jest.fn();
const setLoaded = jest.fn();
const setBoard = jest.fn();
const setRound = jest.fn();

const patternContext = {setStarted, setActive, setLoaded, setBoard, setRound, rows: 60, columns: 54, drawSize: 10};

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

function renderPattern(patternContext) {
  return render(
    <BrowserRouter>
      <BoardContext.Provider value={patternContext}>
        <Pattern pattern={pattern} index={0}/>
      </BoardContext.Provider>
    </BrowserRouter>
  );
}

describe("Pattern", () => {
  it("renders the saved pattern and navigates to the main page on click", async () => {
    renderPattern(patternContext);

    const loadButton = screen.getByRole("button", {name: /Load/i});
    expect(loadButton).toBeInTheDocument();

    await userEvent.click(loadButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
