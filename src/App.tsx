import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './StyledReset';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
`;

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Box2 = styled(Box)``;

const ani1 = {
    start: { scale: 0 },
    end: { scale: 1, rotateZ: 360, transition: { type: 'spring', delay: 0.5 } },
};

const ani2 = {
    start: { scale: 0 },
    end: { scale: 1, rotateZ: 360, transition: { type: 'spring', delay: 0.5 } },
};

function App() {
    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <Box variants={ani1} initial="start" animate="end" />
            </Wrapper>
            <Wrapper>
                <Box2 variants={ani2} initial="start" animate="end" />
            </Wrapper>
        </>
    );
}

export default App;
