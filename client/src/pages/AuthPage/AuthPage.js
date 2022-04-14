import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import css from './AuthPage.module.css';

import {authService} from '../../services';

const AuthPage = () => {
    let {userId} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.getUserById(userId, localStorage.getItem('access_token'))
            .then(value => setUser([...value][0]))
            .catch(err => setUser(null))
    }, [userId]);

    if (userId && user) {
        return (
            <div className={css.wrap}>
                <div className={css.left}>
                    <h3>User info</h3>
                    <div><span className={'fw-bolder'}>id:</span> {user.id}</div>
                    <div><span className={'fw-bolder'}>Email:</span> {user.email}</div>
                    <div><span className={'fw-bolder'}>Active:</span> {user.is_active === true ? 'Yes' : 'No'}</div>
                    <div><span className={'fw-bolder'}>Staff:</span> {user.is_staff === true ? 'Yes' : 'No'}</div>
                    <div><span className={'fw-bolder'}>Superuser:</span> {user.is_superuser === true ? 'Yes' : 'No'}
                    </div>
                    <div><span className={'fw-bolder'}>Created:</span> {user.created_at?.split('T')[0]}</div>
                    <div><span className={'fw-bolder'}>Last login:</span> {user.last_login?.split('T')[0]}</div>
                    <div><span className={'fw-bolder'}>Updated:</span> {user.updated_at?.split('T')[0]}</div>
                    <div><span className={'fw-bolder'}>Name:</span> {user.profile?.name}</div>
                    <div><span className={'fw-bolder'}>Surname:</span> {user.profile?.surname}</div>
                    <div><span className={'fw-bolder'}>Born:</span> {user.profile?.born}</div>
                    <div><span className={'fw-bolder'}>Phone:</span> {user.profile?.phone}</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={css.wrap}>
                <div className={css.left}>
                    Not logged in!
                </div>
            </div>
        );
    }

};

export {AuthPage};
