import style from './Card.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductInBasket } from '../../store/reducers/products';
import { icons } from '../../icons';
import uuid from 'react-uuid';
import Button from '../ui/Button';

function Card({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardInside = () => navigate(`/product/${product.id}`);

  const addProduct = (e) => {
    e.stopPropagation();

    const item = Object.assign({
      idUnic: uuid(),
    }, product);

    dispatch(addProductInBasket(item));
  };

  return (
    <div
      className={style.card}
      onClick={cardInside}
    >
      <div className={style.card__main}>
        <div className={style.card__img__wrapper}>
          <img className={style.card__img} src={product.url} alt={product.imgDescription} />
        </div>
        <h2 className={style.card__title}>{product.title}</h2>
        <p className={style.card__description}>{product.description}</p>
      </div>

      <div className={style.card__footer}>
        <div>
          <span className={style.card__footerPrice}>{product.price.toLocaleString('ru-RU')} ₽ </span>
          <span className={style.card__footerWeight}>/ {product.weight}</span>
        </div>

        <Button
          type="round"
          text={icons.add}
          borderColor="white"
          color="white"
          callback={addProduct}
          width="31"
        />
      </div>
    </div>
  );
}

export default Card;
