import HeaderBasket from '../blocks/HeaderBasket';
import style from './Header.module.css';

export default function Header({ type }) {
  return (
    <header className={style.header}>
      <h1 className={style.header__title}>Наша продукция</h1>
      <HeaderBasket />
    </header>
  );
}