import styles from "@/styles/cart.module.css"
import Link from "next/link";
import dynamic from 'next/dynamic'
import {
   Card, CardBody, CardHeader, CardFooter
} from "reactstrap";
const Products = dynamic(() => import('@/components/cart/Products.js'));
export default function VendorCart({ p, vendorKey, updateProduct, updateQuantity ,
  updateDeleteOneCart,updateSelectProduct,updateSelectVendor}) {
  const handleSelectVendor = ()=>{
    updateSelectVendor(vendorKey)
  }
  return (
    <>
      <Card style={{ border: 'none' }} className="mt-0">
        <CardHeader style={{ backgroundColor: 'white' }}>
          <div className=" mb-2">
            {!p.count == p.totalDocs ? "" :
              <input type="checkbox"
                className="mr-4 mt-5"
                checked={p.selected}
                onClick={handleSelectVendor}
              />
            }
            <img src="/assets/icon/shop-icon.png" className="mr-2" />
            <Link href={`/vendors/${p.vendor.owner.username}`}>
              <strong className={styles.cursorVendor}>{p.vendor.brandName}</strong>
            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <table className="ml-3">
            {p.products.map((item, index) => {
              let discount
              if (item.attr) discount = item.attr.discount
              else if (item.variant) discount = item.variant.discount
              else discount = item.discount
              return (
                <Products item={item} discount={discount}
                updateDeleteOneCart={updateDeleteOneCart}
                vendor={p} updateSelectProduct={updateSelectProduct}
                  updateProduct={updateProduct} productKey={index} vendorKey={vendorKey}
                  updateQuantity={updateQuantity} />
              );
            })}
          </table>
        </CardBody>
        <CardFooter className="text-muted" style={{ backgroundColor: 'white' }}>
          <div className="d-flex mb-2 mt-3">
            <strong>Shop Khuyến Mãi</strong> <span className="ml-2">Vui lòng chọn sản phẩm trước</span>
          </div>
        </CardFooter>
      </Card>
    </>
  )

} 