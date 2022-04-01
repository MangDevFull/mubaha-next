
import styles from "@/styles/search.module.css";
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Brandimage from '../assets/icons/shop.svg'
import {
  Dropdown,
  DropdownMenu, DropdownItem,
  DropdownToggle
} from 'reactstrap'
export default function Search() {
  const router = useRouter()
  const inputRef = useRef()
  const [brand, setBrand] = useState("")
  const hanldeSearch = (e) => {
    const value = inputRef.current.value
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: { t: value },
    })
  }
  const handleBrand = (value) => {
    setBrand(value);
  }
  const hanldeSearchBrand = (value) => {
    router.push({
      pathname: '/vendors',
      query: { t: brand },
    },undefined)
  }
  console.log("brabd",brand)
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="d-flex justify-content-center">
      <Dropdown
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      >
        <DropdownToggle className={`p-0 ${styles.dropSearch}`}>
          <form className={`${styles.form_search} d-none d-xl-block`} role="form">
            <input
              autoComplete="off"
              id="query search-autocomplete"
              type="search"
              onChange={(e) => handleBrand(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="nav-search nav-search-field"
              aria-expanded="true"
            />
            <button type="submit" name="nav-submit-button"
              onClick={hanldeSearch}
              className="btn-search">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </DropdownToggle>
        <DropdownMenu className="w-100">
          {brand.length > 0 &&
            <DropdownItem onClick={hanldeSearchBrand}>
              <div className="d-flex">
                <Image
                  src={Brandimage}
                  width={19}
                  height={18}
                />
                <span className="ml-2 mr-2">
                  Tìm shop
                </span>
                <strong>
                  {brand}
                </strong>
              </div>
            </DropdownItem>
          }
          <DropdownItem>
            Some Action
          </DropdownItem>
          <DropdownItem text>
            Dropdown Item Text
          </DropdownItem>
          <DropdownItem>
            Foo Action
          </DropdownItem>
          <DropdownItem>
            Bar Action
          </DropdownItem>
          <DropdownItem>
            Quo Action
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}