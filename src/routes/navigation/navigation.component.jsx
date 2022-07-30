import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <div>Logo</div>
                </Link>
                <Link className="nav-link" to="/shop">
                    <div>Shop</div>
                </Link>
                <h1>This is Navigation</h1>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
