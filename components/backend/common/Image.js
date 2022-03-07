import React from "react";
import { Media } from "reactstrap";

const Image = ({ data }) => {
  return (
    <div>
      <div className="d-flex">
        {data.map((res, i) => {
          return (
            <Media src={res} alt="" key={i} className="img-fluid img-30 mr-2 blur-up lazyloaded" />
          );
        })}
      </div>
    </div>
  );
};

export default Image;
