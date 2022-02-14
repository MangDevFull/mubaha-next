
import PostLoader from './common/post-loader';
import {
  Container, Row, Col,
} from 'reactstrap'

import { Product5 } from '../services/script'

import ProductItem from './product-item'

import Slider from 'react-slick';

export default function DealsOfTheDay({ data }) {
  return (
    <section className="section-b-space ratio_square">
      <Container>
        <Row>
          <Col>
            <div className="title1 title-gradient">
              <h2 className="title-inner1"><i className="fa fa-bolt"></i> deals of the day</h2>
              <div className="line"><span></span></div>
            </div>
            {!data ?
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
              :
              <Slider {...Product5} className="product-4 product-m no-arrow">
                {data && data.map((product, index) =>
                  <div key={index}>
                    <ProductItem product={product} />
                  </div>
                )}

              </Slider>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

