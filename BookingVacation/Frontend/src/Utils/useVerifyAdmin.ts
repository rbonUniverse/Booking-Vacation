import notifyService from "../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import { useEffect } from "react";

function useVerifyAdmin() {

    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.getState().token) {
            notifyService.error("You are not Admin!!!");

            //send user to login page
            navigate("/login");
        }
    }, [])

}

export default useVerifyAdmin;