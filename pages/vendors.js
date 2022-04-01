import Layout from "@/components/vendor/Layout"
import { Row, Container, Col, Button, Spinner } from 'reactstrap'
import { useState } from "react";
import styles from "@/styles/vendor.module.css";
import numeral from "numeral"
import useSWRInfinite from "swr/infinite";
import { SWRConfig } from "swr";
import fetcher from "../libs/fetcher"
import _ from "lodash"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from "next/link"
const API = `${process.env.API_VENDOR_URL}/search`
export default function Searchvendor({ fallback }) {
  const [text, setText] = useState(fallback.text)
  const [limit, setLimit] = useState(fallback.limit)
  const [page, setPage] = useState(fallback.page)
  const PAGE_SIZE = fallback.data.data.totalPages
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `${API}?t=${fallback.text || ""}&limit=${limit || 10}&page=${index + 1
      }`,
    fetcher
  );
  let issues = []
  if (data && data[data.length - 1].status === 200) {
    issues = _.concat(issues, data[data.length - 1].data.docs)
  }
  console.log("text", text)
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isReachingEnd = data && data[data.length - 1].data.page === PAGE_SIZE
  return (
    <SWRConfig value={{ fallback }}>
      <div style={{ backgroundColor: "rgb(245, 245, 250)" }}>
        <section className="section-b-space ratio_asos">
          <div className="collection-wrapper">
            <Container>
              <Row className="d-flex justify-content-center">
                <Col md={10}>
                  <div className="d-flex justify-content-start">
                    <h3>Shop liên quan đến <strong>{fallback.text}</strong></h3>
                  </div>
                  {data
                    ?
                    issues.length > 0
                      ?
                      issues.map((value, i) => {
                        return (
                          <div className={`${styles.boxVendor} mt-3`} key={i}>
                            <Container>
                              <Row >
                                <Col xs={5}>
                                  <div className="d-flex">
                                    <div className="w-25 h-100 d-inline-block" >
                                      <img src={value.cover}
                                        style={{ border: 'none', height: "100px" }}
                                        className="img-fluid img-thumbnail rounded-circle" alt="mubaha" />
                                    </div>
                                    <div className="ml-2">
                                      <div className="mt-3">
                                        <h4 ><b>{value.brandName}</b></h4>
                                      </div>
                                      <div>
                                        <p style={{ fontSize: "12px" }}><b>{value.owner.username}</b></p>
                                      </div>
                                      <div className="mt-2 d-flex justify-content-start">
                                        <div>
                                          <p style={{ fontSize: "10px" }}><span className={styles.numberFormat}>{numeral(value.followers).format('0a')}</span> theo dõi</p>
                                        </div>
                                        <div className="ml-1 border-left pl-1" style={{ height: "16px" }}>
                                          <p style={{ fontSize: "10px" }}> <span className={styles.numberFormat}>{numeral(value.followers).format('0a')}</span> đang theo dõi</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col className="d-flex justify-content-end mt-3" xs={5}>
                                  <Container>
                                    <Row xs={3}>
                                      <Col className="border-left">
                                        <div className="d-flex justify-content-center">

                                          <img src="/assets/icon/product.png" className={styles.iconSize} />
                                          <p className={`mt-1 ml-2 ${styles.numberFormat}`}>{value.responseRate}</p>

                                        </div>
                                        <div className="d-flex justify-content-center">
                                          <p>Sản phẩm</p>
                                        </div>
                                      </Col>
                                      <Col className="border-left">
                                        <div className="d-flex justify-content-center">
                                          <img src="/assets/icon/star.png" className={styles.iconSize} />
                                          <p className={`mt-1 ml-2 ${styles.numberFormat}`}>{value.ratingOverall}</p>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                          <p>Đánh giá</p>
                                        </div>
                                      </Col>
                                      <Col className="border-left" style={{ width: "800px" }} >
                                        <div className="d-flex justify-content-center">
                                          <img src="/assets/icon/message.png" className={styles.iconSize} />
                                          <p className={`mt-1 ml-2 ${styles.numberFormat}`}>{value.responseRate}</p>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                          <p>Tỉ lệ phản hồi</p>
                                        </div>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Col>
                                <Col xs={2} >
                                  <div className="d-flex justify-content-center">
                                  <Link href={`vendors/${value.owner.username}`} >
                                    <Button className="btn btn-solid mt-3">Xem shop</Button>
                                    </Link>
                                  </div>

                                </Col>
                              </Row>
                            </Container>
                          </div>
                        )
                      })
                      :
                      <Col xs="12">
                        <div>
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src={`/assets/images/empty-search.jpg`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>Không có shop nào</strong>
                            </h3>
                          </div>
                        </div>
                      </Col>
                    :
                    <>
                      <Skeleton count={3} height={100} width="100%" />
                      <div className="d-flex justify-content-center">
                        <Skeleton count={1} height={30} width={100} />
                      </div>
                    </>
                  }
                  {!isReachingEnd &&
                    <div className="section-t-space">
                      <div className="text-center">
                        <Row>
                          <Col xl="12" md="12" sm="12">

                            <Button
                              onClick={() => {
                                setSize(size + 1);
                              }}
                            >
                              {isLoadingMore && <Spinner animation="border" variant="light" />}
                              Xem thêm
                            </Button>

                          </Col>
                        </Row>
                      </div>
                    </div>
                  }
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
    </SWRConfig>
  )
}
Searchvendor.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps(ctx) {
  const { t, limit, page } = ctx.query
  const finalAPI = `${API}?t=${t || ""}&limit=${limit || 10}&page=${page || 1}`
  const repoInfo = await fetcher(finalAPI);
  return {
    props: {
      fallback: {
        data: repoInfo, text: t || '', limit: limit || 10, page: page || 1
      }
    }
  };
}