import ReactDOM from "react-dom/client";
// import "./index.css";
// import reportWebVitals from "./reportWebVitals";
import { UnauthenticatedTemplate, MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from "@azure/msal-browser";
import { App } from "./App";
import Cookies from 'js-cookie';

import { BrowserRouter } from 'react-router-dom';

// import DataProvider from "./context/DataProvider.js";
// import { API } from "./service/api.js"; // Import the API function

const url = '/';
const auth_url = 'https://login.microsoftonline.com/0753c1a4-2be6-4a86-8763-32ae847e1186';
const msalConfig = {
    auth: {
        clientId: '32af363c-e605-4486-8ec3-4db9ab5e2d85',
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

// PublicClientApplication manages the authentication flow
// in-built object of Microsoft
const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();


const root = ReactDOM.createRoot(document.getElementById("app"));

// to handle the redirect flow
msalInstance.handleRedirectPromise().then(async (response) => {
    if (!response && msalInstance.getAllAccounts().length === 0) {
        // user is new, redirect it to login
        msalInstance.loginPopup()
            .then(async (response) => {
                msalInstance.setActiveAccount(response.account);
                // await handleUserDetails(response.account.username);
                renderApp();
            })
            .catch((e) => {
                console.error(e);
            });
    } else if (response) {
        // old user so render the app without login
        msalInstance.setActiveAccount(response.account);
        // await handleUserDetails(response.account.username);
        renderApp();
    }
}).catch((e) => {
    console.error(e);
});

// const handleUserDetails = async (username) => {

//   localStorage.setItem('username', username.split('@')[0]); // Set the username
// //   const email= localStorage.getItem('username');
//   // Fetch user ID based on email
// //   const result = await API.getUserIdByEmail(email);
// //   console.log(result) // Updated function call
//   const token = msalInstance.getAllAccounts()[0]?.idToken; // Example: Use the token from MSAL

//   if (token) {
//     localStorage.setItem('token', token);
//   }

//   if (result.isSuccess) {
//     localStorage.setItem('userId', result.data.userId); // Store the user ID
//   } else {
//     console.error(result.error); // Handle error if user ID fetch fails
//   }
// };


const renderApp = () => {
    const accounts = msalInstance.getAllAccounts();
    const isAuthenticated = accounts.length > 0
    //   const isAuthenticated = accounts.length > 0;
    const username = isAuthenticated ? accounts[0].username.split('@')[0] : null;
    // if user is authenticated redirect it to the app
    // else show Un-authenticated Template for login
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