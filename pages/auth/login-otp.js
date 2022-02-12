import Link from 'next/link'
import { useState, useCallback } from 'react';
import Otp from '../../components/Otp.js'
import Head from "next/head";
import libphone from 'google-libphonenumber';


const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();

export default function loginWithOtp() {
  const [isNotValidPhone, setisNotValidPhone] = useState(true);
  const [phone, setPhone] = useState('')
  const [isVerifyPhone, setisVerifyPhone] = useState(false);
  const handleClose = useCallback(() => {
    setisVerifyPhone(false);
  }, [isVerifyPhone, phone]);

  const checkPhone = (phone) => {
    if (phone.length < 2 || phone == null) {
      setisNotValidPhone(true);
    } else {
      const number = phoneUtil.parse(phone, 'VN');
      if (!phoneUtil.isValidNumber(number)) {
        setisNotValidPhone(true);
      } else {
        const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164);
        setPhone(phoneNumber);
        setisNotValidPhone(false)
      }
    }
  }

  const getOtp = () => {
    setisVerifyPhone(true);
  }
  return (
    <>
      <Head>
        <title>Đăng nhập với SMS</title>
      </Head>
      {/* breadcrumb start */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="page-title">
                <h2>Đăng nhập tài khoản</h2>
              </div>
            </div>
            <div className="col-sm-6">
              <nav aria-label="breadcrumb" className="theme-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                  <li className="breadcrumb-item active">Đăng nhập</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* breadcrumb End */}
      {/*section start*/}

      <Otp show={isVerifyPhone} handleClose={handleClose} phone={phone} />


      <section className="login-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3>Đăng nhập</h3>

              <div className="theme-card">
                <h6 className="title-font">Đăng nhập với SMS</h6>
                <br />

                <div className="theme-form">
                  <div className="form-group">
                    <div>
                    <input type="tel" name="username" className="form-control phone-number"
                        onChange={(e) => {
                          checkPhone(e.target.value);
                        }}
                        id="phone" maxLength={20} placeholder="Số điện thoại" required />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button disabled={isNotValidPhone} className="btn btn-solid" onClick={getOtp}>Tiếp tục</button>
                    <Link href="/auth/login">
                      <a className="btn btn-solid">Đăng nhập với mật khẩu</a>

                    </Link>
                  </div>
                </div>
                <div className="clearfix mb-4" />
                <p className="mb-2">Hoặc tiếp tục với</p>
                <ul className="list-group list-group-horizontal auth-icon-list">
                  <li className="list-group-item"><a href="/a/fb"><img src="/assets/svg/icons/facebook.svg" /></a></li>
                  <li className="list-group-item"><a href="/a/gg"><img src="/assets/svg/icons/google.svg" /></a></li>
                  <li className="list-group-item"><a href="/a/zalo"><img src="/assets/svg/icons/zalo.svg" /></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 right-login">
              <h3>Khách hàng mới</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Tạo một tài khoản mới</h6>
                <p>Đăng ký một tài khoản miễn phí tại cửa hàng của chúng tôi. Thủ tục đăng kí nhanh chóng và đơn
                  giản. Nó cho phép bạn
                  có thể đặt hàng từ cửa hàng của chúng tôi. Để bắt đầu mua sắm bấm đăng ký.</p>
                <Link href="/auth/register">
                  <a className="btn btn-solid">Tạo một tài khoản</a>

                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Section ends*/}
    </>
  )
}