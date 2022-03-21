import React, { useState ,useEffect,useRef} from "react";
import { getSession } from 'next-auth/react';
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import Layout from "@/components/LayoutCart";
import CommonLayout from "../../components/shop/CommonLayout";
import styles from "@/styles/account.module.css";
import AddressChild from '@/components/AddressChild.js';
import Address from "@/components/Address";
const Account = ({data}) => {
  const [address,setAddress] = useState([])
  const [accountInfo, setAccountInfo] = useState(false);
  const [createAdd,setCreateAdd] = useState(false);
  const handleCreateAdd = () => {
    setCreateAdd(true)
  }
  useEffect(()=>{
    setAddress(data)
  },[])
  const handleCloseCreateAdd = (add,isDefault) => {
    if(add){
      if(isDefault){
        address.forEach(add => {
          if(add.isDefault===true){
            add.isDefault = false
          }
        })
      }
      address.unshift(add)
      setAddress([...address])
    }
    setCreateAdd(false)
  }
  const updateAddress = (i,add) => {
    address[i] = add
    setAddress([...address])
  }
  const deleteAddress = (i)=>{
    address.splice(i, 1)
    setAddress([...address])
  }
  const updateDefaultAddress = (i,add)=>{
    address.forEach(add => {
      if(add.isDefault===true){
        add.isDefault = false
      }
    })
    address[i] = add
    setAddress([...address])
  }
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
                        <button  style={{width:"auto"}}
                        onClick={handleCreateAdd}
                        >
                        <i className="fa fa-solid fa-plus mr-1"></i>
                        Thêm địa chỉ
                        </button>
                      </div>
                    </div>

                    <div className="box-account box-info">
                      <div className="box">
                        <div className="box-title"></div>
                      </div>
                      <Row className={`${styles.box_address}`}>
                      {data.length > 0 ?
                        address.map((a,i) => {
                          return(
                            <AddressChild key={i} address={a} index={i} updateAddress={updateAddress} deleteAdd={deleteAddress} updateDefaultAddress={updateDefaultAddress} />
                            )
                      })
                      :
                      "Bạn chưa có địa chỉ nào"
                      }
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      <Address isOpen={createAdd} handleCloseCreateAdd={handleCloseCreateAdd} isExist={address.length} />
      </CommonLayout>
    </>
  );
};

Account.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Account;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  const res = await fetch(process.env.API_ADDRESS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + session.accessToken
    },
  })

  const data = await res.json()
  return { props: { data:data.data } }
}
