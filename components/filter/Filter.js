import React ,{useContext}from 'react';
import { Col, Media } from 'reactstrap';
import Category from './Category';
import Brand from './Brand'
import Price from './Price';
import Rating from './Rating'
import Location from './Location.js'
const FilterPage = ({sm,sidebarView,closeSidebar,hanldeBrand,handleLocation}) => {

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
                    <Location handleLocation={handleLocation} />
                    <Rating />
                    <Brand hanldeBrand={hanldeBrand}/>
                    <Price />
                </div>
            </Col>
        </>
    )
}

export default FilterPage;