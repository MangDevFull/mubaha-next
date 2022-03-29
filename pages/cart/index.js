import Head from "next/head";
import LayoutCart from '@/components/LayoutCart.js'
import CartPage from '@/components/cart/CartPage.js'
import { getSession } from 'next-auth/react';
import productStatusEnum from "@/enums/productStatus.enum";
import ProductCollection1 from "@/components/ProductCollection1";
import _ from 'lodash'
export default function Cart({ data }) {
  return (
    <>
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <CartPage data={data} />
      <ProductCollection1 title="gợi ý hôm nay" data={data.relatedProducts} />
    </>
  )
}

Cart.getLayout = function getLayout(page) {
  return <LayoutCart>{page}</LayoutCart>;
};
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const query = ctx.query.cartId
  const res = await fetch(process.env.API_CART_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + session.accessToken
    },
  })
  let unActive = 0
  const data = await res.json()
  let send = { relatedProducts: data.data.relatedProducts }
  if (data.data.cartItems !== null) {
    const results = data.data.cartItems.grouped
    const final = results.map(product => {
      let countActive = 0
      let countOutOfStocks = 0
      let countChange = 0
      let countSelection = 0
      const d = product.products.map((p, index) => {
        if (p.product.status === productStatusEnum.DISABLE) {
          countActive += 1
          unActive += 1
        }
        if (query === p._id) {
          countSelection += 1
        }
        if (p.isChanged) {
          countChange += 1
        }
        let value = {
          quantity: p.amount,
          name: p.product.name,
          currencySymbol: p.product.currencySymbol,
          slug: p.product.slug,
          cartID: p._id,
          selected: query === p._id,
          productID: p.product._id,
          discount: p.product.discount,
          status: p.product.status,
          price: p.price,
          discount: p.discount,
          isChanged: p.isChanged
        }
        if (p.selectedVariant != null && p.selectedAttribute == null) {
          value = {
            ...value,
            variantLable: p.product.variantLabel,
            variant: p.selectedVariant,
            variants: p.product.variants,
          }
          if (p.selectedVariant.stock.quantity == 0 && p.product.status !== productStatusEnum.DISABLE) {
            countOutOfStocks += 1
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
          value = {
            ...value,
            variant: p.selectedVariant,
            attr: p.selectedAttribute,
            variants: p.product.variants,
            variantLable: p.product.variantLabel,
            attributeLabel: p.product.attributeLabel,
          }
          if (p.selectedAttribute.stock.quantity == 0 && p.product.status !== productStatusEnum.DISABLE) {
            countOutOfStocks += 1
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
            price: p.product.price,
            image: p.product.media.featuredImage
          }
          if (p.product.stock.quantity == 0) {
            count += 1
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
      return {
        vendor: product.vendor,
        selected: product.products.length - countChange - countOutOfStocks - countOutOfStocks === countSelection,
        totalDocs: product.products.length,
        products: d,
        count: countActive + countChange + countOutOfStocks,
      }
    })
    send = {
      ...send, fullP: final,
      page: data?.data?.cartItems.page,
      totalPage: data?.data?.cartItems.totalPages, totalDocs: data?.data?.cartItems.totalDocs,
      unActive: unActive
    }
  } else {
    send = {
      ...send,
      fullP: []
    }
  }

  return {
    props: {
      data: send
    }
  };
}