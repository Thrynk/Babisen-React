import React, {
    useReducer,
    useEffect,
    useContext,
    createContext,
} from "react";
import {reducer} from "./reducer";
import socketIO from 'socket.io-client';
const AuthContext = createContext();

export function ProvideAuth({children}) {

    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};


function useProvideAuth() {
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });


    const socketConnection =  (body)=>{
        let socket = socketIO(process.env.REACT_APP_API_URL+"user",{
            query:{
                _userId : body.user._id
            }
        });
        return socket;
    };

    // Request to the api to sign in and store user
    const signIn = async (submitBody) => {
        let subscription = JSON.parse(localStorage.getItem('subscription'));
        return await fetch(process.env.REACT_APP_API_URL + "api/v1/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(Object.assign({subscription}, submitBody)),
        })
            .then((response) => {
                if (response.ok) {

                    return response.json();
                } else {

                    throw new Error('Error in login');
                }
            })
            .then((body) => {
                let socket = socketConnection(body)
                dispatch({
                    type: "LOGIN",
                    payload: Object.assign({socket},body),
                });
                return "ok";
            })
            .catch(function (error) {
                return error;
            });
    };

    const signOut = async () => {

        return await fetch(
            process.env.REACT_APP_API_URL + 'api/v1/user/logout',
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: "include",
            }
        )
            .then((response) => {
                if (response.ok) {
                    state.socket.disconnect()
                    dispatch({
                        type: "NOT CONNECTED",
                    });
                    return response.json();

                } else {
                    throw new Error("Deconnection failed");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Request to the api to verify the current user based on the credentials cookies - allow refresh
    const handleAuthentication = async () => {
        await fetch(process.env.REACT_APP_API_URL + "api/v1/user/refresh_token", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {

                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Not connected');
                }
            })
            .then((body) => {
                let socket = socketConnection(body);
                dispatch({
                    type: "LOGIN",
                    payload: Object.assign({socket},body),
                });
                if(body.token_expiry){
                    setTimeout(()=>{
                        socket.disconnect();
                        handleAuthentication();
                    }, body.token_expiry * 1000);
                }

            })
            .catch(function (error) {

                console.log(error);

                dispatch({
                    type: "NOT CONNECTED",
                });
            });
    };

    const refreshState = async () => {
        await fetch(process.env.REACT_APP_API_URL + "api/v1/user/refresh_token", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Not connected');
                }
            })
            .then((body) => {
                dispatch({
                    type: "REFRESH",
                    payload: body,
                });

            })
            .catch(function (error) {

                console.log(error);

                dispatch({
                    type: "NOT CONNECTED",
                });
            });


    };


    useEffect(() => {
        handleAuthentication();
    },[]);

    return {
        state,
        signIn,
        signOut,
        refreshState,
    };
}

// Get a stored cookie based on his name, else returns null
const getCookie = (name) => {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
