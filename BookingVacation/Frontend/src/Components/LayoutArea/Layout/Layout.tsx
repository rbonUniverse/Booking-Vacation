import Routing from "../../LayoutArea/Routing/Routing";
import "./Layout.css";



function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <main>
                <Routing />
            </main>
        </div>
    );
}

export default Layout;
