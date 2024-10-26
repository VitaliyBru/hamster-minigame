import { useRef, useEffect } from 'react';
import './board.scss';
import Candel from '../Candel/Candel';
import { onTouchStart } from '../../functions/gameLogic';
import initBoardMap from '../../functions/gameLogic';

function Board(props) {
  const { dataList } = props;
  initBoardMap(dataList);
  const boardEl = useRef(null);
  useEffect(() => {
    !!boardEl.current &&
      boardEl.current.addEventListener('touchstart', onTouchStart, false);
  }, []);

  return (
    <div className='board' ref={boardEl}>
      {!!dataList &&
        dataList.map((data, i) => {
          return <Candel data={data} index={i} key={i} />;
        })}
    </div>
  );
}

export default Board;
