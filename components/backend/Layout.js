import React, { useState } from "react";
import Sidebar from "@/components/backend/common/sidebar-components/SildeBar.js";
import RightSidebar from "@/components/backend/common/RightSidebar";
import Footer from "@/components/backend/common/Footer";
import Header from "@/components/backend/common/header-components/Header"
const LayoutBackEnd = (props) => {

	return (
		<div>
			<div className="page-wrapper">
				<Header />
				<div className="page-body-wrapper">
					<Sidebar />
					<RightSidebar />
					<div className="page-body">{props.children}</div>
					<Footer />
				</div>
			</div>
		</div>
	);
};
export default LayoutBackEnd;
