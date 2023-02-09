import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import vacationsService from "../../../Services/VacationsService";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, TextField, Typography } from "@mui/material";
import notifyService from "../../../Services/NotifyService";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./EditVacation.css";

function EditVacation(): JSX.Element {
    const now = new Date();
    //custom hook Verify Admin
    useVerifyAdmin();

    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue, getValues, control } = useForm<VacationModel>();

    const [departDate, setDepartDate] = useState<string>(null);

    useEffect(() => {
        const id = +params.vacationId;
        vacationsService.getOneVacation(id)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("departDate", new Date(vacation.departDate).toISOString().slice(0, 10));
                setDepartDate(new Date(vacation.departDate).toISOString().slice(0, 10));
                setValue("returnDate", new Date(vacation.returnDate).toISOString().slice(0, 10));
                setValue("image", vacation.image);
                setValue("price", vacation.price);
            })
            .catch(err => notifyService.error(err));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.updateVacation(vacation);
            notifyService.success("Vacation has been updated");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    async function cancelEdit() {
        try {
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditVacation">

            <form onSubmit={handleSubmit(send)}>

            <Typography variant="h2" className="Headline">
                &nbsp;&nbsp;
                Edit Vacation
            </Typography>

                <input type="hidden" {...register("vacationId")} />


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
                    <Controller
                        name="departDate"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => {
                            const onChangeWrapper = (...event: any[]) => {
                                onChange(event);
                                setDepartDate(getValues().departDate);
                            };
                            return (
                                <DesktopDatePicker
                                    label="Depart Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={value}
                                    onChange={onChangeWrapper}
                                    minDate={now}
                                    renderInput={(params) => {
                                        return <TextField  {...params} />;}}
                                    views={["day", "month"]}
                                    showDaysOutsideCurrentMonth
                                />
                            )
                        }}
                        rules={{ required: 'Date required required' }} />

                    <Controller
                        name="returnDate"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error }, formState }) => {

                            return (
                                <DesktopDatePicker
                                    label="Return Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={value}
                                    onChange={onChange}
                                    minDate={departDate}
                                    renderInput={(register) => <TextField {...register} />}

                                    // {...register("departDate", {
                                    //     required: { value: true, message: "Depart Date Missing" },
                                    // })} />;

                                    views={["day", "month"]}
                                    showDaysOutsideCurrentMonth
                                />
                            );
                        }}
                        rules={{ required: 'Date required required' }}
                    />
                </LocalizationProvider>

                <TextField required type="number" label="Price" className="price" variant="outlined" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: "100", message: "Price too short" },
                    max: { value: "10000", message: "Price too long" },
                })} />
                <span>{formState.errors.price?.message}</span>

                <span className="FaCamera"><FaCamera /></span>
                <TextField required type="file" {...register("image")} />

                <Button type="submit">Submit</Button>
                <Button onClick={cancelEdit}>Cancel</Button>
            </form>


        </div>
    );
}

export default EditVacation;
