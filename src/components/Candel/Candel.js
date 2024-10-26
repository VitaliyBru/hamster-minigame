import './candel.scss';

function Candel(props) {
  const { data, index } = props;

  const orientationClass = `candel__${
    data.isVertical ? 'vertical' : 'horizontal'
  }`;
  const className = data.isKey
    ? 'candel candel__key'
    : `candel ${orientationClass} ${orientationClass}--${data.size}`;
  const style = {
    top: `${(data.yCell * 100) / 6}%`,
    left: `${(data.xCell * 100) / 6}%`,
  };

  return <div className={className} style={style} data-index={index}></div>;
}

export default Candel;
