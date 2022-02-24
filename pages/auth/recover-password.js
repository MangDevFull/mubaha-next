import Head from "next/head";
import Layout from "@/components/Layout";
import Breadcrumb from '@/components/Breadcrumb.js'
import { Container, Row, Form, Col, Alert } from 'reactstrap';
import { useState } from 'react'
import libphone from "google-libphonenumber";
import API from "@/services/api.js"
import dynamic from 'next/dynamic'
import styles from "@/styles/authen.module.css";
import otpEnums from "../../enums/otpEnums.js";
const { PhoneNumberUtil, PhoneNumberFormat } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();

const DynamicComponent = dynamic(() => import('@/components/Otp.js'))

export default function RecoverPassword() {
  const [isNotValidPhone, setIsNotValidPhone] = useState(true);
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("")
  const [showError, setShowError] = useState(false);
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
  const handlePhone = async (e) => {
    e.preventDefault();
    const params = {
      phone: phone
    }

    const response = await API.instance.post('/auth/recover-password', params)
    const data = response.data

    if (data.status == 200) {
      setIsVerifyPhone(true);
    } else {
      setMessage(data.message);
      setShowError(true)
    }


  }
  return (
    <>
      <Head>
        <title>Lấy lại mật khẩu</title>
      </Head>
      {
        !isVerifyPhone
        &&
        (
          <div>
            <Breadcrumb previousLink="/auth/login"
              previousValue="Trang đăng nhập" currentValue="Lấy lại mật khẩu" />
            <section className="pwd-page section-b-space">
              <Container>
                <Row>
                  <Col lg="6" className="m-auto">
                    <h2>Đặt Lại Mật Khẩu</h2>
                    {showError && (
                      <Alert style={{ textAlign: "center", height: "auto" }} color="danger">
                        {message}
                      </Alert>
                    )}
                    <Form className="theme-form" onSubmit={handlePhone}>
                      <Row>
                        <Col md="12">
                          <input type="tel"
                            className="form-control"
                            onChange={checkPhone}
                            placeholder="Nhập số điện thoại của bạn"
                          />
                        </Col>
                        <button className="btn btn-solid" disabled={isNotValidPhone}>Tiếp theo</button>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        )
      }
      {isVerifyPhone && (
        <div>
          <Breadcrumb
            previousLink="/auth/recover-password"
            previousValue="Lấy lại mật khẩu"
            currentValue="Xác thực Otp"
          />
          <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
            <DynamicComponent phone={phone} type={otpEnums.RECOVER_PASSWORD} />
          </Row>
        </div>
      )}
    </>
  )
}

RecoverPassword.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};