import {useLocation} from 'react-router-dom';

import css from './CarDetails.module.css';

const CarDetailsPage = () => {
    const {state: car} = useLocation();
    const {id, brand, price, year} = car;

    return (
        <div className={css.block}>
            <h3>Car details</h3>
            <div>id: {id}</div>
            <div>brand: {brand}</div>
            <div>price: {price}</div>
            <div>year: {year}</div>
        </div>
    );
};

export {CarDetailsPage};