import Link from 'next/link'
import Head from "next/head";
import Breadcrumb from '../../components/Breadcrumb.js'
import { useState, useCallback, useRef, useEffect } from 'react';
import Otp from '../../components/Otp.js'
import libphone from 'google-libphonenumber';
import API from '../../services/api.js'
import { Alert } from 'react-bootstrap'
import { Row, Form, Input, Col } from 'reactstrap';
import LoginSocail from '../../components/authen/LoginSocail.js'
import ImageAuthen from '../../components/authen/ImgaeAuthen.js'
import Layout from "../../components/Layout";
import OtpInput from 'react-otp-input';
const { PhoneNumberFormat, PhoneNumberUtil } = libphone;
import otpEnums from '../../utils/otpEnums.js';

const phoneUtil = PhoneNumberUtil.getInstance()


export default function RegisterPage() {
  const [isNotValidPhone, setIsNotValidPhone] = useState(true);
  const [phone, setPhone] = useState('')
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [isRegisted, setIsRegisted] = useState(false)
  const [message, setMessage] = useState('')
  const inputPhone = useRef();
  useEffect(() => {
    inputPhone.current.focus()
  },[])
  const handleClose = useCallback(() => {
    setIsVerifyPhone(false)
  }, [])

  const checkPhone = (e) => {
    phone = e.target.value
    if (phone.length < 2 || phone == null) {
      setIsNotValidPhone(true)
    } else {
      const number = phoneUtil.parse(phone, "VN")
      if (!phoneUtil.isValidNumber(number)) {
        setIsNotValidPhone(true)
      } else {
        const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164)
        setPhone(phoneNumber)
        setIsNotValidPhone(false)
      }
    }
  }

  const getOtp = async (e) => {
    e.preventDefault()
    const params = {
      phone
    }
    const response = await API.instance.post('/auth/register-otp', params)
    const data = response.data
    if (data.status == 200) {
      setIsVerifyPhone(true);
    } else {
      setMessage(data.message)
      setIsRegisted(true)
    }
  }
  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>
      {!isVerifyPhone
       &&
       <div className="login-page container-fluit">
          <Row className="background_login d-flex justify-content-center">
            <div className="right-login margin-form-otp d-flex">
              <div className="" style={{width:"50%"}}>
                <ImageAuthen />
              </div>
              <div className="theme-card login_form-right " style={{width:"50%"}}>
                <div className="justify-content-center mt-4 mb-5 ml-3 mr-3">
                  <h3 className="text-center">Đăng Ký</h3>
                </div>
                <Form className="theme-form ml-3 mr-3" onSubmit={getOtp}>
                  {isRegisted &&
                    <Alert style={{ textAlign: 'center', height: '40px' }} variant={'danger'}>
                      {message}
                    </Alert>
                  }
                  <div className="form-group mb-1">
                    <input ref={inputPhone}
                      onChange={checkPhone}
                      type="text" className="form-control"
                      placeholder="Nhập số điện thoại của bạn" required="" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type='submit' disabled={isNotValidPhone} className="btn btn-solid btn-block">Đăng Ký</button>
                  </div>
                </Form>
                <div className="login-social mx-auto">
                  <h5 className="text-or">HOẶC TIẾP TỤC VỚI</h5>
                  <LoginSocail />
                </div>
                <Row className='register d-flex justify-content-center  ml-3 mr-3 mb-5'>
                <div className=' mb-4 mx-auto'>
            <h6 style={{ textAlign: 'center', fontSize: '13px' }}>
              Bằng việc đăng kí, bạn đã đồng ý với Mubaha về <br></br>
              <span className='text-p'>Điều khoản dịch vụ</span>
              <span> & </span>
              <span className='text-p'>Chính sách bảo mật</span></h6>
          </div>
          <div className='d-flex justify-content-center'>
            <p className='mx-auto'>
              <span>Bạn đã có tài khoản? </span>
              <Link href="/auth/login">
                <a >Đăng nhập</a>
              </Link>
            </p>
          </div>
                </Row>
              </div>
            </div>
          </Row>
        </div>

  

         
    
        }
     

      {isVerifyPhone && 
      <div>
      <Breadcrumb previousLink= "/auth/register"
        previousValue="Đăng ký" currentValue="Xác thực Otp" />
                  <Row className="background_login d-flex justify-content-center">
<Otp phone={phone} type={otpEnums.REGISTRATION} /> 
</Row>
      </div>
      }
    </>
  )
}

RegisterPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}