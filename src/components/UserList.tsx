import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'reactstrap';
import userService from '../services/user.service';
import { Link, useNavigate } from "react-router-dom";
import './user.css';

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
}
export const UserList: React.FC = () => {
    let navigate = useNavigate();
    const [users, getUsers] = useState<User[]>([]);

    useEffect(() => {
        userService.getAllUsers().then(res => getUsers(res));
    }, [])

    const editUser = (id: any) => {
        console.log('🚀 ~ file: UserList.tsx ~ line 23 ~ editUser ~ id', id);
        // navigate(`/user/edit/:${id}`);
    }

    console.log(users);

    return (
        <div className='row'>

            <div className='pull-right create-btn'>
                <Link to={"/user/create"} ><Button color='success' outline >Create User</Button></Link> &nbsp;&nbsp;
            </div>
            <Table
                borderless
                responsive
            >
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            First Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Mobile Number
                        </th>
                        <th>
                            Actiions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 && users.map((row, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>{row.email}</td>
                                <td>{row.mobileNumber}</td>
                                <td>
                                    <Link to={"/user/edit/" + row.id} ><Button color='success' outline >Edit</Button></Link> &nbsp;&nbsp;
                                    <Button color='danger' outline >Delete</Button> &nbsp;&nbsp;
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
