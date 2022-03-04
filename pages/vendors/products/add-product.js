import LayoutBackEnd from "@/components/backend/Layout";
import Form from "react-bootstrap/Form";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useRef, useState, useEffect } from "react";
import Breadcrumb from "@/components/backend/common/BreadCrumb";
import Url from "url-parse";
import dynamic from "next/dynamic";
import queryString from "query-string";
import productVariant from "@/enums/productVariant.enum.js";
import productVariantValue from "@/enums/productVariantValue.enum.js";
import { Table } from "reactstrap";
import "react-table-v6/react-table.css";

const Editor = dynamic(() => import("@/components/backend/Editor"), {
  ssr: false,
});

import MyDropzone from "@/components/backend/common/Dropzone";
import Pickcolor from "@/components/backend/common/Pickcolor";
import { StockStatus, StockCountry } from "../../../enums/product.enum.js";
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
import currencyEnum from "../../../enums/currency.enum.js";
import SelectAdd from "react-select/creatable";
import Select from "react-select";

const productVariants = productVariant;
const productVariantValues = productVariantValue;
export default function AddProductPage() {
  const [content] = useState("");
  const [categoryFirst, setCategoryFirst] = useState([]);
  const [categorySecond, setCategorySecond] = useState([]);
  const [categoryThird, setCategoryThird] = useState([]);
  const [isDisableSecond, setIsDisableSecond] = useState(true);
  const [isDisableThird, setIsDisableThird] = useState(true);
  const [status, setStatus] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [brands, setBrands] = useState([]);
  const [placeholderCategory, setPlaceholderCategory] = useState("");

  const [selectBrand, setSelectBrand] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [slectCurrency, setSelectCurrency] = useState("");
  const [selectCountry, setSelectCountry] = useState("");
  const [selectFirstCategory, setSelectFirstCategory] = useState("");
  const [selectSecondCategory, setSelectSecondCategory] = useState("");
  const [selectThirdCategory, setSelectThirdCategory] = useState("");
  const [images, setImage] = useState([]);

  const getvalue = useRef();

  const inputName = useRef();
  const inputSKU = useRef();
  const inputPrice = useRef();
  const inputDiscount = useRef();

  const getImages = (e) => {
    setImage(e);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.API_URL}/categories/first`);

      const data = await response.json();

      const categories = data.data.map((category) => {
        return { label: category.name, value: category._id };
      });
      if (data.status === 200) {
        setCategoryFirst(categories);
      }
      const stockStatuses = Object.keys(StockStatus).map((key) => {
        return { label: key, value: key };
      });

      setStatus(stockStatuses);

      const stockCountries = Object.keys(StockCountry).map((key) => {
        return { label: key, value: key };
      });

      setCountries(stockCountries);

      const currencies = Object.keys(currencyEnum).map((key) => {
        const data = currencyEnum[key];
        return { label: key, value: data };
      });

      setCurrencies(currencies);

      const brands = await fetch(`${process.env.API_URL}/brands`);

      const brandDatas = await brands.json();

      const brandOptions = brandDatas.data.map((key) => {
        return { label: key.name, value: key._id };
      });

      setBrands(brandOptions);
    }
    fetchData();
  }, []);

  const handleCategoryFirst = async (e) => {
    const id = e.value;
    setSelectFirstCategory(id);
    const response = await fetch(`${process.env.API_URL}/categories/${id}`);

    const data = await response.json();

    const categoriesSecond = data.data.map((category) => {
      return { label: category.name, value: category._id };
    });
    if (data.status == 200) {
      setCategorySecond(categoriesSecond);
      setCategoryThird([]);
      setIsDisableSecond(false);
    }
  };

  const handleCategorySecond = async (e) => {
    const id = e.value;
    setSelectSecondCategory(id);
    const response = await fetch(`${process.env.API_URL}/categories/${id}`);

    const data = await response.json();
    const categoriesThird = data.data.map((category) => {
      return { label: category.name, value: category._id };
    });
    if (data.status == 200) {
      if (categoriesThird.length > 0) {
        setCategoryThird(categoriesThird);
        setIsDisableThird(false);
        setPlaceholderCategory("Lựa chọn");
      } else {
        setIsDisableThird(true);
        setPlaceholderCategory("Danh mục chưa có");
      }
    }
  };

  const handleCreateBrand = async (e) => {
    if (e.__isNew__) {
      const body = {
        name: e.value,
      };
      const response = await fetch(`${process.env.API_URL}/create-brand`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.status == 400) {
        alert(data.message);
      } else if (data.status == 200) {
        const brandOptions = data.data.map((key) => {
          return { label: key.name, value: key._id };
        });
        setBrands(brandOptions);
      }
    } else {
      setSelectBrand(e.value);
    }
  };

  const handeSubmit = async () => {
    console.log("ref", getvalue.current.value);
    let uploadImages = [];
    await images.forEach(async (value) => {
      const url = value.uploadUrl;
      const uri = new Url(url);

      const query = queryString.parse(uri.query);
      const body = value.file;
      const headers = {
        ...query,
      };
      const response = await fetch(uri.href, {
        method: "PUT",
        headers: headers,
        body: body,
      });

      if (response.ok) {
        uploadImages.push(value.downloadUrl);
      } else {
        alert("Error downloading");
      }
    });

    const body = {
      name: inputName.current.value,
      price: inputPrice.current.value,
      discount: inputDiscount.current.value,
      sku: inputSKU.current.value,
      stockCountry: selectCountry,
      stockStatus: selectStatus,
      brand: selectBrand,
      currencyUnit: slectCurrency,
      firstLevelCat: selectFirstCategory,
      secondLevelCat: selectSecondCategory,
      threeLevelCat: selectThirdCategory,
      image: uploadImages,
    };
  };
  const [productVariant1, setProductVariant1] = useState("");
  const [productVariant2, setProductVariant2] = useState("");
  const [productValues1, setProductValues1] = useState([]);
  const [productValues2, setProductValues2] = useState([]);
  const [attributes, setAttributes] = useState([{ value: "", label: "" }]);
  const [variants, setVariants] = useState([{ value: "", label: "", attrs: [] }]);

  const handleSetVariant = (e, idx) => {
    variants[idx] = { label: e.value, value: e.value, attrs: variants[idx].attrs };
    setVariants([...variants]);
  };
  const handleSetAtribute = (e, idx) => {
    attributes[idx] = { label: e.value, value: e.value };
    setAttributes([...attributes]);
  };
  const deletVariant = (idx) => { 
    if(variants.length >1){
      variants.splice(idx, 1);
      setVariants([...variants]);
    }
  
  }

  const deleteAtrr = (idx) => {
    if(attributes.length >1){
      attributes.splice(idx, 1);
      setAttributes([...attributes]);
      variants.map(variant=> {
        return variant.attrs.splice(idx,1)
      })
    }
  }

  const onAddBtnClick1 = () => {
    setVariants([...variants, { label: "", value: "", attrs: [] }]);
  };
  const onAddBtnClick2 = (event) => {
    setAttributes([...attributes, { label: "", value: "" }]);
  };

  const handlePriceAttr = (e, idx, i) => {
    const attrs = {
      ...variants[i].attrs[idx],
      ...attributes[idx],
      price: e
    }
    variants[i].attrs[idx] = attrs
    setVariants([...variants])
    console.log(variants)

  }
  const handleStockAtrr = (e, idx, i) => {
    const attrs = {
      ...attributes[idx],
      ...variants[i].attrs[idx],
      stock: e
    }
    variants[i].attrs[idx] = attrs
    setVariants([...variants])
  }
  const handleSKUAtrr = (e, idx, i) => {
    const attrs = {
      ...attributes[idx],
      ...variants[i].attrs[idx],
      sku: e
    }
    variants[i].attrs[idx] = attrs
    setVariants([...variants])
  }

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
                      <input className="form-control" type="text" ref={inputName} />
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0">
                        <span>*</span> SKU
                      </Label>
                      <input className="form-control" type="text" ref={inputSKU} />
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
                      <span>*</span> Danh mục 1
                    </Label>
                    <Select
                      onChange={handleCategoryFirst}
                      options={categoryFirst}
                      placeholder={"Lựa chọn"}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Danh mục 2
                    </Label>
                    <Select
                      isDisabled={isDisableSecond}
                      onChange={handleCategorySecond}
                      options={categorySecond}
                      placeholder={"Lựa chọn"}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Danh mục 3
                    </Label>
                    <Select
                      isDisabled={isDisableThird}
                      options={categoryThird}
                      placeholder={placeholderCategory}
                      onChange={(e) => {
                        setSelectThirdCategory(e.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Giá
                    </Label>
                    <input className="form-control" type="number" min="0" ref={inputPrice} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Giảm giá
                    </Label>
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      max="100"
                      ref={inputDiscount}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Số lượng
                    </Label>
                    <input className="form-control" type="number" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Trạng thái
                    </Label>
                    <Select
                      options={status}
                      placeholder="Lựa chọn"
                      onChange={(e) => {
                        setSelectStatus(e.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Đơn vị tiền
                    </Label>
                    <Select
                      options={currencies}
                      placeholder="Lựa chọn"
                      onChange={(e) => {
                        setSelectCurrency(e.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Thương hiệu
                    </Label>
                    <SelectAdd options={brands} onChange={handleCreateBrand} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Vị trí kho hàng
                    </Label>
                    <Select
                      options={countries}
                      placeholder="Lựa chọn"
                      onChange={(e) => {
                        setSelectCountry(e.value);
                      }}
                    />
                  </FormGroup>
                  <Label className="col-form-label pt-0"> Ảnh sản phẩm</Label>
                  <MyDropzone sendImages={getImages} />
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
                        <Editor />
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
                        <Label className="col-form-label pt-0">
                          <h3>Nhóm phân loại 1</h3>
                        </Label>
                        <Form.Group>
                          <SelectAdd
                            options={productVariants}
                            onChange={(e) => {
                              setProductVariant1(e.label);
                              if (e.value === "color") {
                                setProductValues1(productVariantValues.COLOR);
                              } else if (e.value === "size") {
                                setProductValues1(productVariantValues.SIZE);
                              } else {
                                setProductVariant1([]);
                              }
                            }}
                            placeholder="Nhập tên nhóm phân loại 1"
                          />
                        </Form.Group>

                        <div className="mt-1">
                          <Label className="col-form-label pt-0">Loại hàng</Label>
                          {variants.map((x, i) => {
                            return (
                              <>
                                <SelectAdd
                                  key={i}
                                  options={productValues1}
                                  onChange={(e) => handleSetVariant(e, i)}
                                  value={x}
                                  placeholder="Nhập loại hàng"
                                />
                                <Button className="mt-1 mb-1"
                                  color="danger"
                                  onClick={() =>deletVariant(i)}
                                >
                                  Xoá
                                </Button>
                                <br />
                              </>
                            );
                          })}
                          <br />
                        </div>
                        <div className="d-flex justify-content-center">
                          <div className="mt-1 btn-primary p-2" onClick={onAddBtnClick1}>
                            Thêm phân loại hàng
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="mt-3">
                        <Label className="col-form-label pt-0">
                          <h3>Nhóm phân loại 2</h3>
                        </Label>
                        <Form.Group>
                          <SelectAdd
                            options={productVariants}
                            onChange={(e) => {
                              setProductVariant2(e.value);
                              if (e.value === "color") {
                                setProductValues2(productVariantValues.COLOR);
                              } else if (e.value === "size") {
                                setProductValues2(productVariantValues.SIZE);
                              } else {
                                setProductValues2([]);
                              }
                            }}
                            placeholder="Nhập tên nhóm phân loại 2"
                          />
                        </Form.Group>
                        <div className="mt-1">
                          <Label className="col-form-label pt-0">Loại hàng</Label>
                          {attributes.map((x, i) => {
                            return (
                              <>
                                <SelectAdd
                                  key={i}
                                  options={productValues2}
                                  onChange={(e) => handleSetAtribute(e, i)}
                                  placeholder="Nhập loại hàng"
                                  value={x}
                                />
                                 <Button className="mt-1 mb-1"
                                  color="danger"
                                  onClick={() =>deleteAtrr(i)}
                                >
                                  Xoá
                                </Button>
                                <br />
                              </>
                            );
                          })}
                        </div>
                        <div className="d-flex justify-content-center">
                          <div className="mt-1 btn-primary p-2" onClick={onAddBtnClick2}>
                            Thêm phân loại hàng
                          </div>
                        </div>
                      </div>
                    </FormGroup>

                    <Table bordered>
                      <thead>
                        <tr>
                          <th>{productVariant1}</th>
                          <th>{productVariant2}</th>
                          <th>Giá</th>
                          <th>Kho hàng</th>
                          <th>SKU</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variants.map((variant, i) => {
                          return (
                            <>
                              <tr>
                                <td rowSpan={attributes.length + 1} className="align-middle text-center">{variant.label}</td>
                              </tr>
                              {attributes.map((attr, idx) => (
                                <>
                                  <tr>
                                    <td className="align-middle text-center">{attr.label}</td>
                                    <td className="align-middle text-center">
                                      <input className="form-control" placeholder="Nhập giá"
                                        onChange={(e) => handlePriceAttr(e.target.value, idx, i)}
                                      />
                                    </td>
                                    <td className="align-middle text-center">
                                      <input
                                        className="form-control"
                                        placeholder="Nhập số hàng tồn kho"
                                        defaultValue="0"
                                        onChange={(e) => { handleStockAtrr(e.target.value, idx, i) }}
                                      />
                                    </td>
                                    <td className="align-middle text-center">
                                      <input className="form-control" placeholder="Nhập SKU"
                                        onChange={(e) => { handleSKUAtrr(e.target.value, idx, i) }}
                                      />
                                    </td>
                                  </tr>
                                </>
                              ))}
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
              <FormGroup className="m-10">
                <div className="product-buttons text-center">
                  <Button type="button" color="primary" onClick={handeSubmit}>
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
    </>
  );
}

AddProductPage.getLayout = function getLayout(page) {
  return <LayoutBackEnd>{page}</LayoutBackEnd>;
};
