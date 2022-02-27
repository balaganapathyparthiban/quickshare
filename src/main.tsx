import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter,
    Routes as Switch,
    Route,
    Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './main.scss'
import routes from './routes/routes';

const App: React.FC = () => {
    return (
        <div className='w-screen h-screen overflow-hidden'>
            <Switch>
                {routes.map((r) => {
                    return <Route key={r.path} path={r.path} element={<r.component />} />;
                })}
                <Route path="*" element={<Navigate to="/" />} />
            </Switch>
            <ToastContainer theme="dark" position="top-center" />
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)