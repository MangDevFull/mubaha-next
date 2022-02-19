import Link from "next/link";
import { useState, useCallback,useRef, useEffect } from "react";
import Otp from "../../components/Otp.js";
import Head from "next/head";
import libphone from "google-libphonenumber";
import API from "../../services/api.js";
import { Alert } from "react-bootstrap";
import otpEnums from "../../utils/otpEnums.js";
import Layout from "../../components/Layout";
import {  Row, Form, Input, Col } from 'reactstrap';
import LoginSocail from '../../components/authen/LoginSocail.js'
import ImageAuthen from '../../components/authen/ImgaeAuthen.js'
const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();

export default function LoginWithOtp() {
  const [isNotValidPhone, setIsNotValidPhone] = useState(true);
  const [phone, setPhone] = useState("");
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [message, setMessage] = useState("");
  const [isNotRegistered, setIsNotRegistered] = useState(false);
  const inputPhone = useRef();
  useEffect(() => {
    inputPhone.current.focus();
  },[])

  const checkPhone = (e) => {
    phone = e.target.value;
    var reg = /^\d+$/;
    if (!reg.test(phone)) {
      setIsNotValidPhone(true);
    } else {
      if (phone.length < 2 || phone == null) {
        setIsNotValidPhone(true);
      } else {
        const number = phoneUtil.parse(phone, "VN");
        if (!phoneUtil.isValidNumber(number)) {
          setIsNotValidPhone(true);
        } else {
          const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164);
          setPhone(phoneNumber);
          setIsNotValidPhone(false);
        }
      }
    }
  };

  const getOtp = async (e) => {
    e.preventDefault();
    const params = {
      phone: phone,
    };
    const response = await API.instance.post("/auth/login-otp", params);
    const data = response.data;
    if (data.status == 200) {
      setIsVerifyPhone(true);
      setMessage("");
      setIsNotRegistered(false);
    } else {
      setMessage(data.message);
      setIsNotRegistered(true);
    }
  };
  return (
    <>
      <Head>
        <title>Đăng nhập với SMS</title>
      </Head>
      {/* breadcrumb start */}
      {!isVerifyPhone
      &&
      <div className="login-page container-fluit">

<Row className="background_login">
  <Col lg="7">
  <ImageAuthen />
  </Col>
  <Col lg="4" className="right-login mt-5 mb-5 container" >
    <div className="theme-card login_form" >
      <h5>Đăng Nhập</h5>
      <Form className="theme-form" onSubmit={getOtp}>
      {isNotRegistered &&
              <Alert style={{textAlign:'center',height:'40px'}} variant={'danger'}>
              {message}
              </Alert>
            }
        <div className="form-group">
          <input ref={inputPhone}
          onChange={checkPhone}
           type="text" className="form-control" placeholder="Nhập số điện thoại của bạn" required="" />
        </div>
        <button type='submit' disabled={isNotValidPhone} style={{width:'100%',backgroundColor:'#f89922'}} className="btn btn-solid">Đăng nhập</button>
        <div className="d-flex justify-content-end" style={{ paddingTop: '10px' }}>
          <div >
  
            <Link href="/auth/login">
              <a className="text-link">Đăng nhập mật khẩu</a>
            </Link>
          </div>
        </div>
      </Form>
      <div className="login-social">

        <h5 className="text-or">HOẶC TIẾP TỤC VỚI</h5>
        <LoginSocail />
        <Row className='register '>
          <div className='mx-auto'>
            <p className='text-signup'><span>Bạn chưa có tài khoản? </span>
            <Link href="/auth/register">
          <a >Đăng ký</a>

        </Link>
             </p>
          </div>
        </Row>
      </div>
    </div>
  </Col>
  <Col lg="1"></Col>
</Row>

</div>
      }


     { isVerifyPhone && <Otp  phone={phone} type={otpEnums.LOGIN} />}

      {/*Section ends*/}
    </>
  );
}

LoginWithOtp.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}