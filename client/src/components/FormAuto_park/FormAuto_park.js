import {useForm} from 'react-hook-form';

import css from './FormAuto_park.module.css';

const FormAuto_park = ({createAutopark, errors}) => {
    const {register, handleSubmit} = useForm();

    return (
        <div>
            <form className={css.item} onSubmit={handleSubmit(createAutopark)}>
                <div>
                    <span>[ autopark ]</span>
                    <label className={css.input}>
                        Name: <input type='text' defaultValue={''} {...register('name')}/>
                    </label>
                    {errors && errors.name && <div>{errors.name[0]}</div>}
                </div>
                <button className={css.button}>Save</button>
                {/*<button type='submit' className={'btn btn-outline-primary'}>Save</button>*/}
            </form>
        </div>
    );
};

export {FormAuto_park};
