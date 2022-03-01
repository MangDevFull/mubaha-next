import React, { Fragment, useRef, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import CKEditors from "react-ckeditor-component";
import MyDropzone from "../common/dropzone";
import TableCustom from "../common/table";
import Pickcolor from "../common/Pickcolor";

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
import { Message, Form } from "semantic-ui-react";

const Digital_add_pro = ({ onBlur, onChange, afterPaste }) => {
  const [
    name,
    sku,
    price,
    quantity,
    brand,
    currencyUnit,
    firstLevelCat,
    discount,
    stockStatus,
    stockCountry,
    description,
    variantsValue,
    attributeValue,
    attributeSKU,
    attributePrice,
    attributeQuantity,
    attributeStatus,
  ] = useRef();

  const columns = React.useMemo(() => [
    {
      Header: "Màu sắc",
      columns: [
        {
          id: "variantList",
          accessor: (variantList) => {
            variantList.length &&
              variantList.map((x, i) => (
                <Pickcolor index={i} onChangeColor={handleVariantChange} />
              ));
          },
        },
      ],
    },
    {
      Header: "Size",
      columns: [
        {
          id: "attribute",
          accessor: () =>
            attributeList.length &&
            attributeList.map((item) => (
              <div className="border m-3">
                <span style={{ marginRight: "10px" }}>
                  {item.attributeValue}
                </span>
              </div>
            )),
          // accessor: variantList =>
          // variantList.attribute.map(item => (
          //   <Input
          //       className="form-control mb-2"
          //       ref={attributeValue}
          //       type="text"
          //       required=""
          //       value={item.attributeValue}
          //       name={`attributeValue`}
          //       placeholder="S, M, L, Xl"
          //       onChange={(e) => handleAttributeChange(e, i)}
          //     />
          // ))
        },
      ],
    },
    {
      Header: "Giá",
      columns: [
        {
          id: "price",
          accessor: () =>
            variantList.length &&
            variantList.map((variant, indexVariant) =>
            // console.log(variant.attribute)
              variant.attribute.map((attribute, indexAttribute) => (
                <div>
                  <Input
                    className="form-control"
                    name={`attributePrice`}
                    type="text"
                    required=""
                    onChange={(e) => handleAttribute(e, indexVariant, indexAttribute)}
                  />
                </div>
              ))
            ),
        },
      ],
    },
    {
      Header: "Kho hàng",
      columns: [
        {
          id: "quantity",
          accessor: (variantList) =>
            variantList.length &&
            variantList.map((item, index) => (
              <div>
                <Input
                  className="form-control"
                  name={`attributeQuantity`}
                  type="number"
                  required=""
                  placeholder="Nhập số lượng"
                  // onChange={(e) => handleAttributeQuantity(e, item, index)}
                />
              </div>
            )),
        },
      ],
    },
    // {
    //   Header: "SKU",
    //   columns: [
    //     {
    //       id: "SKU",
    //       accessor: (variantList) =>
    //         variantList.attribute.map((item, index) => (
    //           <div>
    //             <Input
    //               className="form-control"
    //               name={`attributeSKU`}
    //               type="text"
    //               required=""
    //               placeholder="Nhập vào mã hàng"
    //               // onChange={(e) => handleAttributeSku(e, item, index)}
    //             />
    //           </div>
    //         )),
    //     },
    //   ],
    // },
  ]);

  // ])
  const [variantList, setVariantList] = useState([
    {
      variantKey: "Màu sắc",
      variantValue: "",
      attribute: [
        {
          attributeKey: "Size",
          attributeValue: "",
          attributePrice: "",
          attributeSKU: "",
          attributeQuantity: "",
        },
      ],
    },
  ]);

  const [attributeList, setAttributeList] = useState([
    {
      attributeKey: "Size",
      attributeValue: "",
    },
  ]);

  const handleVariantChange = (color, index) => {
    const list = [...variantList];
    list[index]["variantKey"] = "Màu sắc";
    list[index]["variantValue"] = color.hex;
    setVariantList(list);
  };

  const handleAttribute = (e, indexVariant, indexAttribute) => {
    const { name, value } = e.target;
    const list = [...variantList];
    list[indexVariant]["attribute"][indexAttribute][name] = value;
    setVariantList(list);
  };

  // const handleVariantChange = (color, index) => {
  //   console.log("index", index)
  //   return (color) => {
  //     console.log(color)
  //   }
  // }

  const handleAttributeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...attributeList];
    list[index][name] = value;

    setAttributeList(list);
  };

  // for (const [key, value] of Object.entries(variantList)) {
  //   value.attribute = attributeList;
  // }

  const handleAddAttribute = async (e) => {
    setAttributeList([
      ...attributeList,
      {
        attributeKey: "Size",
        attributeValue: "",
      },
    ]);
  };

  const handleAddVariant = async (e) => {
    setVariantList([
      ...variantList,
      { variantKey: "Màu sắc", variantValue: "" },
    ]);
  };

  // const handleAttributePrice = (e, item, index) => {
  //   console.log("item", index);
  //   const { name, value } = e.target;
  //   console.log(name, value);

  //   if (item.attributeKey == "Size" && item.attributeValue == "S")
  //     return {
  //       ...item,
  //       attributePrice: value,
  //     };
  //   console.log("item", item);
  // };

  // const handleAttributeSku = (e, item, index) => {
  //   console.log("item", index);
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   const list = [...attributeList];
  //   var bew = attributeList.map((item) => {
  //     if (item.attributeKey == "Size" && item.attributeValue == "S")
  //       return {
  //         ...item,
  //         attributeSKU: value,
  //       };
  //     return item;
  //   });

  //   setAttributeList(list);
  // };

  // const handleAttributeQuantity = (e, item, index) => {
  //   console.log("item", index);
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   const list = [...attributeList];
  //   var bew = attributeList.map((item) => {
  //     if (item.attributeKey == "Size" && item.attributeValue == "S")
  //       return {
  //         ...item,
  //         attributeQuantity: value,
  //       };
  //     return item;
  //   });
  //   console.log("new", bew);
  //   setAttributeList(list);
  // };

  // const handleAttribute = async(e, index) => {
  //   const { name, value } = e.target
  //   const list = [...attributeList]
  //   list[index][name] = value
  //   setAttributeList(list)
  // }

  // console.log("attributeList", attributeList);
  console.log("variantList", variantList);

  const [formSuccess, isFormSuccess] = useState(false);
  // const addProduct = useRef(null);

  // const form = addProduct.current;

  const [content] = useState("content");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: `${form["name"].value}`,
      sku: `${form["sku"].value}`,
      price: `${form["price"].value}`,
      quantity: `${form["quantity"].value}`,
      brand: `${form["brand"].value}`,
      firstLevelCat: `${form["firstLevelCat"].value}`,
      discount: `${form["discount"].value}`,
      stockStatus: `${form["stockStatus"].value}`,
      stockCountry: `${form["stockCountry"].value}`,
      description: content,
      currencyUnit: `${form["currencyUnit"].value}`,
      images: [
        {
          path: "test",
          variantId: "variant",
        },
      ],
      // 'variants': `${form['variantsValue'].value}`,
      variants: variantList,
      attributes: variantList.attribute,
    };
    const response = await fetch("http://localhost:3001/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.status === 200) {
      isFormSuccess(true);
    } else {
      isFormSuccess(false);
      console.log(data);
    }
  };
  return (
    <Fragment>
      <Breadcrumb title="Thêm sản phẩm" />
      <Container fluid={true}>
        <form ref>
          <Row className="product-adding">
            <Col xl="6">
              {
                formSuccess ? (
                  <Message
                    positive
                    header="Tạo sản phẩm thành công"
                    style={{ marginBottom: 10 + "px" }}
                  />
                ) : null
                //  : (
                //   <Message
                //     negative
                //     header="Missing fields!"
                //     list={["All fields must be filled."]}
                //   />
                // )
              }
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
                        ref={name}
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
                        ref={sku}
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
                      ref={firstLevelCat}
                      name={`firstLevelCat`}
                    >
                      <option value="">--Select--</option>
                      <option value="61d983553335d8873f1abacc">eBooks</option>
                      <option value="2">Graphic Design</option>
                      <option value="3">3D Impact</option>
                      <option value="4">Application</option>
                      <option value="5">Websites</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Giá
                    </Label>
                    <Input
                      className="form-control"
                      ref={price}
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
                      ref={discount}
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
                      ref={quantity}
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
                      ref={stockStatus}
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
                      ref={currencyUnit}
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
                      ref={brand}
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
                      ref={stockCountry}
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
                          ref={description}
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
                      {/* <Label className="col-form-label pt-0">Nhóm phân loại 1: </Label> */}
                      <div className="">
                        <Label className="col-form-label pt-0">Màu sắc</Label>
                        <div className="variants">
                          {variantList.length &&
                            variantList.map((x, i) => {
                              return (
                                <>
                                  <Input
                                    className="form-control"
                                    type="text"
                                    required=""
                                    name={`variantKey`}
                                    placeholder="Đỏ, Vàng, v.v"
                                    type="hidden"
                                    value={x.variantKey}
                                  />
                                  <Pickcolor
                                    index={i}
                                    onChangeColor={handleVariantChange}
                                  />

                                  {/* <Input
                                  className="form-control mb-2"
                                  ref={variantsValue}
                                  type="text"
                                  required=""
                                  name={`variantKey`}
                                  placeholder="Đỏ, Vàng, v.v"
                                  value={`Màu sắc`}
                                  // value={x.variantValue}
                      onChange={(e) => handleVariantChange(e, i)}
                    /> */}
                                </>
                              );
                            })}
                          <div
                            className="btn btn-block mt-4 btn-primary"
                            onClick={handleAddVariant}
                          >
                            Thêm màu sắc
                          </div>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0"> Size</Label>
                      {attributeList.map((x, i) => {
                        return (
                          <>
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
                              onChange={(e) => handleAttributeChange(e, i)}
                            />
                          </>
                        );
                      })}
                      {/* {variantList.length &&
                        variantList.map((x, indexVariant) => {
                          console.log("==============>", x.attribute[indexVariant].attribute)
                          x.attribute[indexVariant].map((attribute, indexAttribute) =>    
                           (
                            <>
                              <Input
                                className="form-control"
                                type="text"
                                required=""
                                name={`attributeKey`}
                                placeholder="S, M, L, Xl"
                                type="hidden"
                                value="size"
                              />
                              <Input
                                className="form-control mb-2"
                                rel={attributeValue}
                                type="text"
                                required=""
                                name={`attributeValue`}
                                placeholder="S, M, L, Xl"
                                onChange={(e) => handleAttribute(e, indexVariant, indexAttribute)}
                              />
                            </>
                           )
                          )
                        }
                        )
                        } */}
                      <div
                        className="btn btn-block mt-4 btn-primary"
                        onClick={handleAddAttribute}
                      >
                        Thêm Size
                      </div>
                    </FormGroup>
                    <TableCustom
                      columns={columns}
                      data={variantList}
                    ></TableCustom>

                    {/* <FormGroup>
                      <Label className="col-form-label">Giá tiền</Label>
                      <Input
                        className="form-control"
                        ref={attributePrice}
                        type="number"
                        required=""
                        name={`attributePrice`}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">SKU</Label>
                      <Input
                        className="form-control"
                        ref={attributeSKU}
                        type="text"
                        required=""
                        name={`attributeSKU`}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">Số lượng</Label>
                      <Input
                        className="form-control"
                        ref={attributeQuantity}
                        type="text"
                        required=""
                        name={`attributeQuantity`}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">
                        <span></span> Trạng thái
                      </Label>
                      <select
                        className="custom-select"
                        required=""
                        ref={attributeStatus}
                        name={`attributeStatus`}
                      >
                        <option value="">--Select--</option>
                        <option value="available">Available</option>
                      </select>
                    </FormGroup> */}
                  </div>
                </CardBody>
              </Card>
              <FormGroup className="m-10">
                <div className="product-buttons text-center">
                  <Button type="button" color="primary" onClick={handleSubmit}>
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
    </Fragment>
  );
};

export default Digital_add_pro;
