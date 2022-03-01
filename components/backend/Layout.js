import React, { useState } from "react";
import Sidebar from "@/components/backend/common/sidebar_components/sidebar.js";
import RightSidebar from "@/components/backend/common/right-sidebar";
import Footer from "@/components/backend/common/footer";
import Header from "@/components/backend/common/header_components/header"
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
