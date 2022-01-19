import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <>
      <div className="col-12">
        <div className="product-box product-wrap">
          <div className="img-wrapper">
            <div className="front">
              <Link href={`/${product.slug}`}>
                <a>
                  <img
                    src={product.media.featuredImage}
                    className="img-fluid blur-up lazyload bg-img"
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <div className="back">
              <Link href={`/${product.slug}`}>
                <a>
                  <img
                    src={product.media.featuredImage}
                    className="img-fluid blur-up lazyload bg-img"
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <div className="cart-info cart-wrap bg-color-cls sm-box">
              <button onClick="openCart()" title="Add to cart">
                <i className="ti-shopping-cart" />
              </button>
              <a href="true" title="Add to Wishlist">
                <i className="ti-heart" aria-hidden="true" />
              </a>
              <a
                href="true"
                data-bs-toggle="modal"
                data-bs-target="#quick-view"
                title="Quick View"
              >
                <i className="ti-search" aria-hidden="true" />
              </a>
              <a href="compare.html" title="Compare">
                <i className="ti-reload" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="product-detail">
            <div className="rating">
              <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
              <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
              <i className="fa fa-star" />
            </div>
            <Link href={`/${product.slug}`}>
              <a>
                <h6>{product.name}</h6>
              </a>
            </Link>
            <h4>${product.price}</h4>
            <ul className="color-variant quantity-variant box-l">
              <li className="bg-light">2kg</li>
              <li className="bg-light">5kg</li>
            </ul>
            <div className="progress-section">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "75%" }}
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <span>75% Claimed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
