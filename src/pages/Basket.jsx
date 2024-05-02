import style from './Basket.module.css';
import Button from '../components/ui/Button';
import ButtonRound from '../components/ui/ButtonRound';
import BasketCard from '../components/elements/BasketCard';
import { icons } from '../icons';
import { removeAllProducts } from '../store/reducers/products';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Basket() {
  document.title = 'Корзина';

  const productsBasket = useSelector(state => state.products.basketProducts);
  const sum = useSelector(state => state.products.sum);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let isAuthorized = JSON.parse(localStorage.getItem('isAuthorized')) || false;

  const goHome = () => navigate('/');

  const exit = () => {
    localStorage.setItem('isAuthorized', false);
    dispatch(removeAllProducts());
    goHome();
  };

  const order = () => {
    localStorage.setItem('isOrdered', true);
    dispatch(removeAllProducts());
    goHome();
  };

  useEffect(() => {
    if (!isAuthorized) goHome();
  }, []);

  return (
    <div className={style.basket}>
      <header className={style.basket__header}>
        <ButtonRound
          icon={icons.arrowBack}
          color="#D58C51"
          width="32"
          callback={() => navigate(-1)}
        />

        <h1 className={style.basket__title}>Корзина с выбранными товарами</h1>

        <Button
          text='Выйти'
          backgroundColor='transparent'
          callback={exit}
        />
      </header>

      <main className={style.basket__content}>
        <div className={style.basket__wrapper}>
          <ul className={style.basket__list}>

            {productsBasket.map(product => (
              <li className={style.basket__item} key={product.idUnic}>
                <BasketCard product={product} />
              </li>
            ))}

          </ul>
        </div>
      </main>

      <footer className={style.basket__footer}>
        <div className={`${style.basket__wrapper} ${style.flexbox}`}>
          <p className={style.basket__footerMsg}>
            Заказ на сумму:&nbsp;
            <span className={style.basket__footerTotal}>{sum.toLocaleString('ru-RU')} ₽</span>
          </p>
          <Button
            text='Оформить заказ'
            backgroundColor='#D58C51'
            callback={order}
          />
        </div>
      </footer>
    </div>
  );
}

export default Basket;
