import { Col, Container, Media, Row } from "reactstrap";
import useSWR from 'swr'
import fetcher from '../libs/fetcher'

const MasterCategory = ({ img, title, slug }) => {
  return (
    <Col sm={2} className="border-padding">
      <div className="category-banner">
        <div>
          <Media
            src={img}
            className="img-fluid blur-up lazyload bg-img"
            alt=""
          />
        </div>
        <div className="category-box">
          <a href="#">
            <h3>{title}</h3>
          </a>
        </div>
      </div>
    </Col>
  );
};

const CategorySection = () => {
  const { data, error } = useSWR(`${process.env.API_URL}/categories/featured`, fetcher)

  return (
    <>
      <section className="p-0 ratio2_1">
        {data?.data && data.data.length > 0 &&
          <Container fluid={true}>
            <Row className="category-border">
              {data?.data.map((item, i) => {
                return <MasterCategory key={i} img={item.featuredImage} title={item.name} slug={item.slug} />;
              })}
            </Row>
          </Container>
        }
      </section>
    </>
  )
};

export default CategorySection;