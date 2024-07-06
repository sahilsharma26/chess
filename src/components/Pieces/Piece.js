import arbiter from "../../arbiter/arbiter";

import * as SVGs from "../../assets/SVGs";
import { useAppContext } from "../../contexts/Context";
import { generateCandidates } from "../../reducer/actions/move";

const Piece = ({ rank, file, piece }) => {
  const { appState, dispatch } = useAppContext();
  const { turn, castleDirection, position: currentPosition } = appState;

  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);

    if (turn === piece[0]) {
      const candidateMoves = arbiter.getValidMoves({
        position: currentPosition[currentPosition.length - 1],
        prevPosition: currentPosition[currentPosition.length - 2],
        castleDirection: castleDirection[turn],
        piece,
        file,
        rank,
      });
      dispatch(generateCandidates({ candidateMoves }));
    }
  };
  const onDragEnd = (e) => {
    e.target.style.display = "block";
  };

  const Pieces = {
    wk: SVGs.WK,
    wq: SVGs.WQ,
    wr: SVGs.WR,
    wb: SVGs.WB,
    wn: SVGs.WN,
    wp: SVGs.WP,
    bk: SVGs.BK,
    bq: SVGs.BQ,
    br: SVGs.BR,
    bb: SVGs.BB,
    bn: SVGs.BN,
    bp: SVGs.BP,
  };

  const SVG = Pieces[piece];

  return (
    <div
      className={`piece p-${file}${rank}`}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SVG />
    </div>
  );
};

export default Piece;
