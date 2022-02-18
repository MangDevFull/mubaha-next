import OtpInput from 'react-otp-input';
import { Button, Modal, Alert } from 'react-bootstrap';
import Link from 'next/link'
import { useState, useRef,useEffect } from 'react'
import API from '../services/api.js'
import { useRouter } from 'next/router'
import otpEnums from '../utils/otpEnums.js';
import { signIn } from "next-auth/react";
import { Form } from 'reactstrap';

export default function Otp({ show, handleClose, phone, type }) {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [isInvalidOtp, setInvalidOtp] = useState(false);

  const emptyOtp = () => {
    setOtp('')
  }

  const handleOtp = async (e) => {
    e.preventDefault()
    if (type == otpEnums.REGISTRATION) {
      const res = await signIn("mubaha-signup", {
        phone: phone,
        code: otp,
        redirect: false,
      });
      if(res.error == null) {
        router.push('/auth/create-password')
       }else{
          setInvalidOtp(true)
          setOtp('')
       }
    } else if (type == otpEnums.LOGIN) {
      const res = await signIn("mubaha", {
        phone: phone,
        code: otp,
        redirect: false,
      });
     if(res.error == null) {
      router.push('/')
     }else{
        setInvalidOtp(true)
        setOtp('')
     }
    }
  }
  return (
    <Modal 
      aria-labelledby="contained-modal-title-vcenter"
      centered
    show={show} onHide={() => { handleClose(); emptyOtp() }}>
      <Modal.Header>
        <Modal.Title>
          Vui Lòng Nhập Mã Xác Minh
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br />
        <p className="text-otp">
          Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến số điện thoại
        </p>
        <p className="text-phone-otp"><b>({phone})</b></p>
        {isInvalidOtp &&
          <Alert className='alert-otp' variant={'danger'}>
            Mã xác minh không hợp lệ
          </Alert>
        }
        <div style={{ marginTop: '50px' }} className='container'>
          <OtpInput
            isInputNum = "true"
            inputStyle={{
              width: "4em",
              height: "4em",
            }}
            containerStyle={{
              marginLeft: "105px",
              marginBottom: "20px",
            }}
            value={otp}
            onChange={(number) => {
              setOtp(number);
            }}
            numInputs={4}
            separator={<span style={{ marginLeft: '10px' }}></span>}
          />
        </div>
        <div style={{ marginTop: '60px' }} className="container">
          <p style={{ textAlign: 'center' }}>
            Bạn không nhận được mã?
            <br />
            <br></br>
            <span style={{ color: 'blue' }}>          <Link href="#">
              <a >          Gửi lại</a>

            </Link></span> hoặc
            <span style={{ color: 'blue' }} >

              <Link href="/auth/login">
                <a >           thử bằng phương thức xác minh khác</a>

              </Link>
            </span>

          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Form onSubmit={handleOtp}>
        <button className='btn btn-cancle-otp me-3' onClick={() => { handleClose(); emptyOtp(); }}>
          Đóng
        </button>
        <button type='submit' className='btn btn-solid'>
          Xác thực
        </button>
        </Form>
      </Modal.Footer>
    </Modal>
  )
}
