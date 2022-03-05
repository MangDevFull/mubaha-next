import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Edit, Trash2 } from "react-feather";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import LayoutBackEnd from "@/components/backend/Layout";
import Link from "next/link";
import ProductPrice from "@/components/common/ProductDetails/ProductPrice";

const ProductList = ({dataIndexProduct, Click}) => {

	const [products, setProducts] = useState([])

	useEffect(() => {
		setProducts(dataIndexProduct);
	}, [])

	const deleteProduct = async (id) => {
		const res = await fetch(`${process.env.API_URL}/vendor/products/${id}`,{
      method: "DELETE",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    // console.log('res',res)
    const data = await res.json();

    console.log(data)
		const filtered = products.filter(x => x._id !== id);
		// console.log(filtered);
		setProducts(filtered);
	}

	return (
		<Fragment>
			<Breadcrumb title="Product List" parent="Physical" />
			<Container fluid={true}>
				<Row className="products-admin ratio_asos">
					{products.map((data, i) => {
						return (
							<Col xl="3" sm="6" key={i}>
								<Card>
									<div className="products-admin">
										<CardBody className="product-box text-center">
											<div className="img-wrapper">
												<div className="front">
													<a href="/#" className="">
														<img 
															alt=""
															style={{height: "300px", objectFit: "cover" }}
															className="img-fluid blur-up bg-img lazyloaded"
															src={data.media.featuredImage}
														/>
													</a>
													<div className="product-hover">
														<ul>
															<li>
																<Button color="btn" type="button">
																	<Edit className="editBtn" />
																</Button>
															</li>
															<li>
																<Button color="btn" type="button">
																	<Trash2 className="deleteBtn" onClick={(e) => deleteProduct(data._id)} />
																</Button>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="product-detail">
												<div className="rating">
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
												</div>
												
												<a href="#">
													<h6>{data.name}</h6>
												</a>
												<h4><ProductPrice price={data.price} discount={data.discount} currencySymbol={data.currencySymbol} /></h4>
												<ul className="mt-2">
													{data.variants.map((x, idx) => (
														<li key={idx}><span className="badge badge-dark mr-1 p-2">{x.name}</span></li>
													))}
													{/* <li className="bg-light0"></li>
													<li className="bg-light1"></li>
													<li className="bg-light2"></li> */}
												</ul>
											</div>
										</CardBody>
									</div>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</Fragment>
	);
};

ProductList.getLayout = function getLayout(page) {
  return <LayoutBackEnd>{page}</LayoutBackEnd>;
};

export default ProductList;
