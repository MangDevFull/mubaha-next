import React from 'react';
import { Col, Media } from 'reactstrap';
import Category from './Category';
import Brand from './Brand'
import Price from './Price';
import Location from './Location.js'
const FilterPage = ({sm,sidebarView,closeSidebar}) => {
    return (
        <>
            <Col sm={sm} className="collection-filter" style={sidebarView ? {left:"0px"} : {}}>
                {/* <!-- side-bar colleps block stat --> */}
                <div className="collection-filter-block">
                    {/* <!-- brand filter start --> */}
                    <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                        <span className="filter-back">
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>
                    <Category />
                    <Location />
                    <Brand/>
                    <Price />
                </div>
                {/* <!-- silde-bar colleps block end here -->*/}
                {/* <!-- side-bar banner start here -->  */}
                <div className="collection-sidebar-banner">
                    <a href={null}><Media  className="img-fluid blur-up lazyload" alt="" /></a>
                </div>
                {/* <!-- side-bar banner end here --> */}
            </Col>
        </>
    )
}

export default FilterPage;