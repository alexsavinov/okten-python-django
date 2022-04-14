import {Link} from 'react-router-dom';

import css from './Auto_park.module.css';

const Auto_park = ({auto_park, deleteAutopark}) => {

    const {id, name} = auto_park;

    const deleteAutoparkAction = () => {
        deleteAutopark(id);
    }

    return (
        <div className={css.item}>
            <div>
                [{id}] {name}
            </div>
            <div>
                <div>
                    <button onClick={deleteAutoparkAction}>Delete</button>
                    <Link to={id.toString()} state={{...auto_park}}>
                        <button className={css.button}>Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export {Auto_park};
