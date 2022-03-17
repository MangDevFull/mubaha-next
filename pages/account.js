import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
} from "reactstrap";
import Layout from "@/components/LayoutCart";
import CommonLayout from "../components/shop/CommonLayout";
import styles from "../styles/account.module.css";

const Account = () => {
  const [accountInfo, setAccountInfo] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log("check");
    setShow(true);
    setMessage("");
    setShowMessage(false);
  };
  return (
    <>
      <CommonLayout parent="Trang chủ" title="Tài khoản">
        <section className="section-b-space">
          <Container>
            <Row>
              <Col lg="3">
                <div className="dashboard-left" style={accountInfo ? { left: "0px" } : {}}>
                  <div
                    className="collection-mobile-back"
                    onClick={() => setAccountInfo(!accountInfo)}
                  >
                    <span className="filter-back">
                      <i className="fa fa-angle-left" aria-hidden="true"></i> back
                    </span>
                  </div>
                  <div className="block-content">
                    <ul>
                      <li className="active">
                        <a href="#">Địa chỉ</a>
                      </li>
                      <li>
                        <a href="#">Address Book</a>
                      </li>
                      <li>
                        <a href="#">My Orders</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg="9">
                <div className="dashboard-right">
                  <div className="dashboard">
                    <div className={`${styles.section_header}`}>
                      <div className={`page-title ${styles.title}`}>
                        <h2>Địa chỉ của tôi</h2>
                      </div>
                      <div className={`${styles.add_address}`}>
                        <button onClick={handleShow}>Thêm địa chỉ</button>
                      </div>
                    </div>

                    <div className="box-account box-info">
                      <div className="box">
                        <div className="box-title"></div>
                      </div>
                      <Row className={`${styles.box_address}`}>
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
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered isOpen={show}>
          <ModalHeader>Cập nhật địa chỉ</ModalHeader>
          <ModalBody className="container-fluid">
            <div className="col-md-12 mt-3">
              {showMessage && (
                <Alert style={{ textAlign: "center", height: "auto" }} variant={"danger"}>
                  {message}
                </Alert>
              )}
            </div>
            <Row className="p-5">
              <form id="add_address">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="productname">Họ và tên</label>
                      <input
                        name="productname"
                        type="text"
                        className="form-control productname"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="number_phone">Số điện thoại</label>
                      <input
                        name="number_phone"
                        type="text"
                        className="form-control number_phone"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="mb-3">
                      <label
                        htmlFor="choices-single-groups"
                        className="form-label font-size-13 text-muted"
                      >
                        Tỉnh/Thành phố
                      </label>
                      <select className="form-control" name="choices-single-groups" required>
                        <option value="">Chọn một tỉnh/thành phố</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="mb-3">
                      <label
                        htmlFor="choices-single-groups"
                        className="form-label font-size-13 text-muted"
                      >
                        Quận/Huyện
                      </label>
                      <select className="form-control" name="choices-single-groups" required>
                        <option value="">Chọn một quận/huyện</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-secondary btn-lg"
              style={{ width: "120px", height: "50px" }}
              onClick={handleClose}
            >
              Huỷ
            </Button>
            <button className="btn-solid btn">Cập nhật</button>
          </ModalFooter>
        </Modal>
      </CommonLayout>
    </>
  );
};

Account.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Account;
