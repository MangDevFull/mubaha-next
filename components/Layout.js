import Header from './Header'
import Footer from './Footer'
import useSWR from 'swr'
import fetcher from '../libs/fetcher'

export default function Layout({ children }) {
  const { data, error } = useSWR(`${process.env.API_URL}/categories/mega`, fetcher)

  return (
    <>
      <Header />
      {children}
      <Footer categories={data?.data} />
    </>
  )

}
