import { Media } from "reactstrap";


export default function HeaderSettings() {

  return (
    <li className="onhover-div mobile-setting">
      <div>
        <Media src="/assets/images/icon/setting.png" className="img-fluid" alt="" />
        <i className="fa fa-cog"></i>
      </div>
      {/* <div>
        <Media src="/assets/svg/flags/vn.svg" width="32"
          className="img-fluid mr-2" alt="" /><span>VNĐ</span>
      </div> */}
      <div className="show-div setting">
        <h6>Ngôn ngữ</h6>
        <ul>
          <li><a href="#">Tiếng Việt</a></li>
          <li><a href="#">English</a></li>
          <li><a href="#">简体中文</a></li>
          <li><a href="#">Japanese</a></li>
          <li><a href="#">Korean</a></li>
        </ul>
        <h6>Tiền tệ</h6>
        <ul className="list-inline">
          <li className="active"><a href="#">VNĐ</a></li>
          <li><a href="#">USD</a></li>
          <li><a href="#">NDT (CN)</a></li>
          <li><a href="#">Yên (JP)</a></li>
          <li><a href="#">Won (KR)</a></li>
        </ul>
      </div>
    </li>
  )
}