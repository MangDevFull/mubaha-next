import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Edit, Trash2 } from "react-feather";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import LayoutBackEnd from "@/components/backend/Layout";

const ProductList = ({dataIndexProduct}) => {
	return (
		<Fragment>
			<Breadcrumb title="Product List" parent="Physical" />
			<Container fluid={true}>
				<Row className="products-admin ratio_asos">
					{dataIndexProduct.map((data, i) => {
						return (
							<Col xl="3" sm="6" key={i}>
								<Card>
									<div className="products-admin">
										<CardBody className="product-box">
											<div className="img-wrapper">
												<div className="front">
													<a href="/#" className="">
														<img 
															alt=""
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
																	<Trash2 className="deleteBtn" />
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
												<a href={data.link}>
													{" "}
													<h6>{data.title}</h6>
												</a>
												<h4>
													{data.price}<span>{data.currencySymbol}</span> <del>{(data.price) + (data.price) * (data.discount)/100}{data.currencySymbol}</del>
												</h4>
												<ul className="color-variant">
													<li className="bg-light0"></li>
													<li className="bg-light1"></li>
													<li className="bg-light2"></li>
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
