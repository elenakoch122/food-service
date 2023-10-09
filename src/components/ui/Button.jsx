import style from './Button.module.css';

function Button({ text, backgroundColor, callback = null }) {
  let classes;
  if (backgroundColor === '#D58C51') {
    classes = `${style.button} ${style.button_orange}`;
  }

  if (backgroundColor === 'transparent') {
    classes = `${style.button} ${style.button_transparent}`;
  }

  return (
    <button
      className={classes}
      onClick={callback}
    >
      {text}
    </button>
  );
}

export default Button;
