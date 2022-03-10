import HeaderThree from '@/components/HeaderThree.js';
import Footer from '@/components/Footer.js'

export default function HeaderTwo({ children }) {

  return (
    <div>
  <HeaderThree />
      
      { children }
      <div>
      <Footer />
    </div>

    </div>
  )
}
