import Link from "next/link"
import Head from "next/head"
import API from "../../services/api.js"
import {useRef, useState} from "react"
import {useRouter} from "next/router"
import {Alert} from "react-bootstrap"
export default function LoginPage() {
  const [isInvalid, setInvalid] = useState(false)
  const [message, setMessage] = useState("")
  const inputPhone = useRef()
  const inputPassword = useRef()
  const router = useRouter()
  const getValueForm = async () => {
    const params = {
      phone: inputPhone.current.value,
      password: inputPassword.current.value,
    }
    const response = await API.instance.post("/auth/login", params)
    const data = response.data
    if (data.status == 200) {
      localStorage.setItem("userId", data.data.userId)
      localStorage.setItem("token", data.data.token)
      router.push("/")
    } else {
      if (data.errors[0] == "isCreatPassword") {
        setInvalid(true)
        setMessage(data.message)
        router.push("/auth/create-password")
      } else {
        setInvalid(true)
        setMessage(data.message)
      }
    }
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
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <a>Trang chủ</a>
                    </Link>
                  </li>
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
                    {isInvalid && (
                      <Alert style={{textAlign: "center", height: "50px"}} variant={"danger"}>
                        {message}
                      </Alert>
                    )}
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control phone-number"
                        ref={inputPhone}
                        placeholder="Số điện thoại"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div>
                      <input
                        type="password"
                        name="password"
                        className="form-control phone-number"
                        ref={inputPassword}
                        placeholder="Nhập mật khẩu"
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button onClick={getValueForm} type="submit" className="btn btn-solid">
                      Đăng nhập
                    </button>
                    <Link href="/auth/login-otp">
                      <a className="btn btn-solid">Đăng nhập với SMS</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 right-login">
              <h3>Khách hàng mới</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Tạo một tài khoản mới</h6>
                <p>
                  Đăng ký một tài khoản miễn phí tại cửa hàng của chúng tôi. Thủ tục đăng kí nhanh
                  chóng và đơn giản. Nó cho phép bạn có thể đặt hàng từ cửa hàng của chúng tôi. Để
                  bắt đầu mua sắm bấm đăng ký.
                </p>
                <Link href="/auth/register">
                  <a style={{marginTop: "80px"}} className="btn btn-solid">
                    Tạo một tài khoản
                  </a>
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
