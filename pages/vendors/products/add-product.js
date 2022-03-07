import LayoutBackEnd from "@/components/backend/Layout";
import Form from "react-bootstrap/Form";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useRef, useState, useEffect, Fragment } from "react";
import Breadcrumb from "@/components/backend/common/Breadcrumb";
import Url from "url-parse";
import dynamic from "next/dynamic";
import queryString from "query-string";
import productVariant from "@/enums/productVariant.enum.js";
import productVariantValue from "@/enums/productVariantValue.enum.js";
// import "react-table-v6/react-table.css";
import ImageVariant from "@/components/backend/ImageVariant.js";

const Editor = dynamic(() => import("@/components/backend/Editor"), {
  ssr: false,
});

import MyDropzone from "@/components/backend/common/Dropzone";
import Pickcolor from "@/components/backend/common/Pickcolor";
import { StockStatus, StockCountry } from "../../../enums/product.enum.js";
import {
  Table,
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
  FormFeedback,
} from "reactstrap";
import currencyEnum from "../../../enums/currency.enum.js";
import SelectAdd from "react-select/creatable";
import Select from "react-select";
import { useRouter } from "next/router";

const productVariants = productVariant;
const productVariantValues = productVariantValue;
export default function AddProductPage() {
  const router = useRouter();

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
  const [description, setDescription] = useState("");

  const [productName, setProductName] = useState("");
  const [productSKU, setProductSKU] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productStockQuantity, setProductStockQuantity] = useState(0);

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
        return { label: key, value: StockStatus[key] };
      });

      setStatus(stockStatuses);

      const stockCountries = Object.keys(StockCountry).map((key) => {
        return { label: key, value: StockCountry[key] };
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

  const handleEditor = async (e) => {
    setDescription(e);
  };

  const handleSubmit = async () => {
    let uploadImages = [];
    // await Promise.all(images.map(async (value) => {
    //   try {
    //     const url = value.uploadUrl;
    //     const uri = new Url(url);

    //     const query = queryString.parse(uri.query);
    //     const body = value.file;
    //     const headers = {
    //       ...query,
    //     };
    //     const response = await fetch(uri.href, {
    //       method: "PUT",
    //       headers: headers,
    //       body: body,
    //     });

    //     if (response.ok) {
    //       uploadImages.push(value.downloadUrl);
    //     } else {
    //       alert("Error downloading");
    //     }
    //   } catch (error) {
    //     console.log('error' + error);
    //   }
    // }))
    await Promise.all(
      variants.map(async (value, idx) => {
        try {
          const url = value.image.uploadImage;
          const uri = new Url(url);

          const query = queryString.parse(uri.query);
          const body = value.image.file;
          const headers = {
            ...query,
          };
          const response = await fetch(uri.href, {
            method: "PUT",
            headers: headers,
            body: body,
          });
          if (response.ok) {
            variants[idx].image = value.image.downloadUrl;
            setVariants([...variants]);
          } else {
            alert("Error downloading");
          }
        } catch (error) {
          console.log("error" + error);
        }
      })
    );

    let body = {
      name: productName,
      price: productPrice,
      discount: productDiscount,
      quantity: productStockQuantity,
      sku: productSKU,
      stockCountry: selectCountry,
      stockStatus: selectStatus,
      brand: selectBrand,
      currencyUnit: slectCurrency,
      firstLevelCat: selectFirstCategory,
      secondLevelCat: selectSecondCategory,
      threeLevelCat: selectThirdCategory,
      images: uploadImages,
      description: description,
      variants: variants,
    };

    console.log(body);
    // const res = await fetch(`${process.env.API_URL}/vendor/products`, {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${session.token}`,
    //   },
    //   body: JSON.stringify(body)
    // })
    // // console.log('res',res)
    // const data = await res.json();

    // if (data.status === 200) {
    //   router.push('/vendors/products')
    // }
    // console.log("data",data)
  };
  const [productVariant1, setProductVariant1] = useState("");
  const [productVariant2, setProductVariant2] = useState("");
  const [productValues1, setProductValues1] = useState([]);
  const [productValues2, setProductValues2] = useState([]);
  const [attributes, setAttributes] = useState([{ value: "", label: "" }]);
  const [variants, setVariants] = useState([{ value: "Loại", label: "Loại", attrs: [] }]);

  const handleSetVariant = (e, idx) => {
    variants[idx] = { label: e.value, value: e.value, attrs: variants[idx].attrs };
    setVariants([...variants]);
  };
  const handleSetAtribute = (e, idx) => {
    attributes[idx] = { label: e.value, value: e.value };
    setAttributes([...attributes]);
  };
  const deletVariant = (idx) => {
    if (variants.length > 1) {
      variants.splice(idx, 1);
      setVariants([...variants]);
    }
  };

  const deleteAtrr = (idx) => {
    if (attributes.length > 1) {
      attributes.splice(idx, 1);
      setAttributes([...attributes]);
      variants.map((variant) => {
        return variant.attrs.splice(idx, 1);
      });
    }
  };

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
      price: e,
    };
    variants[i].attrs[idx] = attrs;
    setVariants([...variants]);
  };
  const handleStockAtrr = (e, idx, i) => {
    const attrs = {
      ...attributes[idx],
      ...variants[i].attrs[idx],
      stock: e,
    };
    variants[i].attrs[idx] = attrs;
    setVariants([...variants]);
  };
  const handleSKUAtrr = (e, idx, i) => {
    const attrs = {
      ...attributes[idx],
      ...variants[i].attrs[idx],
      sku: e,
    };
    variants[i].attrs[idx] = attrs;
    setVariants([...variants]);
  };

  const hanldeImageVariant = (idx, e) => {
    variants[idx].image = e;
    setVariants([...variants]);
  };

  return (
    <>
      <Breadcrumb title="Thêm sản phẩm" />
      <Container>
        <form>
          <div className="product-adding">
            <Card>
              <CardHeader>
                <h5>Thông tin cơ bản</h5>
              </CardHeader>
              <CardBody>
                <div className="digital-add needs-validation">
                  <Label className="col-form-label pt-0"> Ảnh sản phẩm</Label>
                  <MyDropzone sendImages={getImages} />
                  <FormGroup>
                    <Label className="col-form-label pt-0">
                      <span>*</span> Tên sản phẩm
                    </Label>
                    <Input
                      className="form-control"
                      type="text"
                      name={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                      invalid={productName.length < 1}
                      valid={productName.length > 2}
                    />
                    <FormFeedback>Hãy nhập đầy đủ</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label pt-0">
                      <span>*</span> SKU
                    </Label>
                    <Input
                      className="form-control"
                      type="text"
                      name={productSKU}
                      onChange={(e) => setProductSKU(e.target.value)}
                      required
                      invalid={productSKU.length < 1}
                      valid={productSKU.length > 1}
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
                <FormGroup className="">
                  <Label className="col-form-label">
                    <span>*</span> Danh mục 1
                  </Label>
                  <Select
                    onChange={handleCategoryFirst}
                    options={categoryFirst}
                    placeholder={"Lựa chọn"}
                    required
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
                  <Input
                    className="form-control"
                    type="number"
                    min="0"
                    value={productPrice}
                    name={productPrice}
                    required
                    onChange={(e) => setProductPrice(e.target.value)}
                    invalid={productPrice < 0}
                    valid={productPrice >= 0}
                  />
                  <FormFeedback>Hãy nhập đầy đủ</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    <span>*</span> Giảm giá
                  </Label>
                  <Input
                    className="form-control"
                    type="number"
                    min="0"
                    max="100"
                    value={productDiscount}
                    name={productDiscount}
                    onChange={(e) => setProductDiscount(e.target.value)}
                    invalid={productDiscount < 0}
                    valid={productDiscount >= 0}
                  />
                  <FormFeedback>Hãy nhập đầy đủ</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    <span>*</span> Số lượng
                  </Label>
                  <Input
                    className="form-control"
                    type="number"
                    value={productStockQuantity}
                    name={productStockQuantity}
                    onChange={(e) => setProductStockQuantity(e.target.value)}
                    invalid={productStockQuantity < 0}
                    valid={productStockQuantity >= 0}
                  />
                  <FormFeedback>Hãy nhập đầy đủ</FormFeedback>
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
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5>Mô tả</h5>
              </CardHeader>
              <CardBody>
                <div className="digital-add needs-validation">
                  <FormGroup className=" mb-0">
                    <div className="description-sm">
                      <Editor onChangeEditor={handleEditor} />
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
                            <div key={i}>
                              <SelectAdd
                                key={i}
                                options={productValues1}
                                onChange={(e) => handleSetVariant(e, i)}
                                value={x}
                                placeholder="Nhập loại hàng"
                              />
                              <Button
                                className="mt-1 mb-1"
                                color="danger"
                                onClick={() => deletVariant(i)}
                              >
                                Xoá
                              </Button>
                              <br />
                            </div>
                          );
                        })}
                        <br />
                      </div>
                      <div className="d-flex justify-content-center">
                        <div className="mt-1 btn-primary p-2" onClick={onAddBtnClick1}>
                          Thêm phân loại hàng 1
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
                            <div key={i}>
                              <SelectAdd
                                key={i}
                                options={productValues2}
                                onChange={(e) => handleSetAtribute(e, i)}
                                placeholder="Nhập loại hàng"
                                value={x}
                              />
                              <Button
                                className="mt-1 mb-1"
                                color="danger"
                                onClick={() => deleteAtrr(i)}
                              >
                                Xoá
                              </Button>
                              <br />
                            </div>
                          );
                        })}
                      </div>
                      <div className="d-flex justify-content-center">
                        <div className="mt-1 btn-primary p-2" onClick={onAddBtnClick2}>
                          Thêm phân loại hàng 2
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
                          <Fragment key={i}>
                            <tr key={i}>
                              <td
                                rowSpan={attributes.length + 1}
                                className="align-middle text-center"
                              >
                                {variant.label}
                              </td>
                            </tr>
                            {attributes.map((attr, idx) => (
                              <tr key={idx}>
                                <td className="align-middle text-center">{attr.label}</td>
                                <td className="align-middle text-center">
                                  <input
                                    className="form-control"
                                    placeholder="Nhập giá"
                                    onChange={(e) => handlePriceAttr(e.target.value, idx, i)}
                                  />
                                </td>
                                <td className="align-middle text-center">
                                  <input
                                    className="form-control"
                                    placeholder="Nhập số hàng tồn kho"
                                    onChange={(e) => {
                                      handleStockAtrr(e.target.value, idx, i);
                                    }}
                                  />
                                </td>
                                <td className="align-middle text-center">
                                  <input
                                    className="form-control"
                                    placeholder="Nhập SKU"
                                    onChange={(e) => {
                                      handleSKUAtrr(e.target.value, idx, i);
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </Fragment>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
                <div className="mt-3">
                  <Label className="col-form-label pt-0">
                    <h5> Ảnh nhóm phân loại 1</h5>
                  </Label>
                  {variants.map((variant, key) => {
                    const idx = key;
                    return (
                      <ImageVariant
                        key={idx}
                        variant={variant}
                        idx={idx}
                        hanldeImageVariant={hanldeImageVariant}
                      />
                    );
                  })}
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
          </div>
        </form>
      </Container>
    </>
  );
}

AddProductPage.getLayout = function getLayout(page) {
  return <LayoutBackEnd>{page}</LayoutBackEnd>;
};
