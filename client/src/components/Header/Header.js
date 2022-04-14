import {NavLink} from 'react-router-dom';

import {Auth} from '../../components';

const Header = () => {

    return (
        <div>
            <div className={'d-flex bg-black justify-content-center align-items-center fixed-top fs-5 text-light'}>
                <NavLink to='/cars' className={'text-decoration-none text-light me-4'}>Cars</NavLink>
                <NavLink to='/auto_parks' className={'text-decoration-none text-light'}>Auto parks</NavLink>
                <Auth/>
            </div>
        </div>
    );
};

export {Header};