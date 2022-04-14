import {NavLink, useLocation} from 'react-router-dom';

import css from './Car.module.css';

const Car = ({car, deleteCar}) => {
    const {id, brand} = car;

    let location = useLocation();

    const deleteCarAction = () => deleteCar(id);

    return (
        <div className={css.item}>
            <div>
                [{id}] {brand}
            </div>
            <div>
                <button onClick={deleteCarAction}>Delete</button>

                <NavLink
                    to={`details/${id.toString()}${location.search}`}
                    state={{...car}}>
                    <button className={css.button}>
                        Details
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export {Car};
