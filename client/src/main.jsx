import ReactDOM from "react-dom/client";
import { UnauthenticatedTemplate, MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from "@azure/msal-browser";
import { App } from "./App";
import Cookies from 'js-cookie';
import { BrowserRouter } from 'react-router-dom';


const url = '/';
const auth_url = `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`;
const msalConfig = {
    auth: {
        clientId: `${import.meta.env.VITE_CLIENT_ID}`,
        authority: auth_url,
        redirectUri: url,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    },
    system: {
        allowRedirectInIframe: true,
    }
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();


const root = ReactDOM.createRoot(document.getElementById("app"));

msalInstance.handleRedirectPromise().then(async (response) => {
    if (!response && msalInstance.getAllAccounts().length === 0) {
        msalInstance.loginPopup()
            .then(async (response) => {
                msalInstance.setActiveAccount(response.account);
                renderApp();
            })
            .catch((e) => {
                console.error(e);
            });
    } else if (response) {
        msalInstance.setActiveAccount(response.account);
        renderApp();
    }
}).catch((e) => {
    console.error(e);
});




const renderApp = () => {
    const accounts = msalInstance.getAllAccounts();
    const isAuthenticated = accounts.length > 0
    const username = isAuthenticated ? accounts[0].username.split('@')[0] : null;
    localStorage.setItem('username', username);
    Cookies.set('username', username, { expires: 200 });
    console.log("Username ", username)

    root.render(
        <MsalProvider instance={msalInstance}>
            {isAuthenticated ? (
                <BrowserRouter>
                    <App username={username} account={accounts} />
                </BrowserRouter>
            ) : (
                <UnauthenticatedTemplate>
                    <div>
                        <p>
                            <span>Hey look stranger, please login!</span>
                        </p>
                    </div>
                </UnauthenticatedTemplate>
            )}
        </MsalProvider>

        
    );
};


renderApp();