import style from './Button.module.css';

export default function Button({
  type = 'rectangle',
  text,
  backgroundColor = 'transparent',
  borderColor = 'orange',
  color = 'orange',
  callback = null,
  width = null,
}) {
  const classes = `
    ${style.button}
    ${style[`button_${type}`]}
    ${style[`button_bgc-${backgroundColor}`]}
    ${style[`button_bdc-${borderColor}`]}
    ${style[`button_color-${color}`]}
  `;

  return (
    <button
      className={classes}
      onClick={callback}
      style={width && {
        width: `${width}px`,
        height: `${width}px`,
      }}
    >
      {text}
    </button>
  );
}