import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Product } from '../types/product';

const ProductPage: FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
  
    useEffect(() => {
      axios.get<Product>(`https://fakeapi.platzi.com/products/${productId}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error(error));
    }, [productId]);
  
    if (!product) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    );
  };
  export default ProductPage