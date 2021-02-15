import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, 
    *:before,
    *:after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Arial;
        background-color: #f2f2f2
    }
`;

export default GlobalStyle;
