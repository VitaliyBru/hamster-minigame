import Board from '../Board/Board';
// import { useState, useEffect } from 'react';
// import getPageData from '../../functions/getPageData';
// import { getBestInvest } from '../../functions/getBestInvest';
// import updateCardValue from '../../functions/updateCardValue';
// import TabsHeader from '../TabsHeader/TabsHeader';
// import Cards from '../Cards/Cards';
import './app.scss';

const dataList = [
  { isVertical: false, xCell: 1, yCell: 2, size: 2, isKey: true },
  { isVertical: false, xCell: 0, yCell: 5, size: 2, isKey: false },
  { isVertical: false, xCell: 2, yCell: 4, size: 2, isKey: false },
  { isVertical: false, xCell: 3, yCell: 0, size: 3, isKey: false },
  { isVertical: true, xCell: 0, yCell: 0, size: 3, isKey: false },
  { isVertical: true, xCell: 3, yCell: 1, size: 3, isKey: false },
  { isVertical: true, xCell: 2, yCell: 0, size: 2, isKey: false },
  { isVertical: true, xCell: 1, yCell: 3, size: 2, isKey: false },
  { isVertical: true, xCell: 4, yCell: 3, size: 2, isKey: false },
  { isVertical: true, xCell: 5, yCell: 1, size: 2, isKey: false },
  { isVertical: true, xCell: 5, yCell: 3, size: 2, isKey: false },
];

function App() {
  //const bestInvest = getBestInvest();
  //const [pageData, setPageData] = useState({});
  // const [activTabId, setActivTabId] = useState(0);

  // const tabClickHandler = (activeId) => {
  //   setActivTabId(activeId);
  // };

  // const valueSubmitHandler = (cardId, incom, price) => {
  //   updateCardValue(pageData.tabsData, activTabId, cardId, incom, price);
  //   setPageData(Object.assign({}, pageData));
  // };

  // useEffect(() => {
  //   getPageData(setPageData, 'cards.json');
  // }, []);

  return (
    <div className='app'>
      <Board dataList={dataList} />
    </div>
  );
}

export default App;
