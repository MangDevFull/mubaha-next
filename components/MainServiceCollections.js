
import { Container, Col, Row } from "reactstrap";

import {
  svgFreeShipping,
  svgoffer,
  svgservice,
  svgpayment,
} from "@/services/script";

import MasterServiceContent from "./MasterServiceContent";

const Data = [
  {
    link: svgFreeShipping,
    title: "Vận chuyển nhanh nhất",
    service: "Đa Quốc gia & toàn bộ 63 tỉnh thành",
  },
  {
    link: svgservice,
    title: "Dịch vụ 24/7",
    service: "Phục vụ khách hàng mọi lúc",
  },
  {
    link: svgoffer,
    title: "Ưu đãi hấp dẫn",
    service: "Hàng ngàn ưu đãi, mã giảm giá",
  },
  {
    link: svgpayment,
    title: "Thanh toán thông minh",
    service: "Đa kênh, thông minh và linh hoạt",
  },
];

export default function MainServiceCollections() {
  return (
    <>
      <section className="banner-padding absolute-banner mt-5">
        <Container className="absolute-bg">
          <div className="service p-0">
            <Row>
              {Data.map((data, i) => {
                return (
                  <Col md="3" className="service-block" key={i}>
                    <MasterServiceContent
                      link={data.link}
                      title={data.title}
                      service={data.service}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </section>
    </>
  )
}