import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';


const formSchema = yup.object().shape({
    name: yup.string().required('Please enter your name').min(2, 'name must be at least 2 characters'),
    size: yup.string().required('Must pick a size'),
    cheese: yup.boolean(),
    pepperoni: yup.boolean(),
    pineapples: yup.boolean(),
    sausage: yup.boolean(),
    specialIn: yup.string(),
});

const initialVal = {
    name: '',
    size: '',
    cheese: false,
    pepperoni: false,
    pineapples: false,
    sausage: false,
    specialIn: '',
}

const Form = (props) => {
    const [form, setForm] = useState(initialVal);
    const [disabled, setDisabled] = useState(true);
    const [err, setErr] = useState({
        name: '',
        size: '',
        cheese: '',
        pepperoni: '',
        pineapples: '',
        sausage: '',
        specialIn: ''
    })
    
    useEffect(() => {
        formSchema.isValid(form)
        .then((isValid) => {
            setDisabled(!isValid)
        })
        }, [form]
        );

    const valid = e => {
        yup.reach(formSchema, e.target.name)
        .valid(e.target.value)
        .then(v => {setErr({...err, [e.target.name]: ''})
    })
    .catch(error => {
        console.error(error.errors)
        setErr({
            ...err, [e.target.name]: error.errors[0]
        })
    })};

    const onChange = e => {
        
        valid(e)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setForm({...form, [e.target.name]: value});
        
    };

    const onSubmit = e => {
        e.preventDefault();
        // axios.post('https://reqres.in/api/orders', form)
        // .then(res => console.log('helloworld', res))
        // .catch(err => console.error(err));
        setForm(initialVal)
    };

    return (
        <div id='pizzaF'>
        <h1>Build-A-Pizza</h1>
        <form 
        onSubmit={onSubmit}
        id='pizza-form'>
            
            <label htmlFor='name-input'>Name:</label>
                <input
                type='text'
                id='name-input'
                name='name'
                placeholder='John Doe'
                value={initialVal.name}
                onChange={onChange}
                />

                <br/>

            <label htmlFor='size-dropdown'>
                Pizza Size
            </label>
                <select id='size-dropdown' 
                onChange={onChange}
                name='size'>
                    <option value='Choose'>
                        Choose a size
                    </option>
                    <option value='Personal'>
                        Personal Bloomer
                    </option>
                    <option value='Small'>
                        Small Bloomer
                    </option>
                    <option value='Medium'>
                        Medium Bloomer
                    </option>
                    <option value='Large'>
                        Large Bloomer
                    </option>
                    <option value='XXL'>
                        XL Bloomer
                    </option>
                </select>

                 <br/>

            <h2>Toppings</h2>
            
                <input
                type='checkbox'
                id='cheese'
                checked={props.checked}
                value={initialVal.cheese}
                onChange={onChange}
                name='cheese'
                />
            <label htmlFor='cheese'>4 Cheese Blend</label>

                <br/>

                <input
                type='checkbox'
                id='pepperoni'
                checked={props.checked}
                value={initialVal.pepperoni}
                onChange={onChange}
                name='pepperoni'
                />
            <label htmlFor='pepperoni'>Pepperoni</label>
                <br/>

                <input
                type='checkbox'
                id='pineapples'
                checked={props.checked}
                value={initialVal.pineapples}
                onChange={onChange}
                name='pineapples'
                />
            <label htmlFor='pineapples'>Pineapples</label>

                <br/>

                <input
                type='checkbox'
                id='sausage'
                checked={props.checked}
                value={initialVal.sausage}
                onChange={onChange}
                name='sausage'
                />
            <label htmlFor='sausage'>Sausage</label>

                <br/>
                <br/>

            <label htmlFor='special-text'>
                Special Instructions:
            </label>
                <input 
                type='text'
                id='special-text'
                value={initialVal.specialIn}
                onChange={onChange}
                name='specialIn'
                />

            <br/>
            <br/>

        <label htmlFor='order-button'>Add to order</label>
            <input 
            id='order-button'
            type='submit'
            value={onSubmit}
            disabled={disabled}
            onChange={onChange}
            name='submit'
            />

        </form>
        </div>
    )
}

export default Form;