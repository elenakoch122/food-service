import style from './ButtonRound.module.css';

function ButtonRound({ icon, color, width, callback = null }) {
  let classes;
  if (color === '#fff') {
    classes = `${style.buttonRound} ${style.buttonRound_white}`;
  }

  if (color === '#D58C51') {
    classes = `${style.buttonRound} ${style.buttonRound_orange}`;
  }

  return (
    <button
      className={classes}
      style={{
        width: `${width}px`,
        height: `${width}px`,
      }}
      onClick={callback}
    >
      {icon}
    </button>
  );
}

export default ButtonRound;
