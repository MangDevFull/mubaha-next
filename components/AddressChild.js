import styles from "@/styles/account.module.css";
import {
  Col,
  Modal,
  ModalHeader,
  ModalFooter,
  Button
} from "reactstrap";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AddressTwo from "@/components/AddressTwo.js";
export default function AddressChild({ address,index,updateAddress,deleteAdd }) {
  const {data:session}=useSession()
  const [add, setAddress] = useState(address)
  const [show,setShow] = useState(false)
  const [isDelete,setIsDelete] = useState(false)
  const handleNotShow = (a) =>{
    if(a){
      setAddress(a)
    updateAddress(index,a)
    }
    setShow(false)
  }
  const hanldeShow = () =>{
    setShow(true)
  }
  const handleModalDelete = () =>{
    setIsDelete(!isDelete)
  }
  const deleteAddress = async () =>{
    const response = await fetch(`${process.env.API_ADDRESS_URL}/${address._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.accessToken
      },
    })
    const data = await response.json()
    if(data.status === 200) {
      deleteAdd(index)
    }
  }

  return (
    <>
     <Modal
                  className="mt-5"
                  isOpen={isDelete}
                  toggle={handleModalDelete}
                >
                  <ModalHeader toggle={handleModalDelete}>
                    Bạn có muốn xoá địa chỉ?
                  </ModalHeader>
                  <ModalFooter>
                    <Button
                      color="danger"
                      onClick={deleteAddress}
                    >
                      Đồng ý
                    </Button>
                    <Button onClick={handleModalDelete}>
                      Huỷ
                    </Button>
                  </ModalFooter>
                </Modal>
      <Col sm="9">
        <div className="box">
          <div className={`box-content ${styles.box_content}`}>
            <h6>
              <div className={`${styles.box_title}`}>Họ và tên:</div>
              <span>
                <strong>{add.fullName}</strong>
              </span>
              <span className={`${styles.note}`}>Địa chỉ giao hàng</span>
            </h6>
            <h6>
              <div className={`${styles.box_title}`}>Số điện thoại:</div>
              <span>{add.phone}</span>{" "}
            </h6>
            <h6>
              <div className={`${styles.box_title}`}>Địa chỉ:</div>
              <span>{add.details}{add.details && ', '}{add.fullAddress}</span>
            </h6>
          </div>
        </div>
      </Col>
      <Col sm="3">
        <div className="box">
          <div className={`${styles.box_function}`}>
            <h6>
              <a role="button"
              onClick={hanldeShow}
              >
                Sửa
              </a>
            </h6>
            <h6>
              <a role="button" onClick={handleModalDelete} style={{color:'red'}}>Xoá</a>
            </h6>
          </div>
        </div>
      </Col>
      <AddressTwo isOpen={show} handleNotShow={handleNotShow} address={address}/>
    </>
  )
}