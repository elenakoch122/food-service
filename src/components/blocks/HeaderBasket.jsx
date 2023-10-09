import style from './HeaderBasket.module.css';
import Button from '../ui/Button';
import BasketButton from '../ui/BasketButton';
import { removeAllProducts } from '../../store/reducers/products';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

function HeaderBasket() {
  const count = useSelector(state => state.products.count);
  const sum = useSelector(state => state.products.sum);
  const dispatch = useDispatch();

  const exit = () => {
    localStorage.setItem('isAuthorized', false);
    dispatch(removeAllProducts());
  }

  return (
    <div className={style.header__basket}>
      <div className={style.header__basketInfo}>
        <p className={style.header__basketInfoItem}>{count} товара</p>
        <p className={style.header__basketInfoItem}>на сумму {sum.toLocaleString('ru-RU')} ₽</p>
      </div>

      <Link to={'/basket'}>
        <BasketButton />
      </Link>

      <Link to={'/'}>
        <Button
          text='Выйти'
          backgroundColor='transparent'
          callback={exit}
        />
      </Link>
    </div>
  );
}

export default HeaderBasket;
