import React from 'react';
import { Button } from 'reactstrap';
import { Header } from './Header';
import { UserList } from './UserList';

type props = {
    name: string
}

export const Home: React.FC<props> = () => {
  return (
    <>
    <div className="container">
        <div className='row'>
    <Header />
    <UserList/>
    </div>
    </div>
    </>

    // Userlist compo
    // create btn -> creteuser compo -> formik
    // edit btn -> Edituser compo -> formik

  )
}
