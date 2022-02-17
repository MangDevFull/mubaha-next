import Link from 'next/link'
import Head from "next/head";
import Image from 'next/image'
import API from '../../services/api.js'
import { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Alert } from 'react-bootstrap'
import { signIn } from "next-auth/react";
import { Container, Row, Form, Label, Input, Col } from 'reactstrap';
import libphone from "google-libphonenumber";

import logo from '../../assets/images/logo-white.svg'
const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();
export default function loginPage() {


  const [isNotValidPhone, setisNotValidPhone] = useState(true);
  const [isInvalid, setInvalid] = useState(false)
  const [message, setMessage] = useState('')
  const inputPhone = useRef();
  const inputPassword = useRef();
  const router = useRouter();
  // useEffect(() => {
  //   inputPhone.current.focus()
  // })

  const checkPhone = (phone) => {
    var reg = /^\d+$/;
    if (!reg.test(phone)) {
      setisNotValidPhone(true);
    } else {
      if (phone.length < 2 || phone == null) {
        setisNotValidPhone(true);
      } else {
        const number = phoneUtil.parse(phone, "VN");
        if (!phoneUtil.isValidNumber(number)) {
          setisNotValidPhone(true);
        } else {
          const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164);
          setisNotValidPhone(false);
        }
      }
    }
  };

  const getValueForm = async (e) => {
    e.preventDefault()
    const res = await signIn("mubaha-login", {
      phone: inputPhone.current.value,
      password: inputPassword.current.value,
      redirect: false,
    });

    const data = JSON.parse(res.error)
    console.log(data);
    if (data.status === 400) {

      if (data.errors != null) {
        setMessage(data.message);
        setInvalid(true)
        // router.push('/auth/create-password')
      } else {
        setMessage(data.message);
        setInvalid(true)
      }
    }

  }


  return (
    <>
      <Head>
        <title>Đăng nhập với mật khẩu</title>
      </Head>
     
      <div className="login-page">

        <Row className="background_login">
          <Col lg="7">

            <div className=" authentication-right">
       
                <Image width='300' height='100' src={logo} alt="Mubaha" layout="responsive" />
            </div>
          </Col>
          <Col lg="4" className="right-login padding_login" >
            <div className="theme-card login_form" >
              <h5>Đăng Nhập</h5>
              <Form className="theme-form">
                <div className="form-group">
                  <Input type="text" className="form-control" placeholder="Nhập số điện thoại của bạn" required="" />
                </div>
                <div className="form-group">

                  <Input type="password" className="form-control"
                    placeholder="Nhập mật khẩu của bạn" required="" />
                </div>
                <button href="#" className="btn-login">Đăng nhập</button>
                <div className="d-flex" style={{ paddingTop: '10px' }}>
                  <div style={{ paddingRight: '50%' }}>
                    <Link href="/auth/login-otp">
                      <a className="text-link">Quên mật khẩu</a>
                    </Link>
                  </div>
                  <div>
                    <Link href="/auth/login-otp">
                      <a className="text-link">Đăng nhập SMS</a>
                    </Link>
                  </div>
                </div>
              </Form>
              <div className="login-social">

                <h5 class="text-or">HOẶC TIẾP TỤC VỚI</h5>
                <Row>
                  <Col lg='4'>
                    <div className='socail'>
                      <img src='/assets/icon/facebook.svg' width='40' height='40' alt="Mubaha" />
                    
                    </div>
                  </Col>
                  <Col lg='4'>
                    <div className='socail'>
                      <img style={{marginLeft: '10px' }} src='/assets/icon/google.svg' width='40' height='40' alt="Mubaha" />
                  
                    </div>
                  </Col>
                  <Col lg='4'>
                    <div className='socail'>
                      <img src='/assets/icon/zalo.svg' width='40' height='40' alt="Mubaha" />
               
                    </div>
                  </Col>
                </Row>
                <Row className='register'>
                  <div>
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
      {/*Section ends*/}
    </>
  )
}