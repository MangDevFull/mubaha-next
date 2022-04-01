
import styles from "./HeaderTwo.module.css";
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import {
  Dropdown,
  DropdownMenu, DropdownItem,
  DropdownToggle
} from 'reactstrap'
export default function Search() {
  const router = useRouter()
  const inputRef = useRef()
  const hanldeSearch = (e) => {
    const value = inputRef.current.value
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: { t: value },
    })
  }
  const [list, setList] = useState(["Go to the store", "Wash the dishes", "Learn some code"])
  function removeItem(item) {
    // Put our list into an array
    const list = list.slice();
    // Check to see if item passed in matches item in array
    list.some((el, i) => {
      if (el === item) {
        // If item matches, remove it from array
        list.splice(i, 1);
        return true;
      }
    });
    // Set state to list
    setList(list);
  }
  function handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = list;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        // change current item to lowercase
        const lc = item.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = list;
    }
    // Set the filtered state based on what our rules added to newList
    setList(newList);


  }
  const [isOpen, setIsOpen] = useState(false);
  const setOpen = () => {
    setIsOpen(true);
  }
  return (
    <div className="d-flex justify-content-center">
    <Dropdown
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
    >
      <DropdownToggle style={{backgroundColor:"#232f3e",border:"none",cursor:"none"}} className="p-0">
          <form className={`${styles.form_search} d-none d-xl-block`} role="form">
            <input
            autoComplete="off"
            autoCorrect={false}
              id="query search-autocomplete"
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="nav-search nav-search-field"
              aria-expanded="true"
            />
            <button type="submit" name="nav-submit-button" className="btn-search">
              <i className="fa fa-search"></i>
            </button>
          </form>
      </DropdownToggle>
      <DropdownMenu
      style={{width: '100%'}}
      >
        <DropdownItem header>
          Header
        </DropdownItem>
        <DropdownItem>
          Some Action
        </DropdownItem>
        <DropdownItem text>
          Dropdown Item Text
        </DropdownItem>
        <DropdownItem disabled>
          Action (disabled)
        </DropdownItem>
        <DropdownItem divider />
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