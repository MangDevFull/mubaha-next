import React, { Fragment } from "react";
import  Link  from "next/link";
//images import
import man from "../../../../assets-backend/images/dashboard/man.png";

const UserMenu = () => {
	return (
		<Fragment>
			<li className="onhover-dropdown">
				<div className="media align-items-center float-right">
					<img
						className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
						src={man.src}
						alt="header-user"
					/>
					<div className="dotted-animation">
						<span className="animate-circle"></span>
						<span className="main-circle"></span>
					</div>
				</div>
				<ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
					{/* <li>
						<Link href="/admin/products">
							<a>
								<i data-feather="user"></i>Edit Profile
							</a>
						</Link>
					</li>
					<li>
						<a href="#javaScript">
							<i data-feather="mail"></i>Inbox
						</a>
					</li>
					<li>
						<a href="#javaScript">
							<i data-feather="lock"></i>Lock Screen
						</a>
					</li>
					<li>
						<a href="#javaScript">
							<i data-feather="settings"></i>Settings
						</a>
					</li> */}
					<li>
						<Link href={`${process.env.PUBLIC_URL}/`}>
							<a><i data-feather="log-out"></i>Logout</a>
						</Link>
					</li>
				</ul>
			</li>
		</Fragment>
	);
};

export default UserMenu;
