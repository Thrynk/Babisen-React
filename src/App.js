import React, { version } from "react";
import { ProvideAuth } from "./Services/Auth/useAuth";
import { Router } from "./Components/Router";

const { detect } = require("detect-browser");

function App() {
    const browser = detect();

    const checkCompatibility = (browser) => {
        const name = browser.name;
        const versionString = browser.version;
        let isSupported = true;

        const version = parseInt(versionString.split(".")[0]);

        switch (name) {
            case "edge":
                if (version < 13) {
                    isSupported = false;
                }
                break;
            case "ie":
                if (version < 11) {
                    isSupported = false;
                }
                break;
            case "safari":
                if (version < 9) {
                    isSupported = false;
                }
                break;
            default:
                break;
        }

        return isSupported;
    };

    return checkCompatibility(browser) ? (
        <ProvideAuth>
            <Router />
        </ProvideAuth>
    ) : (
        <h1 align="center">Votre navigateur n'est pas compatible avec l'application !</h1>
    );
}

export default App;
