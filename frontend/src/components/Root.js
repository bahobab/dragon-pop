import React from 'react';

import Home from './Home';
import AuthForm from './AuthForm';

class Root extends React.Component {

    render() {
        return (false
            ? <Home/>
            : <AuthForm/>);

    }
}

export default Root;