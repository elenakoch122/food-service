import style from './ProductsList.module.css';
import Card from '../elements/Card';
import { useSelector } from 'react-redux';

function ProductsList() {
  const products = useSelector(state => state.products.products);

  return (
    <main className={style.main}>
      {products.map(product => (
        <Card product={product} key={product.id} />
      ))}
    </main>
  );
}

export default ProductsList;
