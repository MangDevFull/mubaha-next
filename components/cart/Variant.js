import {
 Button,
  PopoverHeader, UncontrolledPopover,
  PopoverBody
} from "reactstrap";
import productStatus from "@/enums/productStatus.enum.js"
import styles from "@/styles/cart.module.css"
import React, { useState } from "react";
import { useSession } from 'next-auth/react'
export default function Variant({item,vendorKey,updateProduct,productKey}) {
  const { data: session, status } = useSession()
  const [selectedVariant, setSelectedVariant] = useState(item.variant._id);
  const [selectSize, setSelectSize] = useState(item.attr?._id);
  const [isOpen, setIsOpen] = useState(false);
  const [sizes,setSizes] = useState(item.variant.attributes)
  const selectedColor = (variant) => {
    setSelectedVariant(variant);
    const rs = item.variants.filter(v =>{
      return v._id === variant
    })
    setSizes(rs[0].attributes)
  };
  const selectAttr = (e, s) => {
    setSelectSize(s)
  }
  const handleOpen = () => {
    setIsOpen(!isOpen)
    if(!isOpen) {
      setSelectedVariant(undefined)
      setSelectSize(undefined)
    }
  }
  const updateVariants = async (e,cartID,v,s) => {
    let body = {
      productId: item.productID
    }
    if(v !== undefined) {
      body = {
        ...body,
        selectedVariant : selectedVariant || v
      }
    }
    if(s !== undefined) {
      body = {
        ...body,
        selectedAttribute : selectSize || s
      }
    }
    const response = await fetch(`${process.env.API_CART_URL}/${cartID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.accessToken
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    if(data.status === 200){
      console.log("check",data.data)
      updateProduct(data.data,vendorKey,productKey)
      handleOpen()
    }
  }
  return (
    <>
      <div role='button' id={`PopoverClick${item.cartID}`}
        className={`mt-1
        ${item.isOutOfStock 
          ? 
          styles.disabled 
          : 
          item.isChanged || item.status == productStatus.DISABLE ? styles.pointer : ""
        }`}>
        <UncontrolledPopover
          placement="bottom"
          target={`PopoverClick${item.cartID}`}
          trigger="legacy"
          isOpen={isOpen}
          toggle={handleOpen}
        >
          <PopoverHeader>
            Lưạ chọn sản phẩm
          </PopoverHeader>
          <PopoverBody>
            <div className="product-right">
              <div className="product-count">
                <ul className="color-variant">
                  <div className="mb-1">
                    {item.variantLable}:
                  </div>
                  {item.variants.map((variant,vi) => {
                    return (
                      <>
                        <li className={`${variant.stock.quantity == 0 && variant.attributes.length == 0 ? styles.disabled : ""}`}
                          style={
                            selectedVariant === undefined ?
                              item.variant._id === variant._id ? {
                                border: "1px solid #ffa200",
                              }
                                : {}
                              : selectedVariant === variant._id ? {
                                border: "1px solid #ffa200",
                                color: "#ffa200",
                              }
                                : {}
                          }
                          key={vi}
                          checked={selectedVariant === variant._id}
                          onClick={() => selectedColor(variant._id)}
                        >
                          {variant.name}
                          <img style={
                            selectedVariant === undefined ?
                              item.variant._id === variant._id ? {
                                display: "block"
                              }
                                : {}
                              : selectedVariant === variant._id ? {
                                display: "block"
                              }
                                : {}
                          } className={`selected-indicator ${styles.tickImage}`} src="../assets/images/selected-variant-indicator.svg" alt="Selected"></img>
                        </li>
                      </>
                    )
                  })}

                </ul>
                {
                  item.attr
                  &&
                  <>
                    <ul className="color-variant">
                      <div className="mb-1">
                        {item.attributeLabel}:
                      </div>
                      <div className="d-flex">
                        {sizes.map((s,si) => (
                          <li
                          className={`${s.stock.quantity ==0 ? styles.disabled : ""}`}
                            style={
                              selectSize === '' ?
                                item.attr._id === s._id ? {
                                  border: "1px solid #ffa200",
                                  color: "#ffa200",
                                }
                                  : {}
                                : selectSize === s._id ? {
                                  border: "1px solid #ffa200",
                                  color: "#ffa200",
                                }
                                  : {}
                            }
                            key={si}
                            checked={selectSize === s._id}
                            onClick={(e) => selectAttr(e, s._id)}
                          >
                            {s.name}
                            <img style={
                              selectSize === undefined ?
                                item.attr._id === s._id ? {
                                  display: "block"
                                }
                                  : {}
                                : selectSize === s._id ? {
                                  display: "block"
                                }
                                  : {}

                            } className={`selected-indicator ${styles.tickImage}`} src="../assets/images/selected-variant-indicator.svg" alt="Selected"></img>
                          </li>
                        ))}
                      </div>
                    </ul>
                  </>

                }
              </div>
            </div>
          </PopoverBody>
          <div className="m-3 d-flex justify-content-end">
            <Button
              color="secondary"
              className="mr-3"
              onClick={handleOpen}
            >
              Huỷ
            </Button>
            <Button
              color="primary"
              onClick={(e)=> updateVariants(e,item.cartID,item.variant._id,item.attr?._id)}
            >
              Chọn
            </Button>
          </div>
        </UncontrolledPopover>
        Phân loại hàng: {item.variant.name}
        {
          item.attr ? `- ${item.attr.name}` : ''
        }
        <i className="fa fa-solid fa-caret-down ml-1"></i>
      </div>
    </>
  )
} 