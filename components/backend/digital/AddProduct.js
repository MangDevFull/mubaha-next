import { useRef, useState, useEffect } from "react";
import Breadcrumb from "../common/BreadCrumb";
import CKEditors from "react-ckeditor-component";
import MyDropzone from "../common/Dropzone";
// import TableCustom from "../common/Table";
import Pickcolor from "../common/Pickcolor";
import { Message } from "semantic-ui-react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

const Digital_add_pro = ({ onBlur, onChange, afterPaste }) => {

  const [content] = useState("content");
  return (
    <>
      <Breadcrumb title="Thêm sản phẩm" />
      <Container fluid={true}>
        <form>
          <Row className="product-adding">
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h5>Thông tin cơ bản</h5>
                </CardHeader>
                <CardBody>
                  <div className="digital-add needs-validation">
                    <FormGroup>
                      <Label className="col-form-label pt-0">
                        <span>*</span> Tên sản phẩm
                      </Label>
                      <Input
                        className="form-control"
                        name={`name`}
                        type="text"
                        required=""
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0">
                        <span>*</span> SKU
                      </Label>
                      <Input
                        className="form-control"
                        name={`sku`}
                        type="text"
                        required=""
                      />
                    </FormGroup>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5>Thông tin chi tiết</h5>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Danh mục
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`firstLevelCat`}
                    >
                      <option value="">--Select--</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Danh mục
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`firstLevelCat`}
                    >
                      <option value="">--Select--</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Danh mục
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`firstLevelCat`}
                    >
                      <option value="">--Select--</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Giá
                    </Label>
                    <Input
                      className="form-control"
                      type="number"
                      required=""
                      name={`price`}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Giảm giá
                    </Label>
                    <Input
                      className="form-control"
                      type="number"
                      required=""
                      name={`discount`}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Số lượng
                    </Label>
                    <Input
                      className="form-control"
                      type="number"
                      required=""
                      name={`quantity`}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Trạng thái
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`stockStatus`}
                    >
                      <option value="">--Select--</option>
                      <option value="available">Available</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Đơn vị tiền
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`currencyUnit`}
                    >
                      <option value="">--Select--</option>
                      <option value="₫">VNĐ</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Thương hiệu
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`brand`}
                    >
                      <option value="">--Select--</option>
                      <option value="61e544bb67bec3d3a883aa61">
                        Rau củ quả
                      </option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Vị trí kho hàng
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`stockCountry`}
                    >
                      <option value="">--Select--</option>
                      <option value="VN">eBooks</option>
                    </select>
                  </FormGroup>
                  <Label className="col-form-label pt-0"> Ảnh sản phẩm</Label>
                  <MyDropzone />
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h5>Mô tả</h5>
                </CardHeader>
                <CardBody>
                  <div className="digital-add needs-validation">
                    <FormGroup className=" mb-0">
                      <div className="description-sm">
                        <CKEditors
                          activeclassName="p10"
                          content={content}
                          events={{
                            blur: onBlur,
                            afterPaste: afterPaste,
                            change: onChange,
                          }}
                        />
                      </div>
                    </FormGroup>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5>Thông tin bán hàng</h5>
                </CardHeader>
                <CardBody>
                  <div className="digital-add needs-validation">
                    <FormGroup>
                      <div className="">
                        <Label className="col-form-label pt-0">Màu sắc</Label>
                        <div className="variants">
                            <Pickcolor
                              // onChangeColor={handleVariantChange}
                            />
                          <div
                            className="btn btn-block mt-4 btn-primary"
                            // onClick={handleAddVariant}
                          >
                            Thêm màu sắc
                          </div>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0"> Size</Label>
                        <Input
                          className="form-control"
                          type="text"
                          required=""
                          name={`attributeKey`}
                          placeholder="S, M, L, Xl"
                          type="hidden"
                          value="Size"
                        />

                        <Input
                          className="form-control mb-2"
                          type="text"
                          required=""
                          name={`attributeValue`}
                          placeholder="S, M, L, Xl"
                          // onChange={(e) => handleAttributeChange(e, i)}
                        />
                      <div
                        className="btn btn-block mt-4 btn-primary"
                        // onClick={handleAddAttribute}
                      >
                        Thêm Size
                      </div>
                    </FormGroup>
                    {/* <TableCustom
                      columns={columns}
                      data={variantList}
                    ></TableCustom> */}
                  </div>
                </CardBody>
              </Card>
              <FormGroup className="m-10">
                <div className="product-buttons text-center">
                  <Button type="button" color="primary" 
                  // onClick={handleSubmit}
                  >
                    Thêm sản phẩm
                  </Button>
                  <Button type="button" color="light">
                    Hủy
                  </Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </Container>
      <style></style>
      </>
  );
};

export default Digital_add_pro;
