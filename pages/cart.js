import Head from "next/head";
import LayoutCart from '@/components/LayoutCart.js'
import CartPage from '@/components/CartPage.js'

export default function Cart(){
    return(
      <>
      <Head>
      <title>Giỏ hàng</title>
      </Head>
        <CartPage />
      </>
    )
}

Cart.getLayout = function getLayout(page) {
  return <LayoutCart>{page}</LayoutCart>;
};