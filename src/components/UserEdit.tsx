import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import userService from '../services/user.service';
import { useNavigate, useParams } from "react-router-dom";
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from 'formik';
import { Button, Col, Container, FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';
import { User } from './UserList';

interface MyFormValues {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
}

export const UserEdit: React.FC = () => {
    let navigate = useNavigate();
    const params = useParams()
    const [formValue, setFormValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: ""
    });

    let initialValues: MyFormValues = { firstName: '', lastName: '', email: '', mobileNumber: '' };

    useEffect(() => {
        userService.getUserById(params['id']).then((res: User) => {
            setFormValue((prevState: any) => {
                return {
                    ...prevState,
                    ...res
                }
            });
        });

    }, [initialValues])

    const handleChange = (event: any, setFieldValue: any) => {
        const { name, value } = event.target;
        setFieldValue(event.target.name, event.target.value);
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const userUpdate = (fields: any) => {
        userService.updateUser(params['id'], fields).then((res: any) => {
            navigate('/');
        }, (error: any) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        });
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        firstName: Yup.string().required('Firstname is required'),
        lastName: Yup.string().required('Lastname is required'),
        mobileNumber: Yup.string().required('Mobile number is required'),
    });

    return (
        <Container className="bg-light border mt-5">
            <Col md={10}>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(fields: any) => { userUpdate(fields) }}
                    render={({ errors, status, touched, setFieldValue, setFieldTouched }) => (

                        <Form>
                            <FormGroup>
                                <Label for="firstName">
                                    First name
                                </Label>
                                <Field name="firstName" type="text" value={formValue.firstName} className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} onChange={(e: any) => handleChange(e, setFieldValue)} placeholder="Enter firstmame" />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="lastName">
                                    Lastname
                                </Label>
                                <Field name="lastName" type="text" value={formValue.lastName} className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} placeholder="Enter lastName" />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">
                                    Email
                                </Label>
                                <Field name="email" type="text" value={formValue.email} className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} placeholder="Enter email" />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="mobileNumber">
                                    Mobile Number
                                </Label>
                                <Field name="mobileNumber" type="text" value={formValue.mobileNumber} className={'form-control' + (errors.mobileNumber && touched.mobileNumber ? ' is-invalid' : '')} placeholder="Enter Mobile number" />
                                <ErrorMessage name="mobileNumber" component="div" className="invalid-feedback" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="submit">
                                </Label>
                                <Button className='float-end submit-btn' color='primary' type='submit'>Submit</Button>
                            </FormGroup>

                        </Form>
                    )} />
            </Col>

        </Container >
    )
}
