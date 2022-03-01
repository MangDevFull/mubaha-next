import React from "react";
import Helmet from "react-helmet";
import Breadcrumbs from "../common/widgets/Breadcrubs.js"

const CommonLayout = ({ children, title, parent, subTitle }) => {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Vendor Profile</title>
      </Helmet>
      {/* breadcrumb start */}
      <Breadcrumbs title={title} parent={parent} subTitle={subTitle}/>
      <>{children}</>
    </>
  );
};
export default CommonLayout;