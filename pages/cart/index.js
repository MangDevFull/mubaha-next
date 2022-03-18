import Head from "next/head";
import LayoutCart from '@/components/LayoutCart.js'
import CartPage from '@/components/CartPage.js'
import { getSession } from 'next-auth/react';
import productStatusEnum from "@/enums/productStatus.enum";
import _ from 'lodash'
export default function Cart({ data }) {
  return (
    <>
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <CartPage data={data} />
    </>
  )
}

Cart.getLayout = function getLayout(page) {
  return <LayoutCart>{page}</LayoutCart>;
};
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  const res = await fetch(process.env.API_CART_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + session.accessToken
    },
  })

  const data = await res.json()
  const products = data.data.docs
  const results = products.map((p,i) =>{
    let value = {
      quantity: p.product.quantity,
      name: p.product.name,
      currencySymbol: p.product.currencySymbol,
      slug: p.product.slug,
      cartID: p.product.cartID,
      selected: false,
      productID: p.product._id,
      discount: p.product.discount,
      status: p.product.status
    }
    if (p.selectedVariant != null && p.selectedAttribute == null) {
      const rs = p.variants.filter(variant => {
        return variant._id === p.selectedVariant
      })
      value = {
        ...value,
        variant: rs[0],
        variants: p.variants,
        variantLable: p.variantLabel,
      }
      if (rs[0].stock.quantity == 0) {
        count+=1
        value = {
          ...value,
          isOutOfStock: true,
        }
      } else {
        value = {
          ...value,
          isOutOfStock: false,
        }
      }
    } else if (p.selectedVariant != null && p.selectedAttribute != null) {
        const rs = p.variants.filter((v) => v._id.toString() === p.selectedVariant)
        let att =[]
      if(rs.length > 0) {
         att = rs[0].attributes.filter(s => {
          return s._id === p.selectedAttribute
        })
      }
      value = {
        ...value,
        variant: rs[0],
        attr: att[0],
        variants: p.variants,
        variantLable: p.variantLabel,
        attributeLabel: p.attributeLabel,
      }
      if (att[0].stock.quantity == 0) {
        count+=1
        value = {
          ...value,
          isOutOfStock: true,
        }
      } else {
        value = {
          ...value,
          isOutOfStock: false,
        }
      }
    } else {
      value = {
        ...value,
        price: p.price,
        image: p.media.featuredImage
      }
      if (p.stock.quantity == 0) {
        count+=1
        value = {
          ...value,
          isOutOfStock: true,
        }
      } else {
        value = {
          ...value,
          isOutOfStock: false,
        }
      }
    }
    return value
  })
  const grouped = _.groupBy(products, p => p.vendor._id);
  return {
    props: {
      data: grouped
    }
  };
}