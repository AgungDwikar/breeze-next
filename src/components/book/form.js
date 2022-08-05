import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '../form/FormControl'
import Input from '../form/Input'
import Button from '../form/Button'
import axios from '@/lib/axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// const initialValues = {
//     name: '',
//     description: '',
//     proce: 0,
// }

const Form = ({ handleAddBook }) => {
    // const [form, setForm] = useState(initialValues)

    // const { name, description, proce } = form //distrack form untuk nantinya di binding

    // const handleChangeInput = e => {
    //     // return console.log(e.target.value)
    //     setForm(prev => ({
    //         ...prev,
    //         [e.target.name]: e.target.value,
    //     }))
    // }

    // const resetForm = () => {
    //     setForm(initialValues)
    // }

    //pembuatan bookschema
    const bookSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'minimal 4 characters!')
            .max(254, 'too long!')
            .required('name is required'),
        description: Yup.string()
            .min(4, 'minimal 4 characters!')
            .max(300, 'too long!')
            .required('description is required'),
        // proce: Yup.number().required('proce is required'),
    })

    // pemakaian formik
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            proce: 0,
        },
        validationSchema: bookSchema,
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values, resetForm)
        },
    })

    const handleSubmit = async (values, resetForm) => {
        try {
            const resp = await axios.post(
                'http://localhost:8000/api/books',
                values,
            )
            handleAddBook({
                book: resp.data.data,
            })

            if (resp.status === 200) {
                alert('success')
            }

            resetForm()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <FormControl label="Name" id="name" onSubmit={() => {}}>
                    <Input
                        placeholder="Input Name"
                        idInput="name"
                        name="name"
                        // onChange={handleChangeInput}
                        // value={name} //binding
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['name']}
                        </label>
                    )}
                </FormControl>
                <FormControl label="Description" id="description">
                    <Input
                        placeholder="Input Description"
                        idInput="description"
                        name="description"
                        // onChange={handleChangeInput}
                        // value={description}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['description']}
                        </label>
                    )}
                </FormControl>
                <FormControl label="Price" id="price">
                    <Input
                        placeholder="Input Price"
                        idInput="proce"
                        type="number"
                        name="proce"
                        // onChange={handleChangeInput}
                        // value={proce}
                        onChange={formik.handleChange}
                        value={formik.values.proce}
                    />
                </FormControl>
                <Button type="submit" disabled={!formik.isValid}>
                    Simpan
                </Button>
            </form>
            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        </>
    )
}

Form.propTypes = {}

export default Form
