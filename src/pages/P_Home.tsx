import React from 'react';
import { s, reuse } from './incoming';

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
