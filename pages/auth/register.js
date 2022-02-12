import Link from 'next/link'
import { useState,useCallback } from 'react';
import Otp from '../../components/Otp.js'
export default function registerPage (){
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = useCallback(() => {
     setShow(false);
  },[show]);
  return(
    <>
       {/* breadcrumb start */}
       <div className="breadcrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="page-title">
                  <h2>Tạo tài khoản</h2>
                </div>
              </div>
              <div className="col-sm-6">
                <nav aria-label="breadcrumb" className="theme-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Tạo tài khoản</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb End */}
        {/*section start*/}
        <Otp show = {show}  handleClose={handleClose}  />
        <section className="register-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>Tạo tài khoản</h3>
                <div className="theme-card">
                  <form className="theme-form" method="POST">
                    <div className="form-row row">
                      <div className="col-md-6">
                        <div className="subscribe">
                          <div>
                            <h4>Đăng ký ngay để nhận được ưu đãi </h4>
                            <p>Bằng việc đăng kí, bạn đã đồng ý với Mubaha về Điều khoản dịch vụ &amp; Chính
                              sách bảo mật </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="fname">Số điện thoại *</label>
                        <input type="text" className="form-control" id="fname" name="phone" placeholder="Nhập số điện thoại" required />
                        <div className="d-flex justify-content-between">
                        <button  className="btn btn-solid w-auto"  onClick={handleShow}>Tiếp tục</button>
                        <Link href="/auth/login">
        <a  className="btn btn-solid">Quay lại đăng nhập</a>
         
        </Link>
                        </div>
                      </div>
                    </div>
                  </form></div>
              </div>
            </div>
          </div>
        </section>
        {/*Section ends*/}
    </>
  )
}