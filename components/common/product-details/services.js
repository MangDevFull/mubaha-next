import React from "react";
import MasterServiceContent from "@/components/Service/MasterServiceContent";
import { svgFreeShipping, svgservice, svgoffer, svgpayment } from "@/services/script";

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

const Services = () => {
  return (
    <div className="collection-filter-block">
      <div className="product-service">
        {Data.map((data, index) => {
          return (
            <MasterServiceContent
              key={index}
              link={data.link}
              title={data.title}
              service={data.service}
              lastChild={data.lastChild}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Services;
