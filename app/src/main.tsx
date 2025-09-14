import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";
import { I18nextProvider } from "react-i18next";
import i18n from './i18n';

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <AuthContextProvider>
            <SocketContextProvider>
                <I18nextProvider i18n={i18n}>
                    <App />
                </I18nextProvider>
            </SocketContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')  // Ensure this path is correct
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
