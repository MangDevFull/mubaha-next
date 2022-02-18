import Link from 'next/link'
import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/router';
import { Alert } from 'react-bootstrap'
import { signIn } from "next-auth/react";
import { Row, Form, Input, Col } from 'reactstrap';
import libphone from "google-libphonenumber";
import LoginSocail from '../../components/authen/LoginSocail.js'
import ImageAuthen from '../../components/authen/ImgaeAuthen.js'
import API from "../../services/api.js";
import Otp from "../../components/Otp.js";
import otpEnums from "../../utils/otpEnums.js";

const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();
export default function LoginPage() {

  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [isNotValidPhone, setIsNotValidPhone] = useState(true);
  const [isCreatePassword,setIsCreatePassword] = useState(false);
  const [isInvalid, setInvalid] = useState(false)
  const [message, setMessage] = useState('')
  const inputPhone = useRef();
  const inputPassword = useRef();
  const [showPass, setShowPass] = useState('block');
  const [hidePass, setHidePass] = useState('none')
  const [inputValues, setInputValues] = useState('password')
  const [phone,setPhone]= useState("")
  const router = useRouter();

  const handleShowPassword = () => {
    setHidePass('block');
    setShowPass('none')
    setInputValues('text')
  }
  const handlHidePassword = () => {
    setHidePass('none');
    setShowPass('block')
    setInputValues('password')
  }

  useEffect(() => {
    inputPhone.current.focus()
  },[])

  const checkPhone = (e) => {
    const phone = e.target.value
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
    e.preventDefault()
    if(inputPassword.current.value=="") {
      setMessage("Mật khẩu không được bỏ trống");
        setInvalid(true)
    }else{
      const res = await signIn("mubaha-login", {
        phone: inputPhone.current.value,
        password: inputPassword.current.value,
        redirect: false,
      });
      if (res.error == null) {
        router.push('/')
      } else {
        const data = JSON.parse(res.error)
          setMessage(data.message);
          setInvalid(true)
          setIsCreatePassword(false)
      }
    }
  }

  const createPassword = async () => {
    const phone = inputPhone.current.value
    var reg = /^\d+$/;
    if (!reg.test(phone)) {
      setIsCreatePassword(false)
      setMessage("Số điện thoại không hợp lệ");
      setInvalid(true)

    } else {
      if (phone.length < 2 || phone == null) {
        setIsCreatePassword(false)
        setMessage("Số điện thoại không hợp lệ");
        setInvalid(true)
      } else {
        const number = phoneUtil.parse(phone, "VN");
        if (!phoneUtil.isValidNumber(number)) {
          setMessage("Số điện thoại không hợp lệ");
          setInvalid(true)
          setIsCreatePassword(false)
        } else {
          const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164);
          setPhone(phoneNumber)
          const params = {
            phone: phoneNumber,
          };
          const response = await API.instance.post("/auth/login-otp", params);
          const data = response.data;
          if (data.status == 200) {
            console.log("data",data);
            setIsVerifyPhone(true);
            setMessage("");
          } else {
            setMessage(data.message);
            setInvalid(true)
          }
        }
      }
    }
  }

  return (
    <>
      <Head>
        <title>Đăng nhập với mật khẩu</title>
      </Head>
      { !isVerifyPhone 
      && 
      <div className="login-page container-fluit">

<Row className="background_login">
  <Col lg="7">
    <ImageAuthen />
  </Col>
  <Col lg="4" className="right-login mt-5 mb-5 container" >
    <div className="theme-card login_form" >
      <h5>Đăng Nhập</h5>
      <Form className="theme-form" onSubmit={getValueForm}>
        {isInvalid &&
          <Alert style={{ textAlign: 'center', height: '40px' }} variant={'danger'}>
            {message}
          </Alert>
        }
        {isCreatePassword &&
          <Alert style={{ textAlign: 'center', height: '70px' }} variant={'danger'}>
            <span>{message} </span>
            <br></br>
            <br></br>
            <a href="#" onClick={createPassword}>Đặt mật khẩu</a>
          </Alert>
        }
        <div className="form-group mb-1">
          <input ref={inputPhone}
            onChange={checkPhone}
            type="text" className="form-control" placeholder="Nhập số điện thoại của bạn" required="" />
        </div>
        <div className="form-group d-flex mb-1">
          <input type={inputValues} className="form-control"
            ref={inputPassword}
            placeholder="Nhập mật khẩu của bạn" required="" />
          <div onClick={handleShowPassword} style={{ display: showPass }} className="hide-show-password">
            <AiFillEye className="icon-password" />
          </div>
          <div onClick={handlHidePassword} style={{ display: hidePass }} className="hide-show-password">
            <AiFillEyeInvisible className="icon-password" />
          </div>
        </div>
        <button type='submit' disabled={isNotValidPhone} style={{ width: '100%', backgroundColor: '#f89922' }} className="btn btn-solid">Đăng nhập</button>
        <div className="d-flex justify-content-between" style={{ paddingTop: '10px' }}>
          <div >
            <Link href="#">
              <a className="text-link">Quên mật khẩu</a>
            </Link>
          </div>
          <div>
            <Link href="/auth/login-otp">
              <a className="text-link">Đăng nhập SMS</a>
            </Link>
          </div>
        </div>
      </Form>
      <div className="login-social mx-auto">
        <h5 className="text-or">HOẶC TIẾP TỤC VỚI</h5>
        <LoginSocail />
        <Row className='register'>
          <div className="mx-auto"> 
            <p className=''><span>Bạn chưa có tài khoản? </span>
              <Link href="/auth/register">
                <a >Đăng ký</a>
              </Link>
            </p>
          </div>
        </Row>
      </div>
    </div>
  </Col>
  <Col lg="1"></Col>
</Row>
<svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
  </symbol>
  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
  </symbol>
  <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </symbol>
</svg>

</div>
      }
    
      { isVerifyPhone && <Otp  phone={phone} type={otpEnums.CREATE_PASSWORD} />}
      {/*Section ends*/}
    </>
  )
}