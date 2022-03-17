
import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/account.module.css";
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

export default function Address({ isOpen, handleCloseCreateAdd }) {
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  useEffect(() => {
    async function fetchData() {
    const res = await fetch(`${process.env.API_LOCATION_URL}/provinces`)
   const data = await res.json()
   setProvinces(data.data)
    }
    fetchData()
  }, [isOpen])
  const handleDistrict = async (e) => {
    const id = e.target.value
    console.log(id)
    const res = await fetch(`${process.env.API_LOCATION_URL}/provinces/${id}/districts`)
    const data = await res.json()
    setDistricts(data.data)
    setWards([])
  }
  const handleWards = async (e) => {
    const id = e.target.value
    const res = await fetch(`${process.env.API_LOCATION_URL}/districts/${id}/wards`)
    const data = await res.json()
    setWards(data.data)
  }
  
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={isOpen}>
        <ModalHeader>
          Tạo địa chỉ mới
        </ModalHeader>
        <ModalBody className="container-fluid">
          <div className="col-md-12 mt-3">
            {showMessage &&
              <Alert style={{ textAlign: 'center', height: 'auto' }} variant={'danger'}>
                {message}
              </Alert>
            }
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
                      autoFocus
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
                    <select
                      className="form-control"
                      data-trigger
                      name="choices-single-groups"
                      required
                      onChange={handleDistrict}
                    >
                        <option value="">Chọn một tỉnh/thành phố</option>
                      {provinces.map((p) => {
                        return (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        )
                      })}
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
                    <select

                      className="form-control"
                      data-trigger
                      name="choices-single-groups"
                      onChange={handleWards}
                      required
                    >
                    <option value="">Chọn một quận/huyện</option>
                     {districts.map((p) => {
                        return (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="mb-3">
                    <label
                      htmlFor="choices-single-groups"
                      className="form-label font-size-13 text-muted"
                    >
                      Xã/Phường
                    </label>
                    <select
                      className="form-control"
                      data-trigger
                      name="choices-single-groups"
                      id="ward"
                      required
                    >
                     <option value="">Chọn một xã/phường</option>
                      {wards.map((p) => {
                        return (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <label htmlFor="message-text" className="col-form-label">
                    Địa chỉ chi tiết
                  </label>
                  <textarea
                    className="form-control"

                    required
                  />
                </div>
              </div>
            </form>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-secondary btn-lg" style={{ width: '120px', height: '50px' }}
            onClick={handleCloseCreateAdd}
          >
            Huỷ
          </Button>
          <button className="btn-solid btn">
            Tạo
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}