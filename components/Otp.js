import OtpInput from 'react-otp-input';
import { Button, Modal,Alert } from 'react-bootstrap';
import Link from 'next/link'
import {useState} from 'react'
import API from '../services/api.js'
import { useRouter } from 'next/router'

export default function Otp({ show, handleClose,phone }) {
  const router = useRouter()
    const [otp,setOtp] = useState('')
    const [isInvalidOtp, setInvalidOtp] = useState(false);
    const handleOtp = async () =>{
      const params = {
        phone,
        code:otp
      }
      const response = await API.instance.post('/auth/verify-login-otp',params)
      const data = response.data
      if(data.status==200) {
        localStorage.setItem("userId", data.data.userId);
        localStorage.setItem("token", data.data.token);
        router.push('/')
      }else{
        setInvalidOtp(true)
        setOtp('')
      }
    }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Vui Lòng Nhập Mã Xác Minh
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br />
        <p style={{textAlign: 'center'}}>
          Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến số điện thoại
          </p>
           <p style={{fontSize:'20',textAlign:'center'}}><b>({phone})</b></p>
           {isInvalidOtp &&
           <Alert style={{textAlign:'center',height:'60px'}} variant={'danger'}>
          Mã xác minh không hợp lệ
          </Alert>
        }
        <div style={{ marginTop: '50px' }} className='container'>
          <OtpInput
            inputStyle={{
              width: "4em",
              height: "4em",
              // border: "none",
              borderBottom: "2 px solid black"
            }}
            containerStyle={{
              marginLeft: "90px",
              marginBottom: "20px",
            }}
            value={otp}
                  onChange={(number) => {
                    // setOTP(number.target.value);
                    setOtp(number);
                  }}
            numInputs={4}
            separator={<span>-</span>}
          />
        </div>
        <div style={{ marginTop: '60px' }} className="container">
          <p style={{ textAlign: 'center' }}>
            Bạn không nhận được mã?
            <br />
            <br></br>
            <span style={{ color: 'blue' }}>          <Link href="#">
              <a >          Gửi lại</a>

            </Link></span> hoặc
            <span style={{ color: 'blue' }} >

              <Link href="/auth/login">
                <a >           thử bằng phương thức xác minh khác</a>

              </Link>
            </span>

          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>

        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleOtp}>
          Xác thực
        </Button>

      </Modal.Footer>
    </Modal>
  )
}
