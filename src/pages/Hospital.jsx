import { HospitalMenu } from 'components/MenuBar';
import React, { Component } from 'react';

class Hospital extends Component {
    render() {
        return (
            <div>
                <br></br><br></br><br></br>
                <HospitalMenu></HospitalMenu>
            </div>
        );
    }
}

export default Hospital;