import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import Link from "next/link";
import {
  Container, Row, Col, Media, Button, Card, CardBody, CardHeader,
  CardFooter, Modal, ModalFooter, ModalHeader, PopoverHeader, UncontrolledPopover,
  PopoverBody
} from "reactstrap";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Breadcrumb from "./Breadcrumb";
import styles from "@/styles/cart.module.css"
import API from '@/services/api.js';
const CartPage = ({ data, totalP }) => {
  const [products, setProduct] = useState(data)
  const [totalProduct, setTotalProduct] = useState(totalP)
  const [isSelectedAll, setIsSelectedAll] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalProductSelect, setTotalProductSelect] = useState(0)
  const [isOpenModalDeleteProduct, setIsOpenModalDeleteProduct] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState();
  const [sizes, setSizes] = useState([]);
  const [selectSize, setSelectSize] = useState();
  const router = useRouter();

  const handleMinusQuantity = async (i, index, quantity, cartID) => {
    if (products[i].products[index].quantity >= 2) {
      let body = {
        amount: quantity - 1,
        productID: products[i].products[index].productID
      }
      if (products[i].products[index].variant) {
        body = {
          ...body,
          variant: products[i].products[index].variant._id
        }
      }
      if (products[i].products[index].attr) {
        body = {
          ...body,
          size: products[i].products[index].size._id
        }

      }
      const response = await fetch(`${process.env.API_CART_URL}/updateCart/${cartID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + session.accessToken
        },
        body: JSON.stringify(body)
      })

      console.log(response)
      const data = await response.json()

      if (data.status === 200) {
        products[i].products[index].quantity = products[i].products[index].quantity - 1
        setProduct([...products])
      } else if (data.status === 400) {
        alert(data.message)
      }
    }
  }
  const handlePlusQuantity = async (i, index, quantity, cartID) => {

    let body = {
      amount: quantity + 1,
      productID: products[i].products[index].productID
    }
    if (products[i].products[index].variant) {
      body = {
        ...body,
        variant: products[i].products[index].variant._id
      }
    }
    if (products[i].products[index].attr) {
      body = {
        ...body,
        size: products[i].products[index].size._id
      }

    }
    const response = await fetch(`${process.env.API_CART_URL}/updateCart/${cartID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.accessToken
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (data.status === 200) {
      products[i].products[index].quantity = products[i].products[index].quantity + 1
      setProduct([...products])
    } else if (data.status === 400) {
      alert(data.message)
    }
  }
  const removeFromCart = async (i, index, cartID) => {
    const response = await fetch(`${process.env.API_CART_URL}/deleteCart/${cartID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.accessToken
      },
    })
    const data = await response.json()

    if (data.status == 200) {
      if (index > -1) {
        products[i].products.splice(index, 1);
      }
      if (products[i].products.length === 0) {
        products.splice(i, 1);
      }
      setProduct([...products])
    }

  }
  const handleSelectProduct = (i, index) => {
    products[i].products[index].selected = !products[i].products[index].selected;
    const selectAllVendor = products[i].products.filter((p) => {
      return p.selected !== true
    })
    if (selectAllVendor.length < 1) {
      products[i].selected = true
    } else {
      products[i].selected = false
    }

    const selectAll = products.filter((p) => {
      return p.selected !== true
    })
    if (selectAll.length < 1) {
      setIsSelectedAll(true)
    } else {
      setIsSelectedAll(false)
    }
    setProduct([...products])
  }
  const handleSelectVendor = (i) => {
    console.log(products[i].selected)
    products[i].selected = !products[i].selected
    products[i].products.forEach((p) => {
      p.selected = products[i].selected
    })
    const selectAll = products.filter((p) => {
      return p.selected !== true
    })
    if (selectAll.length < 1) {
      setIsSelectedAll(true)
    } else {
      setIsSelectedAll(false)
    }
    setProduct([...products])
  }
  const selectAllProduct = () => {
    setIsSelectedAll(!isSelectedAll)
    products.forEach((product, i) => {
      product.selected = !isSelectedAll
      product.products.forEach((p, index) => {
        products[i].products[index].selected = !isSelectedAll;
      })
    })
    setProduct([...products])
  }

  useEffect(() => {
    let amount = 0
    let total = 0
    products.forEach((product) => {
      let t = 0
      let a = 0
      product.products.forEach((p) => {
        if (p.selected == true) {
          if (p.variant != null && p.attr == null) {
            a += 1
            t += p.variant.price * p.quantity
          } else if (p.attr != null && p.variant != null) {
            t += p.size.price * p.quantity
            a += 1
          } else {
            t += p.price * p.quantity
            a += 1
          }
        }
      })
      total += t
      amount += a
    })
    setTotalProductSelect(amount)
    setTotalPrice(total)
  }, [products])
  const deleteManyCartItem = async () => {
    let cartItems = []
    products.forEach((product) => {
      product.products.forEach((p) => {
        if (p.selected === true) {
          cartItems = [...cartItems, p.cartID]
        }
      })
    })
    const response = await fetch(`${process.env.API_CART_URL}/deleteMany`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.accessToken
      },
      body: JSON.stringify({ cartItems: cartItems })
    })
    const data = await response.json()

    if (data.status === 200) {
      products.forEach((product, i) => {
        const pr = product.products.filter((p) => {
          return !cartItems.includes(p.cartID)
        })
        if (pr.length < 1) {
          products.splice(i, 1);
        } else {
          console.log('pr', pr)
          products[i] = {
            vendor: product.vendor,
            selected: false,
            totalDocs: product.totalDocs,
            products: pr
          }
        }
      })
      setProduct([...products])
      setIsOpenModalDeleteProduct(false)
    } else {
      alert(data.message)
    }
  }
  const handleModalDeleteMany = () => {
    if (totalProductSelect < 1) {
      alert(' Vui lòng chọn sản phẩm')
    } else {
      setIsOpenModalDeleteProduct(!isOpenModalDeleteProduct)
    }
  }
  const selectedColor = (e, variant, variants) => {
    setSelectedVariant(variant);
    if (variants[0].sizes.length > 0) {
      const rs = variants.filter((v) => {
        return v._id == variant
      })
      setSizes(rs[0].sizes)
    } else {
      setSizes([])
    }
  };
  const selectAttr = () => {

  }

  if (products.length > 0) {
    return (
      <div>
        <Breadcrumb previousLink="/" currentValue={'Giỏ hàng'} previousValue="Trang chủ" />
        <section className={`cart-section section-b-space pt-0 ${styles.backgroundFull}`}>
          <div>
          </div>
          <Container>
            <Row>
              <Col sm="12">
                <div className="mb-3">
                  <table className="table cart-table table-responsive-xs">
                    <thead style={{ border: 'none' }}>
                      <tr className={`${styles.backgroundHead}`}>
                        <th scope="col">
                          <div className="mt-4 mb-3">
                            <input
                              type="checkbox"
                              checked={isSelectedAll}
                              onClick={selectAllProduct}
                            />
                          </div>
                        </th>
                        <th scope="col" colSpan="2">
                          <div className="mt-4 mb-3 ml-5">Sản phẩm</div>
                        </th>
                        <th scope="col">
                          <div className="mt-4 mb-3 ml-5">
                            Giá
                          </div>
                        </th>
                        <th scope="col">
                          <div className="mt-4 mb-3 ml-2">
                            Số lượng
                          </div>
                        </th>
                        <th scope="col">
                          <div className="mt-4 mb-3 ml-2">
                            Số Tiền
                          </div>
                        </th>
                        <th scope="col">
                          <div className="mt-4 mb-3">
                            Thao Tác
                          </div></th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className={`${styles.vendorPart} p-3`}>
                  {products.map((p, i) => {
                    return (
                      <Card key={i} style={{ border: 'none' }}>
                        <CardHeader style={{ backgroundColor: 'white' }}>
                          <div className="mt-3 mb-2">
                            <input type="checkbox"
                              className="mr-4 mt-5"
                              checked={p.selected}
                              onClick={() => { handleSelectVendor(i) }}
                            />
                            <img src="/assets/icon/shop-icon.png" className="mr-2" />
                            <Link href={`/vendors/${p.vendor.owner.username}`}>
                              <strong className={styles.cursorVendor}>{p.vendor.brandName}</strong>
                            </Link>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <table className="ml-3">
                            {p.products.map((item, index) => {
                              console.log(item);
                              return (
                                <tbody key={index}>
                                  <tr>
                                    <td className="d-flex">
                                      <input type="checkbox"
                                        className="mr-4 mt-5"
                                        checked={item.selected}
                                        onClick={() => handleSelectProduct(i, index)}
                                      />
                                      <Link href={`/${item.slug}`}>
                                        <a>
                                          <Media
                                            src={item.variant.image}
                                            alt="mubaha.com"
                                          />
                                        </a>
                                      </Link>
                                    </td>
                                    <td>
                                      <Link href={`/${item.slug}`}>
                                        <strong className={styles.cursorVendor}>{item.name}</strong>
                                      </Link>
                                      {
                                        item.variant &&
                                        <div role='button' id={`PopoverClick${index}`} className="mt-1">
                                          <UncontrolledPopover
                                            placement="bottom"
                                            target={`PopoverClick${index}`}
                                            trigger="legacy"
                                            style={{ border: 'none' }}
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
                                                    {item.variants.map((variant, i, arr) => {
                                                      return (
                                                        <>
                                                          <li
                                                            style={
                                                              selectedVariant === undefined ?
                                                                item.variant._id === variant._id ? {
                                                                  border: "1px solid #ffa200",
                                                                  color: "#ffa200",
                                                                }
                                                                  : {}
                                                                : selectedVariant === variant._id ? {
                                                                  border: "1px solid #ffa200",
                                                                  color: "#ffa200",
                                                                }
                                                                  : {}
                                                            }
                                                            key={variant._id}
                                                            checked={selectedVariant === variant._id}
                                                            onClick={(e) => selectedColor(e, variant._id, item.variants)}
                                                          >
                                                            {variant.name}
                                                            <img style={
                                                              selectedVariant === undefined ?
                                                                item.variant._id === variant._id  ? {
                                                                  display: "block"
                                                                }
                                                                : {}
                                                                : selectedVariant === variant._id  ? {
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
                                                    item.size
                                                      ?
                                                      <>
                                                        <ul className="color-variant">
                                                          <div className="mb-1">
                                                            {item.attributeLabel}:
                                                          </div>
                                                          {item.variants[item.variants.indexOf(item.variant)].sizes.map((s) => (
                                                            <li
                                                              style={
                                                                item.attr._id === s._id ? {
                                                                  border: "1px solid #ffa200",
                                                                  color: "#ffa200",
                                                                }
                                                                  : {}

                                                              }
                                                              key={s._id}
                                                              checked={selectSize === s._id}
                                                              onClick={(e) => selectAttr(e, s._id)}
                                                            >
                                                              {s.name}
                                                              <img style={
                                                                selectSize === s._id
                                                                  ? {
                                                                    display: "block"
                                                                  }
                                                                  : {}
                                                              } className={`selected-indicator ${styles.tickImage}`} src="../assets/images/selected-variant-indicator.svg" alt="Selected"></img>
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      </>
                                                      :
                                                      sizes.length > 0
                                                      &&
                                                      <>
                                                        <ul className="color-variant">
                                                          <div className="mb-1">
                                                            {item.attributeLabel}:
                                                          </div>
                                                          {sizes.map((s) => (
                                                            <li
                                                              style={
                                                                
                                                                   selectSize === s._id ? {
                                                                    border: "1px solid #ffa200",
                                                                    color: "#ffa200",
                                                                  }
                                                                    : {}
                                                              }
                                                              key={s._id}
                                                              checked={selectSize === s._id}
                                                              onClick={(e) => selectAttr(e, s._id)}
                                                            >
                                                              {s.name}
                                                              <img style={
                                                                selectSize === s._id
                                                                  ? {
                                                                    display: "block"
                                                                  }
                                                                  : {}
                                                              } className={`selected-indicator ${styles.tickImage}`} src="../assets/images/selected-variant-indicator.svg" alt="Selected"></img>
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      </>
                                                  }
                                                </div>
                                              </div>
                                            </PopoverBody>
                                          </UncontrolledPopover>
                                          Phân loại hàng: {item.variant.name}
                                          {
                                            item.attr ? `- ${item.attr.name}` : ''
                                          }
                                          <i className="fa fa-solid fa-caret-down ml-1"></i>
                                        </div>
                                      }
                                    </td>
                                    <td>
                                      <h2>
                                        <NumberFormat
                                          value={item.variant.price || item.price}
                                          thousandSeparator={true}
                                          displayType="text"
                                          suffix={item.currencySymbol}
                                          decimalScale={0}
                                        />

                                      </h2>
                                    </td>
                                    <td>
                                      <div className="qty-box">
                                        <div className="input-group">
                                          <span className="input-group-prepend">
                                            <button
                                              type="button"
                                              className="btn quantity-left-minus"
                                              onClick={() => handleMinusQuantity(i, index, item.quantity, item.cartID)}
                                            >
                                              <i className="fa fa-minus"></i>
                                            </button>
                                          </span>
                                          <input
                                            type="text"
                                            name="quantity"
                                            value={item.quantity}
                                            min={1}
                                            className="form-control input-number"
                                          />
                                          <span className="input-group-prepend">
                                            <button
                                              type="button"
                                              className="btn quantity-right-plus"
                                              onClick={() => handlePlusQuantity(i, index, item.quantity, item.cartID)}
                                            >
                                              <i className="fa fa-solid fa-plus"></i>
                                            </button>
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <h2 className="td-color">
                                        <NumberFormat
                                          value={item.quantity * item.variant.price}
                                          thousandSeparator={true}
                                          displayType="text"
                                          suffix={item.currencySymbol}
                                          decimalScale={0}
                                        />

                                      </h2>
                                    </td>
                                    <td>
                                      <div className="justify-content-end ml-5">

                                        <i
                                          className={`fa fa-times ${styles.cursorVendor}`}
                                          onClick={() => removeFromCart(i, index, item.cartID)}
                                        ></i>
                                      </div>
                                    </td>

                                  </tr>
                                </tbody>
                              );
                            })}
                          </table>
                        </CardBody>
                        <CardFooter className="text-muted" style={{ backgroundColor: 'white' }}>
                          <div className="d-flex mb-2 mt-3">
                            <strong>Shop Khuyến Mãi</strong> <span className="ml-2">Vui lòng chọn sản phẩm trước</span>
                          </div>
                        </CardFooter>
                      </Card>

                    )
                  })}
                </div>
                <Modal
                  className="mt-5"
                  isOpen={isOpenModalDeleteProduct}
                  toggle={handleModalDeleteMany}
                >
                  <ModalHeader toggle={handleModalDeleteMany}>
                    Bạn có muốn bỏ {totalProductSelect} sản phẩm?
                  </ModalHeader>
                  <ModalFooter>
                    <Button
                      color="danger"
                      onClick={deleteManyCartItem}
                    >
                      Đồng ý
                    </Button>
                    <Button onClick={handleModalDeleteMany}>
                      Huỷ
                    </Button>
                  </ModalFooter>
                </Modal>
                <div className={`${styles.totalPart} mt-3 pb-4`}>
                  <table className="table cart-table table-responsive-md">
                    <tfoot>
                      <tr>
                        <td className="d-flex justify-content-between">
                          <div className="d-flex flex-row bd-highlight ml-5">
                            <div className="bd-highlight">
                              <span className={`${styles.cursorVendor} ${styles.textDelete} mr-1`}
                                disabled={true}
                                onClick={handleModalDeleteMany}
                              >
                                Xoá
                              </span>
                              ({totalProductSelect} sản phẩm đã chọn)
                            </div>
                          </div>
                          <div className="ml-5">
                            Tổng thanh toán ({totalProductSelect} sản phẩm) :
                          </div>
                        </td>
                        <td>
                          <h2>
                            <NumberFormat
                              value={totalPrice}
                              thousandSeparator={true}
                              displayType="text"
                              suffix={'₫'}
                              decimalScale={0}
                            />

                          </h2>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </Col>
            </Row>
            <Row className="cart-buttons">
              <Col xs="6">
                <Link href={`/shop/left_sidebar`}>
                  <a className="btn btn-solid">Tiếp tục mua hàng</a>
                </Link>
              </Col>
              <Col xs="6">
                <Link href={`/page/account/checkout`}>
                  <a className="btn btn-solid">Thanh toán</a>
                </Link>
              </Col>
            </Row>
          </Container>
          )
        </section>

      </div>
    );
  } else {
    return (
      <section className={`cart-section section-b-space ${styles.backgroundFull}`}>
        <Container>
          <Row>
            <Col sm="12">
              <div className="mt-5">
                <div className="col-sm-12 empty-cart-cls text-center">
                  <Media
                    src="/assets/icon/icon-empty-cart.png"
                    className="img-fluid mb-4 mx-auto"
                    alt="mubaha.com"
                  />
                  <h3>
                    <strong>Giỏ hàng bạn đang chưa có sản phẩm</strong>
                  </h3>
                  <Link href="/">
                    <Button className="btn btn-solid mt-2">Khám phá ngay</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }

};


export default CartPage;


