import Link from 'next/link'
import { Modal } from 'react-bootstrap'
import { useState, useRef,useEffect } from 'react'
import { useRouter } from 'next/router'
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import {useSession} from 'next-auth/react'
import Breadcrumb from '../../components/Breadcrumb.js'
import { Form } from 'reactstrap';
export default function CreatePassWord() {
  const [show, setShow] = useState(false);
  const [showPass,setShowPass] = useState('block');
  const [hidePass,setHidePass] = useState('none')
  const [inputValues, setInputValues] = useState('password')
  const inputPassword = useRef();
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/')
    }
  })
  useEffect(() => {
   if(session != undefined) {
      const checkisCreatePass = session.user.authentication.isCreatedPassword 
    if(checkisCreatePass) {
      router.push('/')
    }
   }
  })

  const handleShowPassword = () =>{
    setHidePass('block');
    setShowPass('none')
    setInputValues('text')
  }
  const handlHidePassword = () => {
    setHidePass("none")
    setShowPass("block")
    setInputValues("password")
  }
  const handleCreatePass = async (e) => {
    e.preventDefault()
    const body = {
      password: inputPassword.current.value
    }
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.accessToken
      },
      body: JSON.stringify(body)

    }
    const response = await fetch(`${process.env.API_URL}/auth/create-password`,options)

    const data = await response.json()

    if (data.status == 200) {
      setShow(true)
      router.push("/")
    }
  }
  return (
    <>
           <Breadcrumb previousLink="/"
        previousValue="Trang chủ" currentValue="Tạo mật khẩu" />
      <section className="pwd-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <h2>Tạo mật khẩu cho tài khoản mới</h2>
              <p style={{textAlign: "center"}}>
                Tôi không muốn tạo mật khẩu, tôi chỉ muốn đăng nhập bằng SMS.
                <span style={{color: "red"}}>
                  <Link href="/">
                    <a> Quay lại trang chủ</a>
                  </Link>
                </span>
              </p>
              <Form className="theme-form" style={{marginTop: "10px"}} onSubmit={handleCreatePass}>
                <div className="form-row row">
                  <div className="col-md-12 d-flex">
  
                      <input type={inputValues} ref={inputPassword} className="form-control" placeholder="Nhập mật khẩu của bạn" required />
                    <div onClick={handleShowPassword} style={{display:showPass}} className="hide-show-password-2">
                      <AiFillEye className="icon-password" />
                      </div>
                     
                    <div onClick={handlHidePassword} style={{display:hidePass}} className="hide-show-password-2">
                      <AiFillEyeInvisible className="icon-password" />
                      </div>
    
          
                  </div>
                  <button className="btn btn-solid w-auto" type='submit'>
                    Tạo
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
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

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>

        <div className="alert alert-success d-flex justify-content-center align-items-center" role="alert">
          <svg
            className="bi flex-shrink-0 me-2"
            width={24}
            height={24}
            role="img"
            aria-label="Success:"
          >
            <use xlinkHref="#check-circle-fill" />
          </svg>
          <div style={{marginLeft:"10px"}}>Tạo mật khẩu thành công</div>
        </div>
        <Modal.Footer>
          <div>
            <p style={{marginRight: "10px",textAlign: "center"}}>
              Xin chờ một chút bạn đang được chuyển hướng đến sang trang chủ
            </p>
          </div>
        </Modal.Footer>
      </Modal>
      {/*Section ends*/}
    </>
  )
}