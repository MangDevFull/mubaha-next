import Slider from "react-slick";

export default function SlideSixBrand() {
  return (
    <section className="tools-brand">
      <div className="container">
        <div className="row bg-light">
          <div className="col-md-12">
            <Slider slidesToShow={6} className="brand-6 no-arrow">
              <div>
                <div className="logo-block">
                  <a href="true">
                    <img src="/assets/images/logos/9.png" alt="" />
                  </a>
                </div>
              </div>
              <div>
                <div className="logo-block">
                  <a href="true">
                    <img src="/assets/images/logos/10.png" alt="" />
                  </a>
                </div>
              </div>
              <div>
                <div className="logo-block">
                  <a href="true">
                    <img src="/assets/images/logos/11.png" alt="" />
                  </a>
                </div>
              </div>
              <div>
                <div className="logo-block">
                  <a href="true">
                    <img src="/assets/images/logos/12.png" alt="" />
                  </a>
                </div>
              </div>
              <div>
                <div className="logo-block">
                  <a href="true">
                    <img src="/assets/images/logos/13.png" alt="" />
                  </a>
                </div>
              </div>
              <div>
                <div className="logo-block">
                  <a href="true">
                    <img src="/assets/images/logos/14.png" alt="" />
                  </a>
                </div>
              </div>
              <div>
                <div className="logo-block">
                  <a href="true">
                    <img src="/assets/images/logos/15.png" alt="" />
                  </a>
                </div>
              </div>
              <div>
                <div className="logo-block">
                  <a href="true">
                    <img src="/assets/images/logos/16.png" alt="" />
                  </a>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
