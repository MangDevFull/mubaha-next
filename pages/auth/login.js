import Link from "next/link";
import Head from "next/head";
import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Row, Form, Alert } from "reactstrap";
import libphone from "google-libphonenumber";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
import otpEnums from "../../enums/otp.enum.js";
import styles from "@/styles/authen.module.css";
import BottomFornLogin from "@/components/authen/BottomFornLogin.js";
import dynamic from 'next/dynamic'

const DynamicOtpComponent = dynamic(() => import('@/components/Otp.js'));
const DynamicBreadcrumbComponent = dynamic(() => import('@/components/Breadcrumb.js'));
const DynamicLayoutAuthComponent = dynamic(() => import('@/components/authen/LayoutAuth.js'));

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
        const getProduct = localStorage.getItem('addToCart')
        if(getProduct != null){
          localStorage.removeItem("addToCart");
          router.push(getProduct)
        }else{
          router.push('/')
        }
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
          // const response = await API.instance.post("/auth/login-otp", params);
          // const data = response.data;
          const response = await fetch(`${process.env.API_AUTH_URL}/login-otp`, {
            method: "POST",
            body: JSON.stringify(params),
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json()
          if (data.status == 200) {
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
        <DynamicLayoutAuthComponent
          title="Đăng nhập"
          form={
            <Form className="theme-form ml-3 mr-3" onSubmit={getValueForm}>
              {isInvalid && (
                <Alert style={{ textAlign: "center", height: "auto" }} variant={"danger"}>
                  {message}
                </Alert>
              )}
              {isCreatePassword && (
                <Alert style={{ textAlign: "center", height: "auto" }} variant={"danger"}>
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
                    <Link href="/auth/recover-password">
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
          }
          bottom={<BottomFornLogin />} />
      )}

      {isVerifyPhone && (
        <div>
        <HeaderAuthen />
        <DynamicBreadcrumbComponent
        previousLink="/auth/login"
            previousValue="Trang đăng nhập"
            currentValue="Xác thực Otp"
         />
          <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
          <DynamicOtpComponent
          phone={phone} type={otpEnums.CREATE_PASSWORD}
           />
          </Row>
          <Footer />
        </div>
      )}
    </>
  );
}


