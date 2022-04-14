import {useForm} from 'react-hook-form';

import css from './FormCar.module.css';

const FormCar = ({createCar, errors, autoParkId}) => {
    const {register, handleSubmit} = useForm();

    return (
        <div>
            <form className={css.item} onSubmit={handleSubmit(createCar)}>
                <div className={css.input_wrapper}>
                    <div>
                        <span>[ cars ]</span>
                        <label className={css.input}>
                            Brand: <input type='text' defaultValue={''} {...register('brand')}/>
                        </label>
                        {errors && errors.brand && <div>{errors.brand[0]}</div>}

                        <label className={css.input}>
                            Price: <input type='number' defaultValue={''} {...register('price')}/>
                        </label>
                        {errors && errors.price && <div>{errors.price[0]}</div>}

                        <label className={css.input}>
                            Year: <input type='number' defaultValue={''} {...register('year')}/>
                        </label>
                        {errors && errors.year && <div>{errors.year[0]}</div>}
                    </div>

                    <button className={css.button}>Save</button>
                </div>
            </form>
        </div>
    );
};

export {FormCar};