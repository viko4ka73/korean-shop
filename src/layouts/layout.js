
import { Nav, Footer } from "../sections";

const Layout = ({ children }) => {
    return (
        <div>
            <Nav />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
