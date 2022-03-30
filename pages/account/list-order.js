import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Container, Row, Col, Button } from "reactstrap";
import styles from "@/styles/account.module.css";
import AddressChild from "@/components/AddressChild.js";
import Address from "@/components/Address";
import Layout from "@/components/profile/Layout.js";
import Head from "next/head";
import { AiOutlineSearch, AiOutlineQuestionCircle } from "react-icons/ai";
import { FaStore, FaShuttleVan, FaRegMoneyBillAlt } from "react-icons/fa";

const ListOrder = () => {
  return (
    <>
      <div className="dashboard-right">
        <div className="d-flex flex-column">
          <div className="dashboard">
            <div className="d-flex justify-content-between align-items-center">
              <div className="page-title">
                <Button variant="light">Tất cả đơn hàng</Button>
              </div>
            </div>
          </div>
          <div
            className="d-flex mt-3 mb-3 align-items-center p-3 rounded"
            style={{ backgroundColor: "#eaeaea", fontSize: "15px" }}
          >
            <AiOutlineSearch size="22px" color="#bbb" />
            <input
              style={{ backgroundColor: "#eaeaea" }}
              className="border-0 flex-grow-1 pl-2"
              placeholder="Tìm kiếm theo Tên sản phẩm, ID đơn hàng hoặc Tên Shop"
            />
          </div>

          <div className="dashboard">
            <div className="d-flex flex-column">
              <div>
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <div>
                      <img src="/assets/icon/shop-icon.png" className="mr-2" />
                    </div>
                    <div className="mx-2">
                      <span>
                        <strong>HaKiHa Store</strong>{" "}
                      </span>{" "}
                    </div>
                    <Button
                    size="sx"
                      style={{ color: "#f89922", background: "#fff", border: "1px solid #f89922" }}
                      className="d-flex flex-row align-items-center"
                    >
                      <FaStore />
                      <span className="mx-2 font-weight-normal">Xem Shop</span>
                    </Button>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="d-flex flex-row align-items-center border-right border-dark mr-2">
                      <FaShuttleVan className="mx-2" color="" />
                      <span>Đơn hàng đã xuất kho</span>
                      <div className="mx-2">
                        <AiOutlineQuestionCircle />
                      </div>
                    </div>
                    <div>
                      <span style={{ textTransform: "uppercase", color: "#f89922" }}>
                        đang giao
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-top my-3"></div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      className="border mr-3"
                      width="85vw"
                      src="https://cf.shopee.vn/file/23048f66bc2ca1bb64d151e6c7457adb_tn"
                    />
                    <div className="d-flex flex-column justify-content-between p-2">
                      <h4 className="mb-0" style={{ lineHeight: "1.3" }}>
                        Dưỡng Môi Mắt NacoBeauty Thanh lăn khử thâm làm hồng môi mắt kem mắt môi
                      </h4>
                      <span>Phân loại hàng: Combo 3 món</span>
                      <p className="mb-0">Số lượng: x1</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <del className="mx-1">
                      <span class="money ml-1">
                        <span>415,744₫</span>
                      </span>
                    </del>
                    <span>337.000₫</span>
                  </div>
                </div>
              </div>

              <div class="border-top my-3"></div>
              <div className="d-flex justify-content-end align-items-center">
                <FaRegMoneyBillAlt />
                <div className="p-2">Tổng số tiền:</div>
                <h3 className="mb-0">₫344.000</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ListOrder.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ListOrder;
