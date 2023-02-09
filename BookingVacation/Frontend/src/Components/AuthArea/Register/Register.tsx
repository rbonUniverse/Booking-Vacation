import { Button, TextField, Typography } from "@mui/material";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import Menu from "../../LayoutArea/Menu/Menu";
import { FaUserAlt } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

            <div className="FaUserAlt"><FaUserAlt /></div>
            <Typography variant="h2" className="Headline">
                &nbsp;&nbsp;

                Register

            </Typography>

            <form onSubmit={handleSubmit(send)}>
                <TextField required type="text" label="First Name" className="TextBox" variant="outlined" {...register("firstName", {
                        required: { value: true, message: "Missing first name" },
                        minLength: { value: 2, message: "First name too short" },
                        maxLength: { value: 50, message: "First name too long" },
                    })} />
                <span>{formState.errors.firstName?.message}</span>

                <TextField required type="text" label="Last Name" className="TextBox" variant="outlined" {...register("lastName", {
                    required: { value: true, message: "Missing last name" },
                    minLength: { value: 2, message: "Last name too short" },
                    maxLength: { value: 50, message: "Last name too long" },
                })} />
                <span>{formState.errors.lastName?.message}</span>

                <TextField required type="text" label="Username" className="username" variant="outlined" {...register("username", {
                    required: { value: true, message: "Missing username" },
                    minLength: { value: 4, message: "Username too short" },
                    maxLength: { value: 50, message: "Username too long" },
                })} />
                <span>{formState.errors.username?.message}</span>

                <TextField required type="password" label="Password" className="password" variant="outlined" {...register("password", {
                    required: { value: true, message: "Missing password" },
                    minLength: { value: 6, message: "Password too short" },
                    maxLength: { value: 150, message: "Password too long" },
                })} />
                <span>{formState.errors.password?.message}</span>

                <Button type="submit">Register</Button>

            </form>
            <span><Menu /></span>
        </div>
    );
}

export default Register;
