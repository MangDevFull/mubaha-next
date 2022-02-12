import OtpInput from 'react-otp-input';
import { Button,Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import Link from 'next/link'
export default function Otp({show,handleClose}) {
  return(
  <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>
    Vui Lòng Nhập Mã Xác Minh

    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <br />
    <p>
    Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến điện thoại của bạn
    </p>
    <div  style={{marginTop:'50px'}} className='container'>
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
            onChange={(number) => {
              // setOTP(number.target.value);
              setOTP(number);
            }}
            numInputs={4}
            separator={<span>-</span>}
          />
          </div>
          <div style={{marginTop:'60px'}} className="container">
          <p style={{textAlign:'center'}}>
          Bạn không nhận được mã?
          <br />
          <br></br>
          <span style={{color:'blue'}}>          <Link href="#">
  <a >          Gửi lại</a>
   
  </Link></span> hoặc
          <span style={{color:'blue'}} >

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
    <Button variant="primary" onClick={handleClose}>
      Đăng nhập
    </Button>

  </Modal.Footer>
</Modal>
)
}
