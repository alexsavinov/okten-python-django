import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';

import {auto_parkService} from '../../services';

const Auto_parkDetailsPage = () => {
    const {state: auto_park_param} = useLocation();

    const [auto_park, setAuto_park] = useState(null);

    useEffect(() => {
        auto_parkService.getById(auto_park_param?.id).then(value => setAuto_park(value))
    }, [auto_park_param]);

    return (
        <div>
            <h3>auto_park details</h3>
            <div>id: {auto_park?.id}</div>
            <div>name: {auto_park?.name}</div>
        </div>
    );
};

export {Auto_parkDetailsPage};
