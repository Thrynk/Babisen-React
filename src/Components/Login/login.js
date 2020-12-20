import React, { useState } from "react";
import { useStyle } from "./style.js";
import {
    Avatar,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    useTheme
} from "@material-ui/core";
import { CustomTextField } from "../../MaterialUiComponents/CustomTextField";
import { CustomPasswordTextField } from "../../MaterialUiComponents/CustomPasswordTextField";
import { CustomMainButton } from "../../MaterialUiComponents/CustomMainButton";
import { useAuth } from "../../Services/Auth/useAuth";
import Spinner from '../Spinner/spinner';

import { useHistory } from "react-router-dom";


export function Login() {
    const [username, setUsername] = useState("");
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

    const auth = useAuth();
    const history = useHistory();
    let theme = useTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            setFormIsInvalid(false);
            let submitBody = {
                username: username,
                password: password,
                stayConnected: stayConnected
            };
            setLoading(true);
            await auth
                .signIn(submitBody)
                .then((response) => {
                    setLoading(false);
                    if (response === "ok") {
                        history.push("/");
                    } else {
                        setFormIsInvalid(true);
                        setFormErrors({
                            username: "",
                            password: "",
                            submit:
                                "Les informations que vous avez fournies sont incorrectes.",
                        });
                    }
                })
                .catch((err) => {
                    setLoading(false);
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
            ? (errors.username = "Un nom d'utilisateur est requis pour se connecter !")
            : username.length < 5
            ? (errors.username = "Le nom d'utilisateur doit contenir au moins 5 caractères !")
            : (errors.username = "");
        password === ""
            ? (errors.password = "Un mot de passe est requis pour se connecter !")
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
                        <Avatar alt="Logo" src="/logo.jpeg" className={classes.avatar} />
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
                                        Se connecter
                                    </CustomMainButton>
                                </Grid>

                                <Grid item xs={12}>
                                    <Link href="/register">Pas encore de compte, inscrivez-vous</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
