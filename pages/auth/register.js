import Link from 'next/link'
import Head from "next/head";
import { useState,useCallback } from 'react';
import Otp from '../../components/Otp.js'
import libphone from 'google-libphonenumber';
import API from '../../services/api.js'
import {Alert} from 'react-bootstrap'
const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();
export default function registerPage (){
  const [isNotValidPhone, setisNotValidPhone] = useState(true);
  const [phone, setPhone] = useState('')
  const [isVerifyPhone, setisVerifyPhone] = useState(false);
  const [isRegisted,setIsRegisted] = useState(false)
  const [message, setMessage] = useState('')
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

  const getOtp = async () => {
    const params ={
      phone
    }
    const response = await API.instance.post('/auth/register-otp',params)
    const data = response.data
    console.log(data);
    if(data.status == 200){
      setisVerifyPhone(true);
    }else{
      setMessage(data.message)
      setIsRegisted(true);
    }
  }
  return(
    <>
          <Head>
        <title>Đăng ký</title>
      </Head>
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
        <Otp show={isVerifyPhone} handleClose={handleClose} phone={phone} type={'REG'} />
        <section className="register-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>Tạo tài khoản</h3>
                <div className="theme-card">
                  <div className="theme-form" method="POST">
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
                      { isRegisted &&
                      <Alert style={{textAlign:'center',height:'50px'}} variant={'danger'}>
                      {message}
                      </Alert>
                     }
                        <label htmlFor="fname">Số điện thoại *</label>
                        <input type="tel" name="username" className="form-control phone-number"
                        onChange={(e) => {
                          checkPhone(e.target.value);
                        }}
                        id="phone" maxLength={20} placeholder="Số điện thoại" required />
                        <div className="d-flex justify-content-between">
                        <button disabled={isNotValidPhone} className="btn btn-solid" onClick={getOtp}>Tiếp tục</button>
                        <Link href="/auth/login">
        <a  className="btn btn-solid">Quay lại đăng nhập</a>
         
        </Link>
                        </div>
                      </div>
                    </div>
                  </div></div>
              </div>
            </div>
          </div>
        </section>
        {/*Section ends*/}
    </>
  )
}