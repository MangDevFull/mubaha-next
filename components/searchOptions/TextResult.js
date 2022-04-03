import {Row,Col} from "reactstrap"
export default function TextResult({text}){
  return(
    <Row>
    <Col xs="12" >
      <div className="mt-4 mb-4">
        <h3>Kết quả tìm kiếm cho danh mục: <strong>{text}</strong></h3>
      </div>
    </Col>
  </Row>
  )
} 