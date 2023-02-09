import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import Loading from "../../SharedArea/Loading/Loading";
import Header from "../../LayoutArea/Header/Header";
import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import "./VacationsList.css";

function VacationsList(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [vacationsLength, setVacationsLength] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;
    const [loading, setLoading] = useState(true);

    const [paginatedVacations, setPaginatedVacations] = useState([]);
    const numOfPages = Math.ceil(vacationsLength / pageSize)

    // AJAX Side Effect: 
    useEffect(() => {
        // Get vacations from server: 
        vacationsService.getAllVacations()
            .then(vacations => {
                setVacations(vacations);
                setVacationsLength(vacations.length);
                setPaginatedVacations(vacations.slice((pageNumber - 1) * pageSize, pageSize * pageNumber));
                setLoading(false);
            })
            .catch(err => notifyService.error(err));
    }, []);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
        setPaginatedVacations(vacations.slice((value - 1) * pageSize, pageSize * value));
    };

    return (
        <div className="VacationsList">
            <header>
                <Header />
            </header>

            <main style={{ marginBottom: '200px' }}>
                {loading && <Loading />}
                {!loading && paginatedVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
            </main>

            <footer>
                <hr />
                <Box justifyContent={"center"} alignItems="center" display={"flex"}
                    sx={{
                        margin: "-2px 0px 20px 0px"
                    }}>
                    <Pagination count={numOfPages} page={pageNumber} onChange={handleChange} />
                </Box>
            </footer>
        </div >
    );
}

export default VacationsList;
