import Link from "next/link";
export default function BottomFornLogin() {
  return (
    <>
      <div className="mt-4 d-flex justify-content-center ml-3 mr-3 mb-5">
        <div>
          <Link href="/auth/register">
            <a className="text-primary">Tạo một tài khoản mới</a>
          </Link>
        </div>
      </div>
    </>
  )
}