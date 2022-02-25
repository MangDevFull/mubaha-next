import Head from "next/head";
import { useState, useRef,useEffect } from "react";
import libphone from "google-libphonenumber";
import API from "@/services/api.js";
import { Alert } from "react-bootstrap";
import { Row, Form } from "reactstrap";
import Layout from "@/components/Layout";
const { PhoneNumberFormat } = libphone;
import otpEnums from "../../enums/otpEnums.js";
import styles from "@/styles/authen.module.css";
import dynamic from 'next/dynamic'
import BottomFormRegister from "@/components/authen/BottomFormRegister.js";

const DynamicOtpComponent = dynamic(() => import('@/components/Otp.js'));
const DynamicBreadcrumbComponent = dynamic(() => import('@/components/Breadcrumb.js'));
const DynamicLayoutAuthComponent = dynamic(() => import('@/components/authen/LayoutAuth.js'));

const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();

export default function RegisterPage() {
  const [isNotValidPhone, setIsNotValidPhone] = useState(true);
  const [phone, setPhone] = useState("");
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [isRegisted, setIsRegisted] = useState(false);
  const [message, setMessage] = useState("");
  const inputPhone = useRef();
  const checkPhone = (e) => {
    phone = e.target.value;
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
  };

  const getOtp = async (e) => {
    e.preventDefault();
    const params = {
      phone,
    };
    const response = await API.instance.post("/auth/register-otp", params);
    const data = response.data;
    if (data.status == 200) {
      setIsVerifyPhone(true);
    } else {
      setMessage(data.message);
      setIsRegisted(true);
    }
  };
  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>
      {!isVerifyPhone && (
        <DynamicLayoutAuthComponent
        title="Đăng ký"
        form={
          <Form className="theme-form ml-3 mr-3" onSubmit={getOtp}>
                  {isRegisted && (
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
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      disabled={isNotValidPhone}
                      className="btn btn-solid btn-block"
                    >
                      Đăng Ký
                    </button>
                  </div>
                </Form>
        }
        bottom={<BottomFormRegister />}
         />
               

      )}
      {isVerifyPhone && (
        <div>
          <DynamicBreadcrumbComponent
     previousLink="/auth/register"
            previousValue="Đăng ký"
            currentValue="Xác thực Otp"
         />
          <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
          <DynamicOtpComponent
          phone={phone} type={otpEnums.REGISTRATION}
           />
          </Row>
        </div>
      )}
    </>
  );
}

RegisterPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
