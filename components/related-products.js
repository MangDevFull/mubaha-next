import Slider from "react-slick";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../components/ProductCard";
import PostLoader from "./common/post-loader";
import { Product5 } from "../services/script";

export default function RelatedProducts({ data }) {
  return (
    <>
      {/* product section start*/}
      <section className="section-b-space ratio_asos">
        <Container>
          <Row>
            <Col>
              <div className="product-related">
                <h2>RELATED PRODUCTS</h2>
              </div>
              {!data ? (
                <div className="row mx-0 margin-default">
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                </div>
              ) : (
                <Slider
                  {...Product5}
                  className="slide-6-product product-m no-arrow"
                >
                  {data &&
                    data.map((product, index) => (
                      <divp key={index}>
                        <ProductCard product={product} />
                      </divp>
                    ))}
                </Slider>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      {/* product section end*/}
    </>
  );
}
