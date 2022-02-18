import Link from 'next/link'
import Head from "next/head";
import Image from 'next/image'
import API from '../../services/api.js'
import { useRef, useState, useEffect } from "react";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
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
  const [showPass,setShowPass] = useState('block');
  const [hidePass,setHidePass] = useState('none')
  const [inputValues, setInputValues] = useState('password')

  const router = useRouter();

  const handleShowPassword = () =>{
    setHidePass('block');
    setShowPass('none')
    setInputValues('text')
  }
  const handlHidePassword = () =>{
    setHidePass('none');
    setShowPass('block')
    setInputValues('password')
  }

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
                <div className="form-group d-flex">

                  <input type={inputValues} className="form-control"
                  ref={inputPassword}
                    placeholder="Nhập mật khẩu của bạn" required="" />
                    <div onClick={handleShowPassword} style={{display:showPass}} className="hide-show-password">
                      <AiFillEye className="icon-password" />
                      </div>
                     
                    <div onClick={handlHidePassword} style={{display:hidePass}} className="hide-show-password">
                      <AiFillEyeInvisible className="icon-password" />
                      </div>
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
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </symbol>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>

      </div>
      {/*Section ends*/}
    </>
  )
}