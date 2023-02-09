import FollowedVacations from "../../VacationsArea/FollowedVacations/FollowedVacations";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import PageNotFound from "../../LayoutArea/PageNotFound/PageNotFound";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import Reports from "../../AuthArea/Reports/Reports/Reports";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../../AuthArea/Register/Register";
import Logout from "../../AuthArea/Logout/Logout";
import Login from "../../AuthArea/Login/Login";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Logout */}
                <Route path="/logout" element={<Logout />} />

                {/* Register */}
                <Route path="/register" element={<Register />} />

                 {/* All User Vacations */}
                <Route path="/vacations" element={<VacationsList />} />

                {/* All Vacations the User Following After */}
                <Route path="/vacations/:vacationId/is-followed-by/:userId" element={<FollowedVacations />} />

                {/* Add New Vacation */}
                <Route path="/vacations/add" element={<AddVacation />} />

                {/* Edit Vacation */}
                <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />

                {/* Vacations Reports For Admin */}
                <Route path="/vacations/reports" element={<Reports />} />

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Page not found */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
