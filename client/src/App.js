import {Routes, Route, Navigate} from 'react-router-dom';

import {Activate, Layout} from './components';
import {AuthPage, Auto_parkDetailsPage, Auto_parkPage, CarDetailsPage, CarsPage} from './pages';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Navigate to={'cars'}/>}/>

                <Route path={'cars'} element={<CarsPage/>}>
                    <Route path={'details/:id'} element={<CarDetailsPage/>}/>
                    <Route path={'details/:id?autoParkId=:autoParkId'} element={<CarDetailsPage/>}/>
                </Route>

                <Route path={'cars?autoParkId=:autoParkId'} element={<CarsPage/>}/>

                <Route path={'auto_parks'} element={<Auto_parkPage/>}>
                    <Route path={':autoParkId'} element={<Auto_parkDetailsPage/>}/>
                    <Route path={':autoParkId/delete'} element={<Auto_parkDetailsPage/>}/>
                    <Route path={':autoParkId/car'} element={<Auto_parkDetailsPage/>}/>
                </Route>

                <Route path={'/auth/:userId'} element={<AuthPage/>}/>

                <Route path={'/activate/:activateToken'} element={<Activate/>}/>
            </Route>
        </Routes>
    );
}

export default App;
