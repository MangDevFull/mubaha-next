import OtpInput from 'react-otp-input';
import { Alert } from 'react-bootstrap';
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import otpEnums from '@/utils/otpEnums.js';
import { signIn } from "next-auth/react";
import styles from '@/styles/authen.module.css'
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

        const res = await signIn("mubaha", {
          phone: phone,
          code: e,
          redirect: false,
        });

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
      <div className={`card ${styles.formOtp} container`}>
        <div className={`${styles.textTitleOtp} mt-5`}>
          <h3>  Vui Lòng Nhập Mã Xác Minh</h3>
        </div>
        <p className={styles.textOtp}>
          Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến số điện thoại
        </p>
        <p className={styles.textPhoneOtp}><b>({phone})</b></p>
        {isInvalidOtp &&
          <Alert className={styles.alertOtp} variant={'danger'}>
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
            {
            type == otpEnums.LOGIN && 
            (
              <>
              hoặc
            <span style={{ color: "blue" }}>
              <Link href="/auth/login">
                <a> thử bằng phương thức xác minh khác</a>
              </Link>
            </span>
            </>
            )
          }
          </p>
        </div>
      </div>
    </>
  )
}