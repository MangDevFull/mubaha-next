import Link from 'next/link'
import Head from "next/head";
import Image from 'next/image'
import API from '../../services/api.js'
import { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Alert } from 'react-bootstrap'
import { signIn } from "next-auth/react";
import {  Row, Form, Input, Col } from 'reactstrap';
import libphone from "google-libphonenumber";


const { PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();
export default function loginPage() {


  const [isNotValidPhone, setisNotValidPhone] = useState(true);
  const [isInvalid, setInvalid] = useState(false)
  const [message, setMessage] = useState('')
  const inputPhone = useRef();
  const inputPassword = useRef();
  const router = useRouter();

  useEffect(() => {
    inputPhone.current.focus()
  })

  const checkPhone = (e) => {
    const phone = e.target.value
    console.log(phone)
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
          setisNotValidPhone(false);
        }
      }
    }
  };

  const getValueForm = async (e) => {
    e.preventDefault()
    console.log('phone',inputPhone.current.value)
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
       
                <img className="logo-login" width='500' height='400' src="/assets/icon/logo-login.png" alt="Mubaha" />
              
            </div>
          </Col>
          <Col lg="4" className="right-login mt-5 mb-5" >
            <div className="theme-card login_form" >
              <h5>Đăng Nhập</h5>
              <Form className="theme-form" onSubmit={getValueForm}>
              {isInvalid &&
                      <Alert style={{textAlign:'center',height:'40px'}} variant={'danger'}>
                      {message}
                      </Alert>
                    }
                <div className="form-group">
                  <input ref={inputPhone}
                  onChange={checkPhone}
                   type="text" className="form-control" placeholder="Nhập số điện thoại của bạn" required="" />
                </div>
                <div className="form-group">

                  <input type="password" className="form-control"
                  ref={inputPassword}
                    placeholder="Nhập mật khẩu của bạn" required="" />
                </div>
                <button type='submit' disabled={isNotValidPhone} style={{width:'100%',backgroundColor:'#f89922'}} className="btn btn-solid">Đăng nhập</button>
                <div className="d-flex" style={{ paddingTop: '10px' }}>
                  <div style={{ paddingRight: '40%' }}>
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
                  <Col>
                    <div className='socail'>
                      <img src='/assets/icon/facebook.svg' width='40' height='40' alt="Mubaha" />
                    
                    </div>
                  </Col>
                  <Col>
                    <div className='socail'>
                      <img style={{marginLeft: '10px' }} src='/assets/icon/google.svg' width='40' height='40' alt="Mubaha" />
                  
                    </div>
                  </Col>
                  <Col>
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