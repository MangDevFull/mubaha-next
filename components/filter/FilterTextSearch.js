import { Col } from 'reactstrap';
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import dynamic from 'next/dynamic'
const Category = dynamic(() => import('@/components/filterOptions/Category'))
const Price = dynamic(() => import('@/components/filterOptions//Price'))
const Rating = dynamic(() => import('@/components/filterOptions//Rating'))
const Brand = dynamic(() => import('@/components/filterOptions//Brand'))
const Location = dynamic(() => import('@/components/filterOptions//Location'))
const Skeleton = dynamic(() => import('@/components/filterOptions/SkeletonFilterOption'))
const FilterPage = ({ sm, sidebarView, closeSidebar, hanldeBrand, handleLocation,
     hanldePrice, text ,hanldeRating,hanldeCategory}) => {
    const { data, error } = useSWR(`${process.env.API_PRODUCT_URL}/filters?t=${text}`, fetcher)
    if(error) {
        console.error(error)
    }
    return (
        <>
            <Col sm={sm} className="collection-filter" style={sidebarView ? { left: "0px" } : {}}>
                <div className="collection-filter-block">
                    <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                        <span className="filter-back">
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>
                    {data ? (
                        data.data != null 
                        ?
                        <>
                            <Category categories={data.data.categories} hanldeCategory={hanldeCategory} />
                            <Location stockCountries={data.data.stockCountries} handleLocation={handleLocation} />
                            <Rating hanldeRating={hanldeRating} />
                            <Brand hanldeBrand={hanldeBrand} brands={data.data.brands} />
                            <Price hanldePrice={hanldePrice} />
                        </>
                        :"Không tìm thấy các sự lựa chọn nào"
                    ) : (
                        <Skeleton /> 
                    )}

                </div>
            </Col>
        </>
    )
}

export default FilterPage;