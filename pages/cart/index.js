import Head from "next/head";
import LayoutCart from '@/components/LayoutCart.js'
import CartPage from '@/components/CartPage.js'
import { getSession } from 'next-auth/react';
import productStatusEnum from "@/enums/productStatus.enum";
export default function Cart({ data, totalP }) {
  return (
    <>
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <CartPage data={data} totalP={totalP} />
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
  const fullP = data.data.vendors.map(product => {
    let count = 0
    const d = product.products.map((p, index) => {
      if(p.status === productStatusEnum.DISABLE ){
        count += 1
      }
      let value = {
        quantity: p.quantity,
        name: p.name,
        currencySymbol: p.currencySymbol,
        slug: p.slug,
        cartID: p.cartID,
        selected: false,
        productID: p._id,
        discount: p.discount,
        status: p.status
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
    return {
      vendor: product.vendor,
      selected: false,
      totalDocs: product.totalDocs,
      products: d,
      count: count,
    }
  })
  const totalP = data.data?.totalProducts || 0


  // Pass data to the page via props
  return {
    props: {
      data: fullP,
      totalP: totalP
    }
  };
}