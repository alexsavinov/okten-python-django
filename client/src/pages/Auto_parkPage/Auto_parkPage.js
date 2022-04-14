import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';

import css from './Auto_parkPage.module.css';

import {Auto_park, FormAuto_park, Paginator} from '../../components';
import {auto_parkService} from '../../services';

const Auto_parkPage = () => {
    const [formError, setFormError] = useState(null);
    const [auto_park, setAuto_park] = useState([]);
    const [paginator, setPaginator] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        auto_parkService.getAll(currentPage).then(value => {
            setAuto_park([...value.data]);
            setPaginator(value);
        })
    }, [currentPage]);

    const createAutopark = (data) => {
        auto_parkService.create(data)
            .then(value => setAuto_park([...auto_park, value]))
            .catch(error => {
                setFormError(error.response.data)
            });
    }

    const deleteAutopark = (id) => {
        auto_parkService.deleteById(id).then(value => value)
        setAuto_park([...auto_park.filter(item => item.id !== id)]);
    }

    return (
        <div className={css.wrap}>
            <div className={css.left}>
                <h3>Auto park</h3>
                <ul>
                    <li>
                        <span
                            className={css.task}>{'POST localhost:8000/auto_parks/add/<id> добавить один автопарк'}</span>
                        <FormAuto_park createAutopark={createAutopark} errors={formError}/>
                    </li>

                    <li>
                            <span
                                className={css.task}>{'GET localhost:8000/auto_parks/<id> достать один автопарк'}</span>
                        <div className={css.resolve}>{'По кнопке [ Details ]'}</div>
                    </li>

                    <li>
                        <span className={css.task}>{'DELETE localhost:8000/auto_parks/<id> удалить автопарк'}</span>
                        <div className={css.resolve}>{'По кнопке [ Delete ]'}</div>
                    </li>
                </ul>
                {auto_park.map(auto_park => <Auto_park
                    key={auto_park.id}
                    auto_park={{...auto_park}}
                    deleteAutopark={deleteAutopark}
                />)}
                <Paginator param={{...paginator, data: null}} setCurrentPage={setCurrentPage}/>
            </div>
            <div className={css.right}>
                <Outlet/>
            </div>
        </div>
    );
};

export {Auto_parkPage};
