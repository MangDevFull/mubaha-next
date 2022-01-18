import Slider from "react-slick";

export default function SideProductCart({ product }) {
  console.log("product", product.media.featuredImage);
  return (
    <>
      <div>
        <div className="media">
          <a href="product-page(no-sidebar).html">
            <img
              alt=""
              className="img-fluid blur-up lazyload"
              src="https://mubaha.hn.ss.bfcplatform.vn/data/118230377_109738244185899_5156288428963243418_n.jpeg"
            />
          </a>
          <div className="media-body align-self-center">
            <div className="rating">
              <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
              <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
              <i className="fa fa-star" />
            </div>
            <a href="product-page(no-sidebar).html">
              <h6>{product.name}</h6>
            </a>
            <h4>{product.price}</h4>
          </div>
        </div>
      </div>
    </>
  );
}
