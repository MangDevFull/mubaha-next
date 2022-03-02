import React, { Fragment } from "react";
import Breadcrumb from "../common/BreadCrumb.js";
import data from "../../public/assets/data/pro_list"
import Datatable from "../common/Datatable";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

const Digital_pro_list = ({dataIndexProduct}) => {
	return (
		<Fragment>
			<Breadcrumb title="Danh sách sản phẩm" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid="true">
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Danh sách sản phẩm</h5>
							</CardHeader>
							<CardBody>
								<div className="clearfix"></div>
								<div id="basicScenario" className="product-physical">
									<Datatable
										multiSelectOption={false}
										myData={dataIndexProduct}
										pageSize={9}
										pagination={true}
										class="-striped -highlight"
									/>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			{/* <!-- Container-fluid Ends--> */}
		</Fragment>
	);
};

export default Digital_pro_list;
