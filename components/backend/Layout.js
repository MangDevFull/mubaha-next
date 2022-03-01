import Header  from "./common/header_components/header.js"
import Footer from "./common/footer.js"
const Layout = ({children}) =>{
    return (
        <div>
            <div className="page-wrapper">
                <Header />
                <div className="page-body-wrapper">
                    <Sidebar />
                    <RightSidebar />
                    <div className="page-body">{children}</div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
export default Layout