import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './StyledReset';
import { AnimatePresence, motion, useMotionValue, useTransform, useViewportScroll } from 'framer-motion';

const Container = styled.div``;

const Wrapper = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
`;

const SlideWrapper = styled(Wrapper)`
    position: relative;
    overflow: hidden;
    min-height: 400px;
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

const SlideBox = styled(Box)`
    position: absolute;
    top: 100px;
`;

const Circle = styled(motion.div)`
    background-color: white;
    height: 70px;
    width: 70px;
    place-self: center;
    border-radius: 35px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Svg = styled.svg`
    width: 300px;
    height: 300px;
    path {
        stroke: white;
        stroke-width: 2;
    }
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

const ani5 = {
    start: { pathLength: 0, fill: 'rgba(255, 255, 255, 0)' },
    end: {
        fill: 'rgba(255, 255, 255, 1)',
        pathLength: 1,
        transition: {
            default: { duration: 3 },
            fill: { duration: 1.5, delay: 1.5 },
        },
    },
};

const aniShowing = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotateZ: 360,
        transition: {
            duration: 0.5,
        },
    },
    leaving: {
        opacity: 0,
        scale: 0,
        y: 50,
        transition: {
            duration: 0.5,
        },
    },
};

const aniSlideNext = {
    invisible: (isBack: boolean) => ({
        x: isBack ? -300 : 300,
        opacity: 0,
    }),
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: (isBack: boolean) => ({ x: isBack ? 300 : -300, opacity: 0, transition: { duration: 0.5 } }),
};

function App() {
    const [showing, setShowing] = useState(false);
    const [back, setBack] = useState(false);
    const [showSlideIdx, setShowSlideIdx] = useState(1);
    const toggleShowing = () => setShowing((prev) => !prev);
    const clickNextBtn = () => {
        setBack(false);
        setShowSlideIdx((prev) => (prev === 10 ? 10 : prev + 1));
    };
    const clickPrevBtn = () => {
        setBack(true);
        setShowSlideIdx((prev) => (prev === 1 ? 1 : prev - 1));
    };
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
                <Wrapper>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <motion.path
                            variants={ani5}
                            initial="start"
                            animate="end"
                            d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
                        ></motion.path>
                    </Svg>
                </Wrapper>
                {/* AnimatePresence 태그는 항상 보여야하고 안에 if문이 있어야 한다. */}
                <Wrapper>
                    <AnimatePresence>{showing ? <Box key="popup" variants={aniShowing} initial="initial" animate="visible" exit="leaving" /> : null}</AnimatePresence>
                </Wrapper>
                <button onClick={toggleShowing}>toggleShowing</button>
                <SlideWrapper>
                    {/* mode="wait" 초기 animation이 완전하게 실행 된 후에 다음 animation이 실행 됨 */}
                    <AnimatePresence custom={back}>
                        <SlideBox key={showSlideIdx} custom={back} variants={aniSlideNext} initial="invisible" animate="visible" exit="exit">
                            {showSlideIdx}
                        </SlideBox>
                    </AnimatePresence>
                </SlideWrapper>
                <button type="button" onClick={clickNextBtn}>
                    Next
                </button>
                <button type="button" onClick={clickPrevBtn}>
                    Prev
                </button>
            </Container>
        </>
    );
}

export default App;
