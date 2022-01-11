import MainNavBar from './MainNavbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <MainNavBar />
      {children}
      <Footer />

    </>
  )

}
