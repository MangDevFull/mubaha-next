import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";;
import styles from '@/components/filter/filter.module.css'
const Rating = () => {
  const router = useRouter();
  const [value, setValue] = useState({ min: 0, max: 10000000 });
  return (
    <>
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title">Đánh giá</h3>
        <div className="collection-collapse-block-content">
          <div className="wrapper mt-3">
            <div className="range-slider">
              <div className="rating-section">
                <div className="rating" role="button">
                  <i className="fa fa-star" /> <i className="fa fa-star" />
                  <i className="fa fa-star" /> <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  Từ 5 sao
                </div>
                <div className="rating" role="button">
                  <i className="fa fa-star" /> <i className="fa fa-star" />
                  <i className="fa fa-star" /> <i className="fa fa-star" />
                  <i className="fa fa-light fa-star" style={{color:"rgb(184, 184, 184)"}}></i>
                  Từ 4 sao
                </div>
                <div className="rating" role="button">
                  <i className="fa fa-star" /> <i className="fa fa-star" />
                  <i className="fa fa-star" /> <i className="fa fa-light fa-star" style={{color:"rgb(184, 184, 184)"}}></i>
                  <i className="fa fa-light fa-star" style={{color:"rgb(184, 184, 184)"}}></i>
                  Từ 3 sao
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>


  );
};

export default Rating;
