import Head from "next/head";
import LayoutCart from '@/components/LayoutCart.js'
import CartPage from '@/components/CartPage.js'
import API from '@/services/api.js';
import { getSession,useSession } from 'next-auth/react';

export default function Cart({data,totalP}){
    return(
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

    const fullP = data.data.products.map(product => {
      const d = product.products.map((p, index) => {
        let value = {
          quantity: p.quantity,
          name: p.name,
          currencySymbol: p.currencySymbol,
          slug: p.slug,
          cartID:p.cartID,
          selected: false,
          productID: p._id
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
        } else if (p.selectedAttribute != null && p.selectedVariant != null) {
          const rs = p.variants.filter(variant => {
            return variant._id === p.selectedVariant
          })
          value = {
            ...value,
            variant: rs[0],
            attr: rs[0].sizes.filter(s => {
              return s._id === p.selectedAttribute
            })[0],
            variants: p.variants,
            variantLable: p.variantLabel,
            attributeLabel: p.attributeLabel
          }
        } else {
          price = {
            ...value,
            price: p.price,
            image: p.media.featuredImage
          }
        }
        return value
      })
      return {
        vendor: product._id,
        selected: false,
        totalDocs: product.totalDocs,
        products: d
      }
    })
    const totalP = data.data?.totalProducts[0]?.product || 0

  // Pass data to the page via props
  return {
    props: {
     data: fullP,
     totalP: totalP
    }
  };
}