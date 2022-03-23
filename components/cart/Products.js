import styles from "@/styles/cart.module.css"
import dynamic from 'next/dynamic'
import Link from "next/link";
import {useState} from 'react'
import NumberFormat from "react-number-format";
import { Media, Badge } from "reactstrap";
import {useSession} from 'next-auth/react'
import productStatus from "@/enums/productStatus.enum.js"
import Modal2 from 'react-awesome-modal';
const Variant = dynamic(() => import('@/components/cart/Variant.js'))
export default function ProductsCart ({item,discount,productKey,
  updateSelectProduct,
  vendorKey,updateProduct,updateQuantity,
  updateDeleteOneCart}){
  const {data:session}= useSession()
  const [quantity,setQuantity] = useState(item.quantity)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [disableQuantity, setDisableQuantity] = useState(false)
  const [lastQuantity,setLastQuantity] = useState(item.quantity)
  function closeModal() {
    setVisible(false)
  }
  const handleMinusQuantity = async () => {
    if (quantity >= 2) {
      const finalAmount =  quantity - 1
      let body = {
        amount: finalAmount,
        productId: item.productID
      }
      if (item.variant) {
        body = {
          ...body,
          selectedVariant: item.variant._id
        }
      }
      if (item.attr) {
        body = {
          ...body,
          selectedAttribute: item.attr._id
        }
      }
      const response = await fetch(`${process.env.API_CART_URL}/${item.cartID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + session.accessToken
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (data.status === 200) {
        setQuantity(finalAmount)
        updateQuantity(vendorKey,productKey,finalAmount)
      } else if (data.status === 400) {
        alert(data.message)
      }
    }
  }
  const handlePlusQuantity = async () => {

    const finalAmount = quantity+1
    let body = {
      amount: finalAmount,
      productId: item.productID
    }
    if (item.variant) {
      body = {
        ...body,
        selectedVariant: item.variant._id
      }
    }
    if (item.attr) {
      body = {
        ...body,
        selectedAttribute: item.attr._id
      }

    }
    const response = await fetch(`${process.env.API_CART_URL}/${item.cartID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.accessToken
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    if (data.status === 200) {
      setQuantity(finalAmount)
      updateQuantity(vendorKey,productKey,finalAmount)
    } else if (data.status === 400) {
      setMessage(data.message)
      setVisible(true)
      setTimeout(function () {
        setVisible(false)
      }, 1000)
    }
  }
  const removeFromCart = async () => {
    const response = await fetch(`${process.env.API_CART_URL}/${item.cartID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.accessToken
      },
    })
    const data = await response.json()

    if (data.status == 200) {
      updateDeleteOneCart(vendorKey,productKey,item.cartID)
    }

  }
  const handleSelectProduct = () => {
    updateSelectProduct(vendorKey,productKey)
  }
  const handleQuantity = async () => {
    setDisableQuantity(true)
    const finalQuantity =quantity
    let body = {
      amount: finalQuantity,
      productId: item.productID
    }
    if (item.variant) {
      body = {
        ...body,
        selectedVariant: item.variant._id
      }
    }
    if (item.attr) {
      body = {
        ...body,
        selectedAttribute: item.attr._id
      }

    }
    const response = await fetch(`${process.env.API_CART_URL}/${item.cartID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.accessToken
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    setTimeout(function () {
      setDisableQuantity(false)
      if (data.status === 200) {
        setQuantity(finalAmount)
        updateQuantity(vendorKey,productKey,finalAmount)
      } else if (data.status === 400) {
        setMessage(data.message)
        setVisible(true)
        setQuantity(lastQuantity)
        setTimeout(function () {
          setVisible(false)
        }, 1000)
      }
    },1500)
  }
  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value)
  }
  const hanldeLastValue = (e) => {
    setLastQuantity(e.target.value)
  }
return (
  <>
   <Modal2 visible={visible} width="400" height="300" effect="fadeInUp" onClickAway={() => closeModal()}>
          <i className="fa fa-solid fa-xmark"></i>
          <div className=" d-flex justify-content-center mt-5">
            <img width="100" height="100" src="/assets/icon/icon-danger.svg" />
          </div>
          <div className=" d-flex justify-content-center mt-5">
            <p style={{ fontSize: "16px", color: "red" }}>{message}</p>
          </div>
        </Modal2>
      <tbody>
  <tr>
    <td className={`d-flex ${item.status == productStatus.DISABLE || item.isOutOfStock ? styles.disabled : ""}`}>
      <input type="checkbox"
        className="mr-4 mt-5"
        checked={item.selected}
        onClick={handleSelectProduct}
      />

      <Link href={`/${item.slug}`}>
        <a>
          <Media
            src={item.variant?.image || item.image}
            alt="mubaha.com"
          />
        </a>
      </Link>
    </td>
    <td className={item.status == productStatus.DISABLE || item.isOutOfStock ? styles.disabled2 : ""}>
      <Link href={`/${item.slug}`}>
        <strong className={styles.cursorVendor}>{item.name}</strong>
      </Link>
      {
        item.variant &&
        <Variant item={item} productKey={productKey} updateProduct={updateProduct}
          vendorKey={vendorKey}
        />
      }
      {item.status == productStatus.DISABLE || item.isOutOfStock
        ?
        item.status === productStatus.DISABLE
          ?

          <Badge>
            Không hoạt động
          </Badge>
          :
          <Badge>
            Hết hàng
          </Badge>
        : ""
      }
    </td>
    <td className={item.status == productStatus.DISABLE && item.isOutOfStock && styles.disabled}>
      <h2>
        <NumberFormat
          value={item?.attr?.price * (1 - item.attr?.discount)
            || item.variant?.price * (1 - item.variant?.discount)
            || item.price * (1 - item.discount)}
          thousandSeparator={true}
          displayType="text"
          suffix={item.currencySymbol}
          decimalScale={0}
        />

      </h2>
      {discount > 0 &&
        <del>
          <span className="money ml-1">
            <NumberFormat
              value={item?.attr?.price
                || item.variant?.price
                || item.price}
              thousandSeparator={true}
              displayType="text"
              suffix={item.currencySymbol}
              decimalScale={0}
            />
          </span>
        </del>
      }
    </td>
    <td className={item.status == productStatus.DISABLE || item.isOutOfStock ? styles.disabled : ""}>
      <div className="qty-box">
        <div className="input-group">
          <span className="input-group-prepend">
            <button
              type="button"
              className="btn quantity-left-minus"
              onClick={handleMinusQuantity}
            >
              <i className="fa fa-minus"></i>
            </button>
          </span>
          <input
            type="text"
            disabled={disableQuantity}
            value={quantity}
            onBlur={handleQuantity}
            onChange={handleChangeQuantity}
            onFocus={hanldeLastValue}
            min={1}
            className="form-control input-number"
          />
          <span className="input-group-prepend">
            <button
              type="button"
              className="btn quantity-right-plus"
              onClick={handlePlusQuantity}
            >
              <i className="fa fa-solid fa-plus"></i>
            </button>
          </span>
        </div>
      </div>
    </td>
    <td className={item.status == productStatus.DISABLE || item.isOutOfStock ? styles.disabled : ""}>
      <h2 className="td-color ml-5">
        <NumberFormat
          value={item.quantity * item?.attr?.price * (1 - discount) || item.variant?.price * (1 - discount) || item.price * (1 - discount)}
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
          onClick={removeFromCart}
        ></i>
      </div>
    </td>

  </tr>
</tbody>
  </>
)
}