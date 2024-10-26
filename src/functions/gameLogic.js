const fealdMap = Array(6).fill([]);
let candelsMap = null;
let movedEl = null;
let candelInstans = null;

function initBoardMap(candelList = []) {
  fealdMap.forEach((it, i) => {
    fealdMap[i] = Array(6).fill(0);
  });
  candelsMap = candelList.map((it) => ({ ...it }));

  candelList.forEach((candel) => {
    if (candel.isVertical) {
      for (let j = candel.yCell; j < candel.yCell + candel.size; j++) {
        fealdMap[candel.xCell][j] = 1;
      }
    } else {
      for (let i = candel.xCell; i < candel.xCell + candel.size; i++) {
        fealdMap[i][candel.yCell] = 1;
      }
    }
  });
}

class Candel {
  constructor(_candelEl, _candelData, _touchX, _touchY) {
    this.candelEl = _candelEl;
    this.boardWidth = _candelEl.parentElement.clientWidth;
    this.isVertical = _candelData.isVertical;
    this.topOffset = Math.floor((_candelData.yCell * this.boardWidth) / 6);
    this.leftOffset = Math.floor((_candelData.xCell * this.boardWidth) / 6);
    this.candelData = _candelData;
    this.candelSize = _candelData.size - 1;
    this.x1 = _candelData.xCell;
    this.x2 = _candelData.xCell + (this.isVertical ? 0 : this.candelSize);
    this.y1 = _candelData.yCell;
    this.y2 = _candelData.yCell + (this.isVertical ? this.candelSize : 0);
    this.touchX = _touchX;
    this.touchY = _touchY;
    this.minLimitX = 0;
    this.maxLimitX = 0;
    this.minLimitY = 0;
    this.maxLimitY = 0;
    this.deltaMove = 0;
    this.newOffset = 0;
  }

  setLimits(_fealdMap) {
    if (this.isVertical) {
      let topCell = this.y1;
      let bottomCell = this.y2;
      for (let j = this.y1 - 1; j >= 0 && _fealdMap[this.x1][j] === 0; j--) {
        topCell = j;
      }
      for (let j = this.y2 + 1; j < 6 && _fealdMap[this.x1][j] === 0; j++) {
        bottomCell = j;
      }
      this.minLimitY = (topCell * this.boardWidth) / 6;
      this.maxLimitY = ((bottomCell - this.candelSize) * this.boardWidth) / 6;
    } else {
      let leftCell = this.x1;
      let rightCell = this.x2;
      for (let i = this.x1 - 1; i >= 0 && _fealdMap[i][this.y1] === 0; i--) {
        leftCell = i;
      }
      for (let i = this.x2 + 1; i < 6 && _fealdMap[i][this.y1] === 0; i++) {
        rightCell = i;
      }
      this.minLimitX = (leftCell * this.boardWidth) / 6;
      this.maxLimitX = ((rightCell - this.candelSize) * this.boardWidth) / 6;
    }
  }

  move(_clientX, _clientY) {
    if (this.isVertical) {
      this.deltaMove = _clientY - this.touchY;
      this.newOffset = Math.min(
        this.maxLimitY,
        Math.max(this.minLimitY, this.topOffset + this.deltaMove)
      );
      this.candelEl.style.top = this.newOffset + 'px';
    } else {
      this.deltaMove = _clientX - this.touchX;
      this.newOffset = Math.min(
        this.maxLimitX,
        Math.max(this.minLimitX, this.leftOffset + this.deltaMove)
      );
      this.candelEl.style.left = this.newOffset + 'px';
    }
  }

  cancelMove(_fieldMap) {
    const newPosition = Math.round((6 * this.newOffset) / this.boardWidth);
    if (this.isVertical) {
      this.candelData.yCell = newPosition;
      this.candelEl.style.top = `${(newPosition * 100) / 6}%`;
    } else {
      this.candelData.xCell = newPosition;
      this.candelEl.style.left = `${(newPosition * 100) / 6}%`;
    }
    this._editFieldMap(_fieldMap, this.x1, this.y1, 0);
    this._editFieldMap(
      _fieldMap,
      this.candelData.xCell,
      this.candelData.yCell,
      1
    );
  }

  _editFieldMap(fieldMap, leftCellId, topCellId, flagValue) {
    if (this.isVertical) {
      for (let j = topCellId; j <= topCellId + this.candelSize; j++) {
        fieldMap[leftCellId][j] = flagValue;
      }
    } else {
      for (let i = leftCellId; i <= leftCellId + this.candelSize; i++) {
        fieldMap[i][topCellId] = flagValue;
      }
    }
  }
}

function onTouchStart(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('candel')) {
    return;
  }
  movedEl = evt.target;
  candelInstans = new Candel(
    movedEl,
    candelsMap[movedEl.dataset.index],
    evt.touches[0].clientX,
    evt.touches[0].clientY
  );
  candelInstans.setLimits(fealdMap);

  movedEl.addEventListener('touchmove', onTouchMove, false);
  movedEl.parentElement.addEventListener('touchend', onTouchEnd, false);
}

function onTouchMove(evt) {
  evt.preventDefault();
  candelInstans.move(evt.touches[0].clientX, evt.touches[0].clientY);
}

function onTouchEnd(evt) {
  candelInstans.cancelMove(fealdMap);
  candelInstans = null;
  movedEl.removeEventListener('touchmove', onTouchMove);
  movedEl.parentElement.removeEventListener('touchend', onTouchEnd);
}

export default initBoardMap;
export { onTouchStart, onTouchMove };
