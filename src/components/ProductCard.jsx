import { HeartIcon } from './Icons';

const money = (amount) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);

export default function ProductCard({ product, isFavorite, toggleFavorite, addToCart }) {
  return (
    <article className="product-card" key={product.id}>
      <div className={`product-image ${product.tone}`}>
        <img src={`/images/products/${product.image}`} alt={product.name} loading="lazy" />
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          className={isFavorite ? 'favorite-button is-favorite' : 'favorite-button'}
          type="button"
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(product.id)}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <div className="product-details">
        <div className="product-maker">
          {product.maker} <span>·</span> <span className="rating">★ {product.rating}</span>
        </div>
        <div className="product-name-row">
          <h3>{product.name}</h3>
          <span className="product-price">{money(product.price)}</span>
        </div>
        <button className="add-button" type="button" onClick={() => addToCart(product)}>
          <span>Add to cart</span>
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </article>
  );
}
