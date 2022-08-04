import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '../form/FormControl'
import Input from '../form/Input'
import Button from '../form/Button'
import axios from '@/lib/axios'

const initialValues = {
    name: '',
    description: '',
    proce: 0,
}

const Form = ({ handleAddBook }) => {
    const [form, setForm] = useState(initialValues)

    const { name, description, proce } = form //distrack form untuk nantinya di binding

    const handleChangeInput = e => {
        // return console.log(e.target.value)
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const resetForm = () => {
        setForm(initialValues)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const resp = await axios.post(
                'http://localhost:8000/api/books',
                form,
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
            <form onSubmit={handleSubmit}>
                <FormControl label="Name" id="name" onSubmit={() => {}}>
                    <Input
                        place="Input Name"
                        idInput="name"
                        name="name"
                        onChange={handleChangeInput}
                        value={name} //binding
                    />
                </FormControl>
                <FormControl label="Description" id="description">
                    <Input
                        place="Input Description"
                        idInput="description"
                        name="description"
                        onChange={handleChangeInput}
                        value={description}
                    />
                </FormControl>
                <FormControl label="Price" id="price">
                    <Input
                        place="Input Price"
                        idInput="proce"
                        type="number"
                        name="proce"
                        onChange={handleChangeInput}
                        value={proce}
                    />
                </FormControl>
                <Button type="submit">Simpan</Button>
            </form>
            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        </>
    )
}

Form.propTypes = {}

export default Form
