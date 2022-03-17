import styles from "@/styles/account.module.css";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
export default function AddressChild() {
  const handleShow = () => {
    setShow(true)
    setMessage("")
    setShowMessage(false)
  }
  return(
    <>
              <Col sm="9">
                <div className="box">
                  <div className={`box-content ${styles.box_content}`}>
                    <h6>
                      <div className={`${styles.box_title}`}>Họ và tên:</div>
                      <span>
                        <strong>Nguyễn Minh Quang</strong>
                      </span>
                      <span className={`${styles.note}`}>Địa chỉ giao hàng</span>
                    </h6>
                    <h6>
                      <div className={`${styles.box_title}`}>Số điện thoại:</div>
                      <span>(+84) 373922863</span>{" "}
                    </h6>
                    <h6>
                      <div className={`${styles.box_title}`}>Địa chỉ:</div>
                      <span>Thị Trấn Hồ, Huyện Thuận Thành, Bắc Ninh</span>
                    </h6>
                  </div>
                </div>
              </Col>
              <Col sm="3">
                <div className="box">
                  <div className={`${styles.box_function}`}>
                    <h6>
                      <a className={`${styles.update}`} href="#">
                        Sửa
                      </a>
                    </h6>
                    <h6>
                      <a href="#">Xoá</a>
                    </h6>
                  </div>
                </div>
              </Col>
    </>
  )
}