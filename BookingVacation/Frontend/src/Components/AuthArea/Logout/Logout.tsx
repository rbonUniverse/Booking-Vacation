import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        try {
            authService.logout();
            notifyService.success("Goodbye...");
            navigate("/login");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }, []);

    return null;
}

export default Logout;
