import React, { useState } from "react";
import { useStyle } from "./style.js";
import {
    Checkbox,
    FormControlLabel,
    Grid,
    useTheme
} from "@material-ui/core";
import { CustomTextField } from "../../MaterialUiComponents/CustomTextField";
import { CustomPasswordTextField } from "../../MaterialUiComponents/CustomPasswordTextField";
import { CustomMainButton } from "../../MaterialUiComponents/CustomMainButton";
import { useHistory } from "react-router-dom";
import Spinner from '../Spinner/spinner';

export function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [stayConnected, setStayConnected] = useState(false);
    const [formErrors, setFormErrors] = useState({
        username: "",
        email: "",
        password: "",
        submit: "",
    });
    const [formIsInvalid, setFormIsInvalid] = useState(false);
    const [loading, setLoading] = useState(false);

    const classes = useStyle();

    const history = useHistory();
    let theme = useTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            setFormIsInvalid(false);
            let submitBody = {
                user:{
                    username: username,
                    email: email,
                    password: password
                },
                stayConnected: stayConnected
            };
            setLoading(true);
            await fetch(process.env.REACT_APP_API_URL + "api/v1/user/new",{
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(submitBody)
            })
                .then((response) => {
                        return {ok: response.ok, body: response.json()};
                })
                .then((response) => {
                    if(response.ok) {
                        setLoading(false);
                        history.push("/");
                    }
                    else{
                        setLoading(false);
                        response.body.then((body) => {
                            setFormIsInvalid(true);
                            console.log(body);
                            let errors = body.errors;
                            setFormErrors({
                                username: errors["username"] ? errors["username"].message : "",
                                email: errors["email"] ? errors["email"].message : "",
                                password: errors["password"] ? errors["password"].message : "",
                                submit:
                                    "Les informations que vous avez fournies sont incorrectes.",
                            });
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setFormIsInvalid(true);
        }
    };

    const handleUsernameChange = (event) => {
        event.preventDefault();
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    };

    const handleShowPasswordClick = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    // Check if form is valid, if not set the differents errors messages in formErrors
    const validateForm = () => {
        let isValid = true;

        let errors = {};

        username === ""
            ? (errors.username = "Un nom d'utilisateur est requis pour s'inscrire !")
            : username.length < 5
            ? (errors.username = "Le nom d'utilisateur doit contenir au moins 5 caractères !")
            : (errors.username = "");
        email === ""
            ? (errors.email = "Un email est requis pour s'inscrire !")
            : (errors.email = "");
        password === ""
            ? (errors.password = "Un mot de passe est requis pour s'inscrire !")
            : password.length < 8
            ? (errors.password =
                "Le mot de passe doit contenir au moins 8 caractères !")
            : (errors.password = "");
        errors.submit = "";

        setFormErrors(errors);

        Object.values(errors).forEach((value) => {
            value.length > 0 && (isValid = false);
        });

        return isValid;
    };

    return (
        <>
            <Spinner
                loading={loading}
                color={theme.palette.primary.main}
            />
            <Grid
                container
                align="center"
                justify={"center"}
                className={classes.loginContainer}
            >
                <Grid
                    container
                    item
                    alignContent="center"
                    md={6}
                    lg={4}
                    xl={3}
                    className={classes.loginContainer}
                    style={{ backgroundColor: "white" }}
                >
                    <Grid item xs={12}>
                        <h1
                            style={{
                                fontFamily: "Pacifico, cursive",
                            }}
                        >
                            S'inscrire
                        </h1>
                    </Grid>
                    <Grid item xs={12}>
                        <form
                            onSubmit={handleSubmit}
                            style={{ width: "75%", marginTop: "2em" }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        label="Nom d'utilisateur"
                                        name="username"
                                        onChange={handleUsernameChange}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        label="Email"
                                        name="email"
                                        onChange={handleEmailChange}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomPasswordTextField
                                        showPassword={showPassword}
                                        label="Mot de passe"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        handleClickShowPassword={handleShowPasswordClick}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12} align="start">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                style={{
                                                    color: theme.palette.primary.main,
                                                    backgroundColor: "transparent",
                                                }}
                                            />
                                        }
                                        color="#4EF4A4"
                                        label="Rester connecté"
                                        onChange={(event) => setStayConnected(event.target.checked)}
                                    />
                                </Grid>
                                {formIsInvalid === true && (
                                    <Grid style={{ color: "red" }} item align="start" xs={12}>
                                        {formErrors.username.length > 0 && (
                                            <Grid item xs={12}>
                                                {formErrors.username}
                                            </Grid>
                                        )}
                                        {formErrors.email.length > 0 && (
                                            <Grid item xs={12}>
                                                {formErrors.username}
                                            </Grid>
                                        )}
                                        {formErrors.password.length > 0 && (
                                            <Grid item xs={12}>
                                                {formErrors.password}
                                            </Grid>
                                        )}
                                        {formErrors.submit.length > 0 && (
                                            <Grid item xs={12}>
                                                {formErrors.submit}
                                            </Grid>
                                        )}
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <CustomMainButton type="submit">
                                        S'inscrire
                                    </CustomMainButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
