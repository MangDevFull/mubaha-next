import Link from 'next/link'
import Head from "next/head";
import API from '../../services/api.js'
import { useRef,useState,useEffect } from "react";
import {useRouter} from 'next/router';
import {Alert} from 'react-bootstrap'
import { signIn } from "next-auth/react";
import {useSession} from 'next-auth/react'

export default function loginPage() {

  const { data: session, status } = useSession()

  console.log(session)
  

  const [isInvalid,setInvalid] = useState(false)
  const [message,setMessage] = useState('')
  const inputPhone = useRef();
  const inputPassword = useRef();
  const router = useRouter();
  useEffect(() => {
    inputPhone.current.focus()
   console.log(inputPhone.current.value)
  })
   const getValueForm = async () => {
    const data = await signIn("mubaha-login", {
      phone: inputPhone.current.value,
      password: inputPassword.current.value,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    });

    console.log(data.error)
   
  }


  return (
    <>
      <Head>
        <title>Đăng nhập với mật khẩu</title>
      </Head>
      {/* breadcrumb start */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="page-title">
                <h2>Đăng nhập tài khoản</h2>
              </div>
            </div>
            <div className="col-sm-6">
              <nav aria-label="breadcrumb" className="theme-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                  <li className="breadcrumb-item active">Đăng nhập</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* breadcrumb End */}
      {/*section start*/}
      <section className="login-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3>Đăng nhập</h3>
              <div className="theme-card">
                <h6 className="title-font">Đăng nhập với mật khẩu</h6>
                <div className="theme-form">
                  <div className="form-group">
                  {isInvalid &&
           <Alert style={{textAlign:'center',height:'50px'}} variant={'danger'}>
          {message}
          </Alert>
        }
                    <div>
                      <input type="tel"
                       name="phone" className="form-control phone-number" 
                       ref = {inputPhone}
                        placeholder="Số điện thoại" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <div>
                      <input type="password" 
                      name="password" className="form-control phone-number" 
                      ref = {inputPassword}
                       placeholder="Nhập mật khẩu" required />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button onClick={getValueForm} type="submit" className="btn btn-solid">Đăng nhập</button>
                    <Link href="/auth/login-otp">
                      <a className="btn btn-solid">Đăng nhập với SMS</a>
                    </Link>
                  </div>
                </div>
                <div className="clearfix mb-4" />
                <p className="mb-2">Hoặc tiếp tục với</p>
                <ul className="list-group list-group-horizontal auth-icon-list">
                  <li className="list-group-item"><a href="/a/fb"><img src="/assets/svg/icons/facebook.svg" /></a></li>
                  <li className="list-group-item"><a href="/a/gg"><img src="/assets/svg/icons/google.svg" /></a></li>
                  <li className="list-group-item"><a href="/a/zalo"><img src="/assets/svg/icons/zalo.svg" /></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 right-login">
              <h3>Khách hàng mới</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Tạo một tài khoản mới</h6>
                <p>Đăng ký một tài khoản miễn phí tại cửa hàng của chúng tôi. Thủ tục đăng kí nhanh chóng và đơn
                  giản. Nó cho phép bạn
                  có thể đặt hàng từ cửa hàng của chúng tôi. Để bắt đầu mua sắm bấm đăng ký.</p>
                <Link href="/auth/register">
                  <a style={{ marginTop: '80px' }} className="btn btn-solid">Tạo một tài khoản</a>

                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Section ends*/}
    </>
  )
}