import { Status } from "../../../constants";
import { useAppContext } from "../../../contexts/Context";
import { setupNewGame } from "../../../reducer/actions/game";
import { WK, BK } from "../../../assets/SVGs";
import "./GameEnds.css";

const GameEnds = ({ onClosePopup }) => {
  const {
    appState: { status },
    dispatch,
  } = useAppContext();

  if (status === Status.ongoing || status === Status.promoting) return null;

  const newGame = () => {
    dispatch(setupNewGame());
  };

  const isWin = status.endsWith("wins");

  return (
    <div className="popup--inner popup--inner__center">
      <h1>{isWin ? status : "Draw"}</h1>
      <p>{!isWin && status}</p>
      <div>{status.startsWith("White") && <WK />}</div>
      <div>{status.startsWith("Black") && <BK />}</div>
      {!isWin && (
        <div>
          <WK />
          <BK />
        </div>
      )}
      <button onClick={newGame}>New Game</button>
    </div>
  );
};

export default GameEnds;
