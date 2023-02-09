import { Typography } from "@mui/material";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <Typography variant="h2" className="Booking">
                &nbsp;&nbsp;
                Vacations Booking
            </Typography>
            <AuthMenu />
        </div>
    );
}

export default Header;
