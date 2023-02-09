import vacationsService from "../../../Services/VacationsService";
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from '../../SharedArea/Loading/Loading';
import { authStore } from "../../../Redux/AuthState";
import UserModel from "../../../Models/UserModel";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const navigate = useNavigate();

    const [user, setUser] = useState<UserModel>();
    const [isFollowed, setIsFollowed] = useState<boolean | null>(null);
    const [vacationSum, setSum] = useState<number>(null);

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        // Return a function which will be called when component is about to be destroyed: 
        return () => unsubscribe();

    }, []);

    useEffect(() => {
        const vacation = props.vacation;
        if (vacation == null || user == null) {
            return;
        }
        const vacationId = vacation.vacationId;
        const userId = user.userId;
        vacationsService.getIsFollowedBy(vacationId, userId)
            .then(f => setIsFollowed(f))
            .catch(err => notifyService.error(err));

    }, [user, props.vacation]);

    useEffect(() => {
        const vacationId = props.vacation.vacationId;
        vacationsService.getVacationSum(vacationId)
            .then(s => setSum(s))
            .catch(err => notifyService.error(err));
    }, [props.vacation.vacationId, isFollowed]);

    async function deleteVacation() {
        try {

            const iAmSure = window.confirm("Delete this vacation?");
            if (!iAmSure) return;

            await vacationsService.deleteVacation(props.vacation.vacationId);
            notifyService.success("Vacation has been deleted");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    async function toggleFollow() {
        if (isFollowed) {
            await vacationsService.unfollowVacation(user.userId, props.vacation.vacationId);
        }
        else {
            await vacationsService.followVacation(user.userId, props.vacation.vacationId);
        }
        setIsFollowed(!isFollowed);
    }

    function formatDate(date: string) {
        return date.slice(0, 10).split('-').reverse().join('/');
    }

    const FaUserPlusStyle = {
        fontSize: "15px",
        margin: "10px -8px 15px 8px",
    }

    const countNumber = {
        color: "white",
        fontSize: "16px",
        margin: "0% 0% 0% 75%"
    }

    return (
        <div className="VacationCard">
            <div className="userCardNav">
                {user?.roleId === 1 &&
                    <>
                        {isFollowed != null &&
                            <Button onClick={toggleFollow} >
                                <span className="followUnfollow">{isFollowed ? "unfollow" : "follow"}</span>
                                <span>{isFollowed ? "" : <FaUserPlus style={FaUserPlusStyle}></FaUserPlus>}</span>
                            </Button>
                        }

                        <span style={countNumber}>{vacationSum == null ? <Loading /> : vacationSum}</span>
                    </>
                }
            </div>

            <div className="adminCardNav">
                {user?.roleId === 2 &&
                    <>
                        <Button title="Delete Vacation" onClick={deleteVacation}><FaTrash /></Button>
                        <NavLink title="Edit Vacation" to={"/vacations/edit/" + props.vacation.vacationId}><FaEdit /></NavLink>
                    </>}
            </div>
            <div className="card">
                <img src={"http://localhost:3001/api/vacations/images/" + props.vacation.imageName} />
                <br />
                <div className="text">
                    <span> Destination: {props.vacation.destination}</span>
                    <br />
                    <br />
                    <span> Description: {props.vacation.description}</span>
                    <br />
                    <br />
                    <span> Depart Date: {formatDate(props.vacation.departDate)}</span>
                    <br />
                    <span> Return Date: {formatDate(props.vacation.returnDate)}</span>
                    <br />
                    <br />
                    <span> Price: {props.vacation.price}</span>
                    <br />
                </div>
            </div>

        </div>
    );
}

export default VacationCard;
