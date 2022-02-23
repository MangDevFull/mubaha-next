import Link from "next/link";
import { useState, useRef } from "react";
import Otp from "../../components/Otp.js";
import Breadcrumb from "../../components/Breadcrumb.js";
import Head from "next/head";
import libphone from "google-libphonenumber";
import API from "../../services/api.js";
import { Alert } from "react-bootstrap";
import otpEnums from "../../enums/otpEnums.js";
import Layout from "../../components/Layout";
import { Row, Form } from "reactstrap";
import LoginSocail from "../../components/authen/LoginSocail.js";
import styles from "../../styles/authen.module.css";
import LeftForm from '../../components/authen/LeftForm.js'

const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();

export default function LoginWithOtp() {
  const [isNotValidPhone, setIsNotValidPhone] = useState(true);
  const [phone, setPhone] = useState("");
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [message, setMessage] = useState("");
  const [isNotRegistered, setIsNotRegistered] = useState(false);
  const inputPhone = useRef();
  // useEffect(() => {
  //   inputPhone.current.focus();
  // }, [])

  const checkPhone = (e) => {
    phone = e.target.value;
    var reg = /^\d+$/;
    if (!reg.test(phone)) {
      setIsNotValidPhone(true);
    } else {
      if (phone.length < 2 || phone == null) {
        setIsNotValidPhone(true);
      } else {
        const number = phoneUtil.parse(phone, "VN");
        if (!phoneUtil.isValidNumber(number)) {
          setIsNotValidPhone(true);
        } else {
          const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164);
          setPhone(phoneNumber);
          setIsNotValidPhone(false);
        }
      }
    }
  };

  const getOtp = async (e) => {
    e.preventDefault();
    const params = {
      phone: phone,
    };
    const response = await API.instance.post("/auth/login-otp", params);
    const data = response.data;
    if (data.status == 200) {
      setIsVerifyPhone(true);
      setMessage("");
      setIsNotRegistered(false);
    } else {
      setMessage(data.message);
      setIsNotRegistered(true);
    }
  };
  return (
    <>
      <Head>
        <title>Đăng nhập với SMS</title>
      </Head>
      {/* breadcrumb start */}
      {!isVerifyPhone && (
        <div className="login-page container-fluit">
          <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
            <div className={`right-login ${styles.marginForm} d-flex`}>
            <LeftForm />
              <div className={`theme-card ${styles.loginFormRight}`} style={{ width: "50%" }}>
                <div className="justify-content-center mt-4 mb-5 ml-3 mr-3">
                  <h3 className="text-center">Đăng Nhập</h3>
                </div>
                <Form className="theme-form ml-3 mr-3" onSubmit={getOtp}>
                  {isNotRegistered && (
                    <Alert style={{ textAlign: "center", height: "40px" }} variant={"danger"}>
                      {message}
                    </Alert>
                  )}
                  <div className="form-group mb-1">
                    <input
                      ref={inputPhone}
                      onChange={checkPhone}
                      type="text"
                      className="form-control"
                      placeholder="Nhập số điện thoại của bạn"
                      required=""
                      autoFocus
                    />
                  </div>
                  <div className="d-flex justify-content-end mb-5">
                    <div>
                      <Link href="/auth/login">
                        <a className={`${styles.textLink} text-primary`}>Đăng nhập mật khẩu</a>
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      disabled={isNotValidPhone}
                      className="btn btn-solid btn-block"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </Form>
                <div className="mt-5 mx-auto">
                  <h5 className={styles.textOr}>HOẶC TIẾP TỤC VỚI</h5>
                  <LoginSocail />
                </div>
                <Row className="mt-5 d-flex justify-content-center  ml-3 mr-3 mb-5">
                  <div className="">
                    <Link href="/auth/register">
                      <a className="text-primary">Tạo một tài khoản mới</a>
                    </Link>
                  </div>
                </Row>
              </div>
            </div>
          </Row>
        </div>
      )}

      {isVerifyPhone && (
        <div>
          <Breadcrumb
            previousLink="/auth/login-otp"
            previousValue="Đăng nhập"
            currentValue="Xác thực Otp"
          />
          <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
            <Otp phone={phone} type={otpEnums.LOGIN} />
          </Row>
        </div>
      )}
    </>
  );
}

LoginWithOtp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
