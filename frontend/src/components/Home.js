import React from 'react';

import Generation from './Generation';
import DragonNew from './DragonNew';

class Home extends React.Component {
    render() {

        return (
            <div>
                <h2>Dragon Pop</h2>
                <Generation/>
                <DragonNew/>
            </div>
        );
    }
}

export default Home;