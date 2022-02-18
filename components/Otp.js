import OtpInput from 'react-otp-input';
import { Alert } from 'react-bootstrap';
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb.js'
import { useRouter } from 'next/router'
import otpEnums from '../utils/otpEnums.js';
import { signIn } from "next-auth/react";

export default function VerifyOtp({ phone, type }) {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [isInvalidOtp, setInvalidOtp] = useState(false);

  const checkOtp = async (e) => {
    setOtp(e)
    if (e.length == 4) {
      if (type == otpEnums.REGISTRATION) {
        const res = await signIn("mubaha-signup", {
          phone: phone,
          code: e,
          redirect: false,
        });
        if (res.error == null) {
          router.push('/auth/create-password')
        } else {
          setInvalidOtp(true)
        }
      } else if (type == otpEnums.LOGIN) {
        const res = await signIn("mubaha", {
          phone: phone,
          code: e,
          redirect: false,
        });
        if (res.error == null) {
          router.push('/')
        } else {
          setInvalidOtp(true)

        }
      }else if(type==otpEnums.CREATE_PASSWORD){
        console.log(phone,e)
        const res = await signIn("mubaha", {
          phone: phone,
          code: e,
          redirect: false,
        });
        console.log(res)
        if (res.error == null) {
          router.push('/auth/create-password')
        } else {
          setInvalidOtp(true)

        }
      }
    }
  }
  return (
    <>
      <Breadcrumb previousLink={type == otpEnums.LOGIN ? "/auth/login" : "/auth/register"}
        previousValue={type == otpEnums.LOGIN ? "Đăng nhập" : "Đăng ký"} currentValue="Xác thực Otp" />

      <div className="card form-otp container">
        <div className="text-title-otp mt-5">
          <h3>  Vui Lòng Nhập Mã Xác Minh</h3>
        </div>
        <p className="text-otp">
          Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến số điện thoại
        </p>
        <p className="text-phone-otp"><b>({phone})</b></p>
        {isInvalidOtp &&
          <Alert className='alert-otp' variant={'danger'}>
            Mã xác minh không hợp lệ
          </Alert>
        }
        <div style={{ marginTop: '10px' }} className="d-flex justify-content-center">
          <OtpInput
            shouldAutoFocus="true"
            isInputNum="true"
            inputStyle={{
              width: "4em",
              height: "4em",
            }}
            // containerStyle={{
            //   marginLeft: "215px",
            //   marginBottom: "20px",
            // }}
            value={otp}
            onChange={checkOtp}
            numInputs={4}
            separator={<span style={{ marginLeft: '10px' }}></span>}
          />
        </div>
        <div className="container d-flex justify-content-center mt-5 mb-5">
          <p style={{ textAlign: 'center' }}>
            Bạn không nhận được mã?
            <br />
            <br></br>
            <span style={{ color: "blue" }}>
              {" "}
              <Link href="#">
                <a> Gửi lại</a>
              </Link>
            </span>{" "}
            hoặc
            <span style={{ color: "blue" }}>
              <Link href="/auth/login">
                <a> thử bằng phương thức xác minh khác</a>
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}