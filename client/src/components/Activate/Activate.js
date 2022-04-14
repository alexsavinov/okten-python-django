import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

import {authService} from '../../services';

const Activate = () => {
    const {activateToken} = useParams();
    const [error, setError] = useState(null);


    useEffect(() => {
        authService.activateUser(activateToken).then((value) => console.log('value', value))
            .catch(error => setError(error.response.data));
    }, [activateToken]);

    return (
        <div className={'mt-5 ms-2'}>
            {error && <h2>{error}</h2>}
            {!error && <h2>User activated!</h2>}
        </div>
    );
};

export {Activate};
