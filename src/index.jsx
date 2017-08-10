import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import '../public/sass/main.scss';

const exmpl = [
    {
        sizes: ['xl', 'l', 'm', 's'],
        colors: ['red', 'white'],
        description: '',
        name: 't-shirt',
        price: 5,
        imageURL: '',
        type: 'men',

    },
    {

    },
    {

    },
    {

    },
    {

    }
];

ReactDOM.render(<App />, document.querySelector('#root'));
