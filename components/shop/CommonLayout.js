import React from "react";
import Breadcrumbs from "../common/widgets/Breadcrubs.js"

const CommonLayout = ({ children, title, parent, subTitle }) => {
  return (
    <>
      
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      {/* breadcrumb start */}
      <Breadcrumbs title={title} parent={parent} subTitle={subTitle}/>
      <>{children}</>
    </>
  );
};
export default CommonLayout;