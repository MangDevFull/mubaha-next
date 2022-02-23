import Link from "next/link";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb.js";
import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";
import { signIn } from "next-auth/react";
import { Row, Form } from "reactstrap";
import libphone from "google-libphonenumber";
import LoginSocail from "../../components/authen/LoginSocail.js";
import Layout from "../../components/Layout";
import API from "../../services/api.js";
import Otp from "../../components/Otp.js";
import otpEnums from "../../enums/otpEnums.js";
import styles from '../../styles/authen.module.css'
import LeftForm from '../../components/authen/LeftForm.js'

const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();
export default function LoginPage() {
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [isNotValidPhone, setIsNotValidPhone] = useState(true);
  const [isCreatePassword, setIsCreatePassword] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [message, setMessage] = useState("");
  const inputPhone = useRef();
  const inputPassword = useRef();
  const [showPass, setShowPass] = useState("block");
  const [hidePass, setHidePass] = useState("none");
  const [inputValues, setInputValues] = useState("password");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleShowPassword = () => {
    setHidePass("block");
    setShowPass("none");
    setInputValues("text");
  };
  const handlHidePassword = () => {
    setHidePass("none");
    setShowPass("block");
    setInputValues("password");
  };

  const checkPhone = (e) => {
    const phone = e.target.value;
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
          setIsNotValidPhone(false);
        }
      }
    }
  };

  const getValueForm = async (e) => {
    e.preventDefault();
    if (inputPassword.current.value == "") {
      setMessage("Mật khẩu không được bỏ trống");
      setInvalid(true);
    } else {
      const res = await signIn("mubaha-login", {
        phone: inputPhone.current.value,
        password: inputPassword.current.value,
        redirect: false,
      });
      if (res.error == null) {
        router.push("/");
      } else {
        const data = JSON.parse(res.error);
        if (data.errors == null) {
          setMessage(data.message);
          setInvalid(true);
          setIsCreatePassword(false);
        } else {
          setMessage(data.message);
          setInvalid(false);
          setIsCreatePassword(true);
        }
      }
    }
  };

  const createPassword = async () => {
    const phone = inputPhone.current.value;
    var reg = /^\d+$/;
    if (!reg.test(phone)) {
      setIsCreatePassword(false);
      setMessage("Số điện thoại không hợp lệ");
      setInvalid(true);
    } else {
      if (phone.length < 2 || phone == null) {
        setIsCreatePassword(false);
        setMessage("Số điện thoại không hợp lệ");
        setInvalid(true);
      } else {
        const number = phoneUtil.parse(phone, "VN");
        if (!phoneUtil.isValidNumber(number)) {
          setMessage("Số điện thoại không hợp lệ");
          setInvalid(true);
          setIsCreatePassword(false);
        } else {
          const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164);
          setPhone(phoneNumber);
          const params = {
            phone: phoneNumber,
          };
          const response = await API.instance.post("/auth/login-otp", params);
          const data = response.data;
          if (data.status == 200) {
            // console.log("data", data);
            setIsVerifyPhone(true);
            setMessage("");
          } else {
            setMessage(data.message);
            setInvalid(true);
          }
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập với mật khẩu</title>
      </Head>
      {!isVerifyPhone && (
        <div className="login-page container-fluit">
          <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
            <div className={`right-login ${styles.marginForm} d-flex`}>
              <LeftForm />
              <div className={`theme-card ${styles.loginFormRight}`} style={{ width: "50%" }}>
                <div className="justify-content-center mt-4 mb-5 ml-3 mr-3">
                  <h3 className="text-center">Đăng Nhập</h3>
                </div>
                <Form className="theme-form ml-3 mr-3" onSubmit={getValueForm}>
                  {isInvalid && (
                    <Alert style={{ textAlign: "center", height: "40px" }} variant={"danger"}>
                      {message}
                    </Alert>
                  )}
                  {isCreatePassword && (
                    <Alert style={{ textAlign: "center", height: "70px" }} variant={"danger"}>
                      <span>{message}</span>
                      <br></br>
                      <br></br>
                      <a href="#" onClick={createPassword}>
                        Đặt mật khẩu
                      </a>
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
                  <div className="form-group mb-1">
                    <div className="d-flex" style={{ position: "relative" }}>
                      <input type={inputValues} className="form-control"
                        ref={inputPassword}
                        placeholder="Nhập mật khẩu của bạn"
                        required=""
                      />
                      <div
                        onClick={handleShowPassword}
                        style={{ display: showPass }}
                        className={styles.hideShowPassword}
                      >
                        <AiFillEye className={styles.iconPassword} />
                      </div>
                      <div
                        onClick={handlHidePassword}
                        style={{ display: hidePass }}
                        className={styles.hideShowPassword}
                      >
                        <AiFillEyeInvisible className={styles.iconPassword} />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-5">
                      <div>
                        <Link href="#">
                          <a className={`${styles.textLink} text-secondary`}>Quên mật khẩu?</a>
                        </Link>
                      </div>
                      <div>
                        <Link href="/auth/login-otp">
                          <a className={`${styles.textLink} text-primary`}>Đăng nhập SMS</a>
                        </Link>
                      </div>
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
                  <div>
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
            previousLink="/auth/login"
            previousValue="Trang đăng nhập"
            currentValue="Xác thực Otp"
          />
          <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
            <Otp phone={phone} type={otpEnums.CREATE_PASSWORD} />
          </Row>
        </div>
      )}
      {/*Section ends*/}
    </>
  );
}

LoginPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
