import style from './Product.module.css';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProductInBasket } from '../store/reducers/products';
import uuid from 'react-uuid';
import Header from '../components/elements/Header';
import Button from '../components/ui/Button';

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const products = useSelector(state => state.products.products);

  const product = products.find(p => p.id === Number(id));

  document.title = product.title;

  const addProduct = () => {
    const item = Object.assign({
      idUnic: uuid(),
    }, product);

    dispatch(addProductInBasket(item));
  };

  let isAuthorized = JSON.parse(localStorage.getItem('isAuthorized')) || false;

  const goHome = () => navigate('/');

  useEffect(() => {
    if (!isAuthorized) goHome();
  }, []);

  return (
    <div className={style.product}>
      <Header type="product" />

      <main className={style.product__main}>
        <img className={style.product__img} src={product.urlBig} alt={product.imgDescription} />
        <div>
          <h1 className={style.product__title}>{product.title}</h1>
          <p className={style.product__description}>{product.descriptionFull}</p>
          <div className={style.product__footer}>
            <span className={style.product__footerPrice}>{product.price.toLocaleString('ru-RU')} ₽ </span>
            <span className={style.product__footerWeight}>/ {product.weight}</span>

            <Button
              text='В корзину'
              backgroundColor='#D58C51'
              callback={addProduct}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Product;
