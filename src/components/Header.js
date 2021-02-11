import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import axios from '../services/axios';

import '../styles/header.css';

import * as actions from '../store/modules/auth/actions';
// import * as userActions from '../store/modules/user/action';
import ModalEditUser from '../components/ModalEditUser';

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    //const [name, setName] = useState('');

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userName = useSelector(state=>state.auth.user.name);
    const userLastname = useSelector(state=>state.auth.user.lastname);
    //console.log('user2 ',userName);

    // useEffect(() => {
        //const getUser = async () => {
            //if (isLoggedIn === true) {
                // const result = await axios.get(`users/email/${email}`);
                // const user = result.data;
                //setName(userName);
                //console.log('name ',name);
                //setLastname(user.lastname);
                //dispatch(userActions.getUser({name, lastname}));
            //}
        //}
        //getUser();
    // }, [isLoggedIn]);

const handleLogout = (event) => {
    event.preventDefault();
    dispatch(actions.loginFailure());
    //dispatch(userActions.logout());
}

const handleModalOpen = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
}

const handleModalClose = () => {
    setIsModalOpen(false);
}

return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#"><i className="bi bi-bag-check-fill">Finances
                    </i></Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home
                                <i className="bi bi-house-fill"></i></Link>
                        </li>

                        {!isLoggedIn ?
                            (<li className="nav-item">
                                <Link className="nav-link" to="/login"> Login<i className="bi bi-door-open">
                                </i></Link>
                            </li>) :
                            (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout" onClick={handleLogout}>
                                        Logout<i className="bi bi-door-closed">
                                        </i></Link>
                                </li>)}

                        {!isLoggedIn &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/signUp">Inscreva-se
                                <i className="bi bi-box-arrow-in-right"></i></Link>
                            </li>}
                        {isLoggedIn &&
                            <li className="nav-item">
                                <Link className="nav-link" to="" onClick={handleModalOpen}>
                                    {`${userName} ${userLastname}`}
                                </Link>
                            </li>}
                    </ul>
                </div>
            </div>
        </nav>

        {isModalOpen && <ModalEditUser onClose={handleModalClose} />}
    </div>
)
}