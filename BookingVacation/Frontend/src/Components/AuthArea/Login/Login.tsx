import CredentialsModel from "../../../Models/CredentialsModel";
import { Button, TextField, Typography } from "@mui/material";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import Menu from "../../LayoutArea/Menu/Menu";
import { FaUserAlt } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import "./Login.css";


function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <div className="FaUserAlt"><FaUserAlt /></div>
            <Typography variant="h2" className="Headline">
                &nbsp;&nbsp;

                Login

            </Typography>

            <form onSubmit={handleSubmit(send)}>

                <TextField required type="text" label="Username" className="username" variant="outlined" {...register("username", {
                    required: { value: true, message: "Missing username" },
                    minLength: { value: 4, message: "Username too short" },
                    maxLength: { value: 50, message: "Username too long" },
                })} />
                <span>{formState.errors.username?.message}</span>

                <TextField required type="password" label="password" className="password" variant="outlined" {...register("password", {
                    required: { value: true, message: "Missing password" },
                    minLength: { value: 6, message: "Password too short" },
                    maxLength: { value: 150, message: "Password too long" },
                })} />
                <span>{formState.errors.password?.message}</span>

                <Button type="submit">Login</Button>

            </form>
            <span><Menu /></span>
        </div>
    );
}

export default Login;
