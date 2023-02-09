import vacationsService from "../../../Services/VacationsService";
import { Button, TextField, Typography, Link } from "@mui/material";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaCamera } from 'react-icons/fa';
import { useState } from "react";
import "./AddVacation.css";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

function AddVacation(): JSX.Element {
    const now = new Date();
    //custom hook Verify Admin
    useVerifyAdmin();

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [departDate, setDepartDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.addVacation(vacation);
            notifyService.success("Added!!!");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    async function cancelAdd() {
        try {
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation">


            <form onSubmit={handleSubmit(send)}>
                
            <Typography variant="h2" className="Headline">
                &nbsp;&nbsp;
                Add Vacation
            </Typography>

                <TextField required type="text" label="Destination" className="destination" variant="outlined" {...register("destination", {
                    required: { value: true, message: "Destination missing" },
                    minLength: { value: 2, message: "Destination field is short" },
                    maxLength: { value: 50, message: "Destination is too long" },
                })} />
                <span>{formState.errors.destination?.message}</span>

                <TextField required type="text" label="Description" className="description" variant="outlined" {...register("description", {
                    required: { value: true, message: "Description missing" },
                    minLength: { value: 2, message: "Description field is short" },
                    maxLength: { value: 500, message: "Description is too long" },
                })} />
                <span>{formState.errors.description?.message}</span>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Depart Date"
                        inputFormat="DD/MM/YYYY"
                        value={departDate}
                        onChange={setDepartDate}
                        minDate={now}
                        renderInput={(params) => {
                            return <TextField  {...params} />;
                        }}
                        views={["day", "month"]}
                        showDaysOutsideCurrentMonth
                    />
                    <span>{formState.errors.departDate?.message}</span>
                    <DesktopDatePicker
                        label="Return Date"
                        inputFormat="DD/MM/YYYY"
                        value={returnDate}
                        onChange={setReturnDate}
                        minDate={departDate}
                        renderInput={(register) => <TextField {...register} />}
                        views={["day", "month"]}
                        showDaysOutsideCurrentMonth
                    />
                    <span>{formState.errors.returnDate?.message}</span>
                </LocalizationProvider>

                <TextField required type="number" label="Price" className="price" variant="outlined" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: "100", message: "Price too short" },
                    max: { value: "10000", message: "Price too long" },
                })} />
                <span>{formState.errors.price?.message}</span>

                <span className="FaCamera"><FaCamera /></span>
                <TextField required type="file" {...register("image")} />

                <Button type="submit">Add</Button>
                <Button onClick={cancelAdd}>Cancel</Button>
            </form>

        </div>
    );
}

export default AddVacation;