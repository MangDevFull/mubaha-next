import Link from 'next/link'
import Head from "next/head";
import { useState, useCallback, useRef, useEffect } from 'react';
import Otp from '../../components/Otp.js'
import libphone from 'google-libphonenumber';
import API from '../../services/api.js'
import { Alert } from 'react-bootstrap'
import { Row, Form, Input, Col } from 'reactstrap';
import LoginSocail from '../../components/authen/LoginSocail.js'
import ImageAuthen from '../../components/authen/ImgaeAuthen.js'
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
       <div className="login-page">

<Row className="background_login">
  <Col lg="7">
    <ImageAuthen />
  </Col>
  <Col lg="4" className="right-login mt-5 mb-5" >
    <div className="theme-card login_form" >
      <h5>Đăng ký</h5>
      <Form className="theme-form" onSubmit={getOtp}>
        {isRegisted &&
          <Alert className='mt-2 mb-10' style={{ textAlign: 'center', height: '40px' }} variant={'danger'}>
            {message}
          </Alert>
        }
        <div className="form-group">
          <input ref={inputPhone}
            onChange={checkPhone}
            type="text" className="form-control" placeholder="Nhập số điện thoại của bạn" required="" />
        </div>
        <button type='submit' disabled={isNotValidPhone} style={{ width: '100%', backgroundColor: '#f89922' }} className="btn btn-solid">Đăng ký</button>
        <div className="d-flex" style={{ paddingTop: '10px' }}>
          <div style={{ paddingLeft: '60%' }}>
          </div>
        </div>

      </Form>

      <div className="login-social">

        <h5 className="text-or">HOẶC TIẾP TỤC VỚI</h5>
        <LoginSocail />
        <Row className='register'>
          <div className='text-pol mb-4'>
            <h6 style={{ textAlign: 'center', fontSize: '11px' }}>
              Bằng việc đăng kí, bạn đã đồng ý với Mubaha về <br></br>
              <span className='text-p'>Điều khoản dịch vụ</span>
              <span> & </span>
              <span className='text-p'>Chính sách bảo mật</span></h6>
          </div>
          <div>

            <p className='text-signup'>
              <span>Bạn đã có tài khoản? </span>
              <Link href="/auth/login">
                <a >Đăng nhập</a>

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
     

      {isVerifyPhone && <Otp phone={phone} type={otpEnums.REGISTRATION} />}
    </>
  )
}
