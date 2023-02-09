import { NavLink } from 'react-router-dom';
import { authStore } from '../../../Redux/AuthState';
import UserModel from '../../../Models/UserModel';
import { useEffect, useState } from "react";
import { FaPlus } from 'react-icons/fa';
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        // Return a function which will be called when component is about to be destroyed: 
        return () => unsubscribe();

    }, []);

    const FaPlusStyling = {
        fontSize: "12px",
    }

    return (
        <div className="AuthMenu">
            <div className="userNav">
                {user?.roleId === 1 &&
                    <>
                        <NavLink to="/vacations">All Vacations</NavLink>
                        <NavLink to="/vacations/:vacationId/is-followed-by/:userId">My Vacations</NavLink>
                        <NavLink to="/logout">Logout</NavLink>
                    </>}
            </div>

            <div className="adminNav">
                {user?.roleId === 2 &&
                    <>
                        <NavLink title='Add Vacation' to="/vacations/add"><FaPlus style={FaPlusStyling}></FaPlus></NavLink>
                        <NavLink to="/vacations">All Vacations</NavLink>
                        <NavLink to="/vacations/reports">Reports</NavLink>
                        <NavLink to="/logout">Logout</NavLink>
                    </>}
            </div>

        </div>
    );
}

export default AuthMenu;

