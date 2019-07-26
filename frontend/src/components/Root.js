import React from 'react';

import Home from './Home';
import AuthForm from './AuthForm';

class Root extends React.Component {

    render() {
        return (true
            ? <Home/>
            : <AuthForm/>);

    }
}

export default Root;