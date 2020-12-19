import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PrivateRoute from './Helpers/PrivateRoute';

import { Login } from '../Login';
import { Register } from '../Register';

import {useAuth} from "../../Services/Auth/useAuth";

export function Router() {

    const auth = useAuth();

    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="*">
                    <Login/>
                </Route>
            </Switch>

        </BrowserRouter>


    )
}

