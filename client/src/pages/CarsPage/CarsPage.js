import React, {useEffect, useState} from 'react';
import {NavLink, Outlet, useSearchParams} from 'react-router-dom';

import css from './CarsPage.module.css';

import {Car, FormCar, Paginator} from '../../components';
import {carService, auto_parkService} from '../../services';

const CarsPage = () => {
    const [cars, setCars] = useState([]);
    const [auto_park, setAuto_park] = useState([]);
    const [formError, setFormError] = useState(null);
    const [paginator, setPaginator] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const [searchParams] = useSearchParams();
    let autoParkId = searchParams.get('autoParkId');

    useEffect(() => {
        if (!autoParkId) {
            carService.getAll(currentPage).then(value => {
                setCars([...value.data],);
                setPaginator(value);
            })
        } else {
            carService.getByParkId(autoParkId, currentPage).then(value => setCars([...value.data]));
        }
    }, [autoParkId, currentPage]);
    // }, []);

    useEffect(() => {
        auto_parkService.getAll().then(value => {
            setAuto_park([...value.data]);
            setPaginator(value);
        })
    }, [currentPage]);

    const createCar = (data) => {
        if (autoParkId) {
            auto_parkService.createCarByParkId(autoParkId, data)
                .then(value => setCars([...cars, value]))
                .catch(error => {
                        setFormError(error.response.data)
                    }
                );
        } else {
            alert('В начале выполните поиск машин по id автопарка')
        }
    }

    const deleteCar = (id) => {
        if (autoParkId) {
            carService.deleteById(id, autoParkId).then(value => value)
            setCars([...cars.filter(item => item.id !== id)]);
        } else {
            alert('В начале выполните поиск машин по id автопарка')
        }
    }

    return (
        <div className={css.wrap}>
            <div className={css.left}>
                <h3>Cars</h3>
                <ul>
                    <li>
                        <span className={css.task}>
                            {'GET localhost:8000/cars?autoParkId=1 // поиск машин по id автопарка:'}
                        </span>
                        <div className={css.resolve}>
                            {auto_park.map(auto_park =>
                                <div key={auto_park.id}>
                                    <NavLink to={`/cars?autoParkId=${auto_park.id}`} key={auto_park.id}>
                                        autoParkId = {auto_park.id} ({auto_park.name})
                                    </NavLink>
                                </div>)}
                        </div>
                    </li>
                    <li>
                        <span className={css.task}>
                            {'POST localhost:8000/auto_parks/<autopark_id>/cars // добавление машины по id автопарка:'}
                        </span>
                        <FormCar createCar={createCar} errors={formError}/>
                    </li>
                </ul>

                {cars.map(car => <Car
                    key={car.id}
                    car={{...car}}
                    deleteCar={deleteCar}
                    autoParkId={autoParkId}
                />)}

                <Paginator
                    param={{...paginator, data: null}}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            <div className={css.right}>
                <Outlet/>
            </div>
        </div>
    );
};

export {CarsPage};