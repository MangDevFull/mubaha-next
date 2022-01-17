import Slider from "react-slick";

export default function SlideImageHeader() {
  return (
    <Slider className="slide-1 home-slider">
      <div>
        <div className="home">
          <img
            src="/assets/images/marketplace/home-slider/7.jpg"
            alt=""
            className="bg-img blur-up lazyload"
          />
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="slider-contain">
                  <div>
                    <h4>for men</h4>
                    <h1 className="font-fraunces">spring collection</h1>
                    <a href="true" className="btn btn-solid ">
                      shop now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="home">
          <img
            src="/assets/images/marketplace/home-slider/5.jpg"
            alt=""
            className="bg-img blur-up lazyload"
          />
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="slider-contain">
                  <div>
                    <h4>for kids</h4>
                    <h1 className="font-fraunces">spring collection</h1>
                    <a href="true" className="btn btn-solid">
                      shop now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="home">
          <img
            src="/assets/images/marketplace/home-slider/6.jpg"
            alt=""
            className="bg-img blur-up lazyload"
          />
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="slider-contain">
                  <div>
                    <h4>for kids</h4>
                    <h1 className="font-fraunces">spring collection</h1>
                    <a href="true" className="btn btn-solid">
                      shop now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
}
