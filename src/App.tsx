import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './StyledReset';
import { motion, useMotionValue, useTransform, useViewportScroll } from 'framer-motion';

const Container = styled.div``;

const Wrapper = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
`;

const BiggerBox = styled.div`
    width: 600px;
    height: 600px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const ScrollBox = styled(Wrapper)`
    height: 200vh;
`;

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Box2 = styled(Box)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
    background-color: white;
    height: 70px;
    width: 70px;
    place-self: center;
    border-radius: 35px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const ani1 = {
    start: { scale: 0 },
    end: { scale: 1, rotateZ: 360, transition: { type: 'spring', delay: 0.5 } },
};

const ani2 = {
    start: {
        opacity: 0,
        scale: 0.5,
    },
    end: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            delay: 0.5,
            duration: 0.5,
            bounce: 0.5,
            delayChildren: 0.5,
            staggerChildren: 0.2,
        },
    },
};

const ani2Child = {
    start: {
        opacity: 0,
        y: 20,
    },
    end: {
        opacity: 1,
        y: 0,
    },
};

const ani3 = {
    hover: { scale: 1.5, rotateZ: 90 },
    click: { scale: 1, borderRadius: '100px' },
    drag: { backgroundColor: 'rgb(0, 0, 0)' },
};

function App() {
    const biggerBoxRef = useRef<HTMLDivElement>(null);
    const dragWrap = useRef<HTMLDivElement>(null);
    const dragBox = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const rotateZ = useTransform(x, [-400, 400], [-360, 360]);
    const gradient = useTransform(x, [-800, 800], ['linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))', 'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))']);
    const { scrollY, scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
    useEffect(() => {
        console.log(dragWrap.current);
        console.log(dragWrap.current?.offsetLeft);
    }, []);

    return (
        <>
            <GlobalStyle />
            <Container>
                <Wrapper>
                    <Box variants={ani1} initial="start" animate="end" />
                </Wrapper>
                <Wrapper>
                    <Box2 variants={ani2} initial="start" animate="end">
                        {/* 부모에게서 상속 되기 때문에 자식에게  initial, animate 를 또 붙일 필요는 없다*/}
                        <Circle variants={ani2Child} />
                        <Circle variants={ani2Child} />
                        <Circle variants={ani2Child} />
                        <Circle variants={ani2Child} />
                    </Box2>
                </Wrapper>
                <Wrapper>
                    <BiggerBox ref={biggerBoxRef}>
                        <Box variants={ani3} drag dragConstraints={biggerBoxRef} whileHover="hover" whileTap="click" whileDrag="drag" />
                    </BiggerBox>
                </Wrapper>
                <ScrollBox ref={dragWrap} style={{ background: gradient }}>
                    <Box ref={dragBox} style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />
                </ScrollBox>
            </Container>
        </>
    );
}

export default App;
