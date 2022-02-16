import Link from "next/link"
import {useState, useCallback} from "react"
import Otp from "../../components/Otp.js"
import Head from "next/head"
import libphone from "google-libphonenumber"
import API from "../../services/api.js"
import {Alert} from "react-bootstrap"
import otpEnums from "../../utils/otpEnums.js"

const {PhoneNumberFormat, PhoneNumberUtil} = libphone

const phoneUtil = PhoneNumberUtil.getInstance()

export default function loginWithOtp() {
  const [isNotValidPhone, setisNotValidPhone] = useState(true)
  const [phone, setPhone] = useState("")
  const [isVerifyPhone, setisVerifyPhone] = useState(false)
  const [message, setMessage] = useState("")
  const [isNotRegistered, setIsNotRegistered] = useState(false)
  const handleClose = useCallback(() => {
    setisVerifyPhone(false)
  }, [isVerifyPhone, phone])

  const checkPhone = (phone) => {
    var reg = /^\d+$/
    if (!reg.test(phone)) {
      setisNotValidPhone(true)
    } else {
      if (phone.length < 2 || phone == null) {
        setisNotValidPhone(true)
      } else {
        const number = phoneUtil.parse(phone, "VN")
        if (!phoneUtil.isValidNumber(number)) {
          setisNotValidPhone(true)
        } else {
          const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164)
          setPhone(phoneNumber)
          setisNotValidPhone(false)
        }
      }
    }
  }

  const getOtp = async (e) => {
    e.preventDefault()
    const params = {
      phone: phone,
    }
    const response = await API.instance.post("/auth/login-otp", params)
    // const {error, ok} = await signIn("credentials", {

    // })

    const data = response.data
    if (data.status == 200) {
      setisVerifyPhone(true)
      setMessage("")
      setIsNotRegistered(false)
    } else {
      setMessage(data.message)
      setIsNotRegistered(true)
    }
  }
  return (
    <>
      <Head>
        <title>Đăng nhập với SMS</title>
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
                    <a href="/">Trang chủ</a>
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

      <Otp show={isVerifyPhone} handleClose={handleClose} phone={phone} type={otpEnums.LOGIN} />

      <section className="login-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3>Đăng nhập</h3>

              <div className="theme-card">
                <h6 className="title-font">Đăng nhập với SMS</h6>
                <br />

                <form className="theme-form" onSubmit={getOtp}>
                  {isNotRegistered && (
                    <Alert style={{textAlign: "center", height: "50px"}} variant={"danger"}>
                      {message}
                    </Alert>
                  )}
                  <div className="form-group">
                    <div>
                      <input
                        type="tel"
                        name="username"
                        className="form-control phone-number"
                        onChange={(e) => {
                          checkPhone(e.target.value)
                        }}
                        id="phone"
                        maxLength={20}
                        placeholder="Số điện thoại"
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button disabled={isNotValidPhone} type="submit" className="btn btn-solid">
                      Tiếp tục
                    </button>
                    <Link href="/auth/login">
                      <a className="btn btn-solid">Đăng nhập với mật khẩu</a>
                    </Link>
                  </div>
                </form>
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
                  <a className="btn btn-solid">Tạo một tài khoản</a>
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
