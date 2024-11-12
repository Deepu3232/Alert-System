import { render } from 'preact';
import { BrowserRouter } from 'react-router-dom'; // Ensure you're using Preact-compatible router
import { UnauthenticatedTemplate } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import {App} from './App.jsx'; // Your main application component
import Cookies from 'js-cookie';


const msalConfig = {
    auth: {
        clientId: "217fbcf8-e61c-4716-a831-90c69882aa10",
        authority: "https://login.microsoftonline.com/0753c1a4-2be6-4a86-8763-32ae847e1186",
        redirectUri: "/",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    },
    system: {
        allowRedirectInIframe: true,
    }
};

console.log("msalConfig " , msalConfig)
const msalInstance = new PublicClientApplication(msalConfig);

(async () => {
    await msalInstance.initialize();

    try {
        const response = await msalInstance.handleRedirectPromise();

        // Check for user authentication
        const accounts = msalInstance.getAllAccounts();
        console.log(accounts)
        const isAuthenticated = accounts.length > 0;
        const username = isAuthenticated ? accounts[0].username.split('@')[0] : null;
        localStorage.setItem('username', username);
        Cookies.set('username', username , { expires: 200 });
        console.log("Username " , username)
        const renderApp = () => {
            render(
                <BrowserRouter>
                    {isAuthenticated ? (
                        <App username={username} account={accounts} />
                    ) : (
                        <UnauthenticatedTemplate>
                            <div>
                                <p>
                                    <span>You are not logged In !</span>
                                </p>
                            </div>
                        </UnauthenticatedTemplate>
                    )}
                </BrowserRouter>,
                document.getElementById('app')
            );
        };

        renderApp();

    } catch (error) {
        console.error(error);
    }
})();
