import style from './HeaderBasket.module.css';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { removeCurrentUser, setAuth } from '../../store/reducers/auth';
import { removeAllProducts } from '../../store/reducers/products';
import Button from '../ui/Button';
import BasketButton from '../ui/BasketButton';

export default function HeaderBasket() {
  const { count, sum } = useSelector(state => state.products);
  const dispatch = useDispatch();

  const exit = () => {
    dispatch(setAuth(false));
    dispatch(removeCurrentUser());
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