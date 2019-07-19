import React from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Pictures from './components/Pictures';

import { API_KEY } from './secrets.json';

export default class App extends React.Component {
    state = {
        rover: null,
        time: null,
        camera: null,
        photos: null,
        error: null
    };

    getMarsRoverData = async e => {
        e.preventDefault();
        const rover = e.target.elements.rover_select.value;
        const time = e.target.elements.martian_sol.value;
        const camera = e.target.elements.camera_select.value;
        const api_call = await fetch(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${time}&camera=${camera}&api_key=${API_KEY}`
        );
        const data = await api_call.json();
        
        this.setState({
            rover: rover,
            time: time,
            camera: camera,
            photos: data
        });
    };

    render() {
        return (
            <React.Fragment>
                <Title />
                <Form getMarsRoverData={this.getMarsRoverData} />
                <Pictures
                    rover={this.state.rover}
                    time={this.state.time}
                    camera={this.state.camera}
                    photos={this.state.photos}
                    error={this.state.error}
                />
            </React.Fragment>
        );
    }
}