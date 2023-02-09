import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import { authStore } from "../../../Redux/AuthState";
import Header from "../../LayoutArea/Header/Header";
import UserModel from "../../../Models/UserModel";
import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import "./FollowedVacations.css";

function FollowedVacations(): JSX.Element {

    //  Vacations State: 
    const [followedVacations, setFollowedVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();

    const [vacationsLength, setVacationsLength] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;
    const [paginatedVacations, setPaginatedVacations] = useState([]);
    const numOfPages = Math.ceil(vacationsLength / pageSize)

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        // Return a function which will be called when component is about to be destroyed: 
        return () => unsubscribe();

    }, []);

    async function getFollowedVacations(userId: number) {
        const allVacations = await vacationsService.getAllVacations();
        const isFollowed = await Promise.all(
            allVacations.map(
                vacation => vacationsService.getIsFollowedBy(vacation.vacationId, userId)));
        const followedVacations = [];
        for (let i = 0; i < allVacations.length; i++) {
            if (isFollowed[i]) {
                followedVacations.push(allVacations[i])
            }
        }
        return followedVacations;
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
        setPaginatedVacations(followedVacations.slice((value - 1) * pageSize, pageSize * value));
    };

    //  AJAX Side Effect: 
    useEffect(() => {
        if (!user) {
            return
        }
        getFollowedVacations(user.userId)
            .then(followedVacations => {
                setFollowedVacations(followedVacations)
                setVacationsLength(followedVacations.length);
                setPaginatedVacations(followedVacations.slice((pageNumber - 1) * pageSize, pageSize * pageNumber));
            })
            .catch(err => notifyService.error(err));
    }, [user]);

    return (
        <div className="FollowedVacations">
            <header>
                <Header />
            </header>
            <main style={{ marginBottom: '200px' }}>
                {paginatedVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
            </main>
            <footer>
                <hr />
                <Box justifyContent={"center"} alignItems="center" display={"flex"}
                    sx={{
                        margin: "-2px 0px"
                    }}>
                    <Pagination count={numOfPages} page={pageNumber} onChange={handleChange} />
                </Box>
            </footer>
        </div>
    );
}

export default FollowedVacations;
