import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import Link from "next/link";
import { Container, Row, Col, Media, Button, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Breadcrumb from "./Breadcrumb";
import styles from "@/styles/cart.module.css"
const CartPage = () => {
  const [products, setProduct] = useState([])
  const [totalProduct, setTotalProduct] = useState(0)
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/login')
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.API_URL}/member/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + session.accessToken
        },
      })

      const data = await res.json()

      if (data.status == 200) {
        const fullP = data.data.products.map(product => {
          const d = product.products.map((p, index) => {
            let value = {
              quantity: p.quantity,
              name: p.name,
              currencySymbol: p.currencySymbol,

            }
            if (p.selectedVariant != null) {
              const rs = p.variants.filter(variant => {
                return variant._id === p.selectedVariant
              })
              value = {
                ...value,
                variant: rs[0]
              }
            } else if (p.selectedAttribute != null) {
              const rs = p.variants.sizes.filter(variant => {
                return variant._id === p.selectedAttribute
              })
              value = {
                ...value,
                attr: rs[0]
              }
            } else {
              price = {
                ...value,
                price: p.price,
                image: p.media.featuredImage
              }
            }
            return value
          })
          return {
            vendor: product._id,
            totalDocs: product.totalDocs,
            products: d
          }
        })
        setProduct(fullP)
        setTotalProduct(data.data.totalProducts[0].product)
      } else if (data.status == 404) {
        alert("Error downloading")
      }
    }
    if (session != undefined) {
      fetchData()
    }
  }, [session])
  console.log(products)
  return (
    <div>
      <Breadcrumb previousLink="/" currentValue={'Giỏ hàng'} previousValue="Trang chủ" />
      {totalProduct > 0 ? (
        <section className={`cart-section section-b-space mt-0 ${styles.backgroundFull}`}>
          <Container>
            <Row>
              <Col sm="12">
                <div className="mb-3">
                  <table className="table cart-table table-responsive-xs">
                    <thead style={{ border: 'none' }}>
                      <tr className={`${styles.backgroundHead}`}>
                        <th scope="col">
                          <div className="mt-4 mb-3">image</div>
                        </th>
                        <th scope="col">
                          <div className="mt-4 mb-3">
                            Tên sản phẩm
                          </div>
                        </th>
                        <th scope="col">
                          <div className="mt-4 mb-3">
                            Giá
                          </div>
                        </th>
                        <th scope="col">
                          <div className="mt-4 mb-3">
                            Số lượng
                          </div>
                        </th>
                        <th scope="col">
                          <div className="mt-4 mb-3">
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
                          <strong>{p.vendor.brandName}</strong>
                        </CardHeader>
                        <CardBody>
                          <table>
                            {p.products.map((item, index) => {
                              return (
                                <tbody key={index}>
                                  <tr>
                                    <td>
                                      <Link href={`/left-sidebar/product/`}>
                                        <a>
                                          <Media
                                            src={item.variant.image}
                                            alt=""
                                          />
                                        </a>
                                      </Link>
                                    </td>
                                    <td>
                                      <Link href={`/left-sidebar/product/`}>
                                        <a>{item.name}</a>
                                      </Link>
                                      <div className="mobile-cart-content row">
                                        <div className="col-xs-3">
                                          <div className="qty-box">
                                            <div className="input-group">
                                              <input
                                                type="number"
                                                name="quantity"
                                                className="form-control input-number"
                                                defaultValue={item.qty}

                                              />
                                            </div>
                                          </div>
                                          {item.qty >= item.stock ? "out of Stock" : ""}
                                        </div>
                                        <div className="col-xs-3">
                                          <h2 className="td-color">
                                            a
                                          </h2>
                                        </div>
                                        <div className="col-xs-3">
                                          <h2 className="td-color">
                                            <a href="#" className="icon">
                                              <i
                                                className="fa fa-times"
                                                onClick={() => removeFromCart(item)}
                                              ></i>
                                            </a>
                                          </h2>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <h2>
                                        <NumberFormat
                                          value={item.variant.price}
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
                                          <input
                                            type="number"
                                            name="quantity"
                                            onChange={(e) =>
                                              handleQtyUpdate(item, e.target.value)
                                            }
                                            className="form-control input-number"
                                            defaultValue={item.quantity}

                                          />
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
                                          className="fa fa-times"
                                          onClick={() => removeFromCart(item)}
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
                          <h3>Shop Khuyến Mãi</h3> Vui lòng chọn sản phẩm trước
                        </CardFooter>
                      </Card>

                    )
                  })}
                </div>
                <div className={`${styles.totalPart} mt-3 pb-4`}>
                <table className="table cart-table table-responsive-md">
                  <tfoot>
                    <tr>
                      <td>total price :</td>
                      <td>
                        <h2>

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
      ) : (
        <section className="cart-section section-b-space">
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
      )}
    </div>
  );
};

export default CartPage;
