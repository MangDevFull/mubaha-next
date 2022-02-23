import React from "react";
import MasterServiceContent from "../../../components/Service/MasterServiceContent";
import { svgFreeShipping, svgservice, svgoffer, svgpayment } from "../../../services/script";

const Data = [
  {
    link: svgFreeShipping,
    title: "free shipping",
    service: "free shipping world wide",
  },
  {
    link: svgservice,
    title: "24 X 7 service",
    service: "online service for new customer",
  },
  {
    link: svgoffer,
    title: "festival offer",
    service: "new online special festival offer",
  },
  {
    link: svgpayment,
    title: "online payment",
    service: "new online special festival offer",
    lastChild: true,
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
