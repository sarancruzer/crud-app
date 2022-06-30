import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import userService from '../services/user.service';
import { useNavigate, useParams } from "react-router-dom";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
    ErrorMessage,
} from 'formik';
import { Button, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
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
    console.log('🚀 ~ file: UserEdit.tsx ~ line 28 ~ params', params);

    const [formValue, setFormValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: ""
    });

    useEffect(() => {
        const id = params['id'];
        userService.getUserById(id).then((res: User) => {
            console.log('🚀 ~ file: UserEdit.tsx ~ line 41 ~ userService.getUserById ~ res', res);
            setFormValue((prevState) => {
                console.log('🚀 ~ file: UserEdit.tsx ~ line 38 ~ setFormValue ~ prevState', prevState);
                return {
                    ...prevState,
                    res,
                };
            });
        });
    }, [])


    const initialValues: MyFormValues = { firstName: '', lastName: '', email: '', mobileNumber: '' };



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

    const userSubmit = (fields: any) => {
        console.log('🚀 ~ file: UserCreate.tsx ~ line 46 ~ authenticate ~ fields', fields);
        userService.createUser(fields).then((res: any) => {
            console.log('🚀 ~ file: UserCreate.tsx ~ line 50 ~ userService.createUser ~ res', res);
            navigate('/');
        }, (error: any) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log('🚀 ~ file: UserCreate.tsx ~ line 53 ~ userService.createUser ~ resMessage', resMessage);
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
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(fields: any) => { userSubmit(fields) }}
                    render={({ errors, status, touched, setFieldValue, setFieldTouched }) => (

                        <Form>
                            <FormGroup>
                                <Label for="firstName">
                                    First name
                                </Label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} onChange={(e: any) => handleChange(e, setFieldValue)} placeholder="Enter firstmame" />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="lastName">
                                    Lastname
                                </Label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} placeholder="Enter lastName" />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">
                                    Email
                                </Label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} placeholder="Enter email" />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="mobileNumber">
                                    Mobile Number
                                </Label>
                                <Field name="mobileNumber" type="text" className={'form-control' + (errors.mobileNumber && touched.mobileNumber ? ' is-invalid' : '')} placeholder="Enter Mobile number" />
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
