import Slider from "react-slick";
import Link from "next/link";

export default function SideProductCart({ product }) {
  return (
    <>
      <div>
        <div className="media">
          <Link href={`/${product.slug}`}>
            <a>
              <img
                alt=""
                className="img-fluid blur-up lazyload"
                src={product.media.featuredImage}
              />
            </a>
          </Link>
          <div className="media-body align-self-center">
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
          </div>
        </div>
      </div>
    </>
  );
}
