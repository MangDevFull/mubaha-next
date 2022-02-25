import Link from "next/link";
import { Row } from "reactstrap";
export default function BottomFornLogin() {
  return (
    <>
      <Row className="mt-5 d-flex justify-content-center  ml-3 mr-3 mb-5">
        <div>
          <Link href="/auth/register">
            <a className="text-primary">Tạo một tài khoản mới</a>
          </Link>
        </div>
      </Row>
    </>
  )
}