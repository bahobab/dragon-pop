import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

import Generation from './Generation';
import DragonNew from './DragonNew';
import {signout} from '../action/account';

class Home extends React.Component {
    render() {
        const {signout} = this.props
        return (
            <div>
                <Button onClick={signout} className="signout-button">Sign out</Button>
                <h2>Dragon Pop</h2>
                <Generation/>
                <DragonNew/>
            </div>
        );
    }
}

export default connect(null, {signout})(Home);