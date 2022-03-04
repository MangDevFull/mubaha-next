import Select from 'react-select'
import { FormGroup, Label } from "reactstrap"

export default function CategorySelect() {

  return (
    <>
      <FormGroup>
        <Label className="col-form-label">
          <span>*</span> Danh mục 1
        </Label>
        <Select
          onChange={handleCategoryFirst}
          options={categoryFirst}
          placeholder={"Lựa chọn"}
        />
      </FormGroup>
      <FormGroup>
        <Label className="col-form-label">
          <span>*</span> Danh mục 2
        </Label>
        <Select
          isDisabled={isDisableSecond}
          onChange={handleCategorySecond}
          options={categorySecond}
          placeholder={"Lựa chọn"}
        />
      </FormGroup>
      <FormGroup>
        <Label className="col-form-label">
          <span>*</span> Danh mục 3
        </Label>
        <Select
          isDisabled={isDisableThird}
          options={categoryThird}
          placeholder={placeholderCategory}
          onChange={(e) => {
            setSelectThirdCategory(e.value)
          }}
        />
      </FormGroup>
    </>
  )
}