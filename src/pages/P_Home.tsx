import React, { useReducer, useState, useEffect, useContext } from 'react';
import { s, r, t, h, reuse } from './incoming';

interface HomeProps {}

const Home: React.FC<HomeProps> = (p) => {
    return (
        <s.Box>
            <reuse.ent.InputLine />
            <reuse.ent.Save />
        </s.Box>
    );
};

export default Home;
