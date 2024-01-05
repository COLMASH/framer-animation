'use client'

import { motion, useAnimation } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import BinaryNumber from './BinaryNumber'

const cardWidth = 350
const cardHeight = 500
const lineWidth = 5
const bracketSize = 40

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = 0 + i * 0.5
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: 'spring', duration: 0.3, bounce: 0 },
                opacity: { delay, duration: 0.01 }
            }
        }
    }
}

const AnimatedCard: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const lineAnimationControl = useAnimation()

    function handleFlip() {
        if (!isAnimating) {
            setIsFlipped(!isFlipped)
            setIsAnimating(true)
        }
    }

    const drawLines = {
        hidden: { pathLength: 0, opacity: 0, stroke: 'gray' },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1,
                ease: 'easeInOut'
            }
        }
    }

    useEffect(() => {
        const sequence = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000))
            await lineAnimationControl.start('visible')
            await new Promise(resolve => setTimeout(resolve, 100))
            lineAnimationControl.start({ stroke: 'lightseagreen' })
        }

        sequence()
    }, [lineAnimationControl])

    const binaryLevels = [1, 2, 4, 6, 7]
    const numberDelay = 70
    return (
        <div className="flex h-screen w-full flex-col items-center pt-[100px]">
            <div
                className="flip-card h-[600px] w-[370px] cursor-pointer rounded-md"
                onClick={handleFlip}
            >
                <motion.div
                    className="flip-card-inner h-[100%] w-[100%]"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 360 }}
                    transition={{ duration: 0.6, animationDirection: 'normal' }}
                    onAnimationComplete={() => setIsAnimating(false)}
                >
                    <div className="flip-card-front flex h-[100%] w-[100%] flex-col items-center p-4 text-white">
                        {/* Top Bracket */}
                        <motion.div
                            initial={{ x: 0, y: 0 }}
                            animate={{ x: 0, y: 0 }}
                            transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
                            className="absolute"
                        >
                            <motion.svg
                                width={cardWidth}
                                height={bracketSize}
                                viewBox={`0 0 ${cardWidth} ${bracketSize}`}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Left bracket*/}
                                <motion.line
                                    x1={bracketSize - lineWidth / 2}
                                    y1={lineWidth / 2}
                                    x2={0}
                                    y2={lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1}
                                />
                                <motion.line
                                    x1={lineWidth / 2}
                                    y1={lineWidth / 2}
                                    x2={lineWidth / 2}
                                    y2={bracketSize - lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.3}
                                />
                                {/* Right bracket*/}
                                <motion.line
                                    x1={cardWidth}
                                    y1={lineWidth / 2}
                                    x2={cardWidth - bracketSize + lineWidth / 2}
                                    y2={lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.6}
                                />
                                <motion.line
                                    x1={cardWidth - lineWidth / 2}
                                    y1={bracketSize - lineWidth / 2}
                                    x2={cardWidth - lineWidth / 2}
                                    y2={lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.3}
                                />
                            </motion.svg>
                        </motion.div>
                        {/* Bottom Bracket */}
                        <motion.div
                            initial={{ x: 0, y: 0 }}
                            animate={{ x: 0, y: cardHeight + bracketSize / 2 }}
                            transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
                            className="absolute"
                        >
                            <motion.svg
                                width={cardWidth}
                                height={bracketSize}
                                viewBox={`0 0 ${cardWidth} ${bracketSize}`}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Left bracket*/}
                                <motion.line
                                    x1={lineWidth / 2}
                                    y1={bracketSize - lineWidth / 2}
                                    x2={bracketSize - lineWidth / 2}
                                    y2={bracketSize - lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.6}
                                />
                                <motion.line
                                    x1={lineWidth / 2}
                                    y1={lineWidth / 2}
                                    x2={lineWidth / 2}
                                    y2={bracketSize}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.3}
                                />
                                {/* Right bracket*/}
                                <motion.line
                                    x1={cardWidth - bracketSize + lineWidth / 2}
                                    y1={bracketSize - lineWidth / 2}
                                    x2={cardWidth - lineWidth / 2}
                                    y2={bracketSize - lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1}
                                />
                                <motion.line
                                    x1={cardWidth - lineWidth / 2}
                                    y1={bracketSize}
                                    x2={cardWidth - lineWidth / 2}
                                    y2={lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.3}
                                />
                            </motion.svg>
                        </motion.div>
                        <motion.div
                            initial={{ x: 0, y: bracketSize / 2, opacity: 0 }}
                            animate={{ x: 0, y: bracketSize / 2, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0, ease: 'easeInOut' }}
                            className="flex w-[10px] flex-col justify-center pb-[40px] pl-[140px] pt-[50px]"
                            style={{ transform: 'translateY(-50%)' }}
                        >
                            {binaryLevels.map((length, levelIndex) => (
                                <div key={levelIndex} className="flex justify-end">
                                    {Array.from({ length })
                                        .map((_, idx) => (
                                            <BinaryNumber
                                                key={idx}
                                                delay={
                                                    levelIndex * length * numberDelay +
                                                    idx * numberDelay
                                                }
                                            />
                                        ))
                                        .reverse()}
                                </div>
                            ))}
                        </motion.div>
                        <div className="flex h-fit flex-col justify-end pt-[280px] text-white">
                            <motion.div
                                initial={{ x: 0, y: 0 }}
                                animate={{ x: 0, y: 0 }}
                                transition={{ delay: 2, duration: 1, ease: 'easeInOut' }}
                            >
                                <motion.svg
                                    width={cardWidth}
                                    height={bracketSize}
                                    viewBox={`-10 -10 60 70`}
                                    initial="hidden"
                                    animate="visible"
                                    className="h-[50px]"
                                >
                                    <motion.line
                                        x1={10}
                                        y1={20}
                                        x2={0}
                                        y2={40}
                                        strokeLinecap="round"
                                        strokeWidth={7}
                                        variants={drawLines}
                                        custom={4}
                                        initial="hidden"
                                        animate={lineAnimationControl}
                                    />

                                    <motion.line
                                        x1={17}
                                        y1={27}
                                        x2={27}
                                        y2={7}
                                        strokeLinecap="round"
                                        strokeWidth={7}
                                        variants={drawLines}
                                        custom={4}
                                        initial="hidden"
                                        animate={lineAnimationControl}
                                    />

                                    <motion.line
                                        x1={13}
                                        y1={35}
                                        x2={3}
                                        y2={55}
                                        strokeLinecap="round"
                                        strokeWidth={7}
                                        variants={drawLines}
                                        custom={4}
                                        initial="hidden"
                                        animate={lineAnimationControl}
                                    />

                                    <motion.line
                                        x1={21}
                                        y1={40}
                                        x2={31}
                                        y2={20}
                                        strokeLinecap="round"
                                        strokeWidth={7}
                                        variants={drawLines}
                                        custom={4}
                                        initial="hidden"
                                        animate={lineAnimationControl}
                                    />
                                </motion.svg>
                            </motion.div>
                        </div>
                    </div>

                    <div className="flip-card-back flex h-[100%] w-[100%] flex-col items-center p-4 text-white">
                        {/* Top Bracket */}
                        <motion.div
                            initial={{ x: 0, y: 0 }}
                            animate={{ x: 0, y: 0 }}
                            transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
                            className="absolute"
                        >
                            <motion.svg
                                width={cardWidth}
                                height={bracketSize}
                                viewBox={`0 0 ${cardWidth} ${bracketSize}`}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Left bracket*/}
                                <motion.line
                                    x1={bracketSize - lineWidth / 2}
                                    y1={lineWidth / 2}
                                    x2={0}
                                    y2={lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1}
                                />
                                <motion.line
                                    x1={lineWidth / 2}
                                    y1={lineWidth / 2}
                                    x2={lineWidth / 2}
                                    y2={bracketSize - lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.3}
                                />
                                {/* Right bracket*/}
                                <motion.line
                                    x1={cardWidth}
                                    y1={lineWidth / 2}
                                    x2={cardWidth - bracketSize + lineWidth / 2}
                                    y2={lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.6}
                                />
                                <motion.line
                                    x1={cardWidth - lineWidth / 2}
                                    y1={bracketSize - lineWidth / 2}
                                    x2={cardWidth - lineWidth / 2}
                                    y2={lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.3}
                                />
                            </motion.svg>
                        </motion.div>
                        {/* Bottom Bracket */}
                        <motion.div
                            initial={{ x: 0, y: 0 }}
                            animate={{ x: 0, y: cardHeight + bracketSize / 2 }}
                            transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
                            className="absolute"
                        >
                            <motion.svg
                                width={cardWidth}
                                height={bracketSize}
                                viewBox={`0 0 ${cardWidth} ${bracketSize}`}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Left bracket*/}
                                <motion.line
                                    x1={lineWidth / 2}
                                    y1={bracketSize - lineWidth / 2}
                                    x2={bracketSize - lineWidth / 2}
                                    y2={bracketSize - lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.6}
                                />
                                <motion.line
                                    x1={lineWidth / 2}
                                    y1={lineWidth / 2}
                                    x2={lineWidth / 2}
                                    y2={bracketSize}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.3}
                                />
                                {/* Right bracket*/}
                                <motion.line
                                    x1={cardWidth - bracketSize + lineWidth / 2}
                                    y1={bracketSize - lineWidth / 2}
                                    x2={cardWidth - lineWidth / 2}
                                    y2={bracketSize - lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1}
                                />
                                <motion.line
                                    x1={cardWidth - lineWidth / 2}
                                    y1={bracketSize}
                                    x2={cardWidth - lineWidth / 2}
                                    y2={lineWidth / 2}
                                    stroke="white"
                                    strokeWidth={lineWidth}
                                    variants={draw}
                                    custom={1.3}
                                />
                            </motion.svg>
                        </motion.div>
                        <div className="flex flex-col items-center pt-[155px]">
                            <div className="text-4xl font-bold text-white">ANIMUS REC.</div>
                            <div className="text-xs font-bold text-white">&nbsp;</div>
                            <div className="relative inline-flex items-center text-4xl font-bold text-white">
                                #3335&nbsp;&nbsp;&nbsp;&nbsp;
                                <motion.div
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1.1 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'backInOut',
                                        repeat: Infinity,
                                        repeatType: 'reverse'
                                    }}
                                    className="absolute right-[52px] top-2 mx-2 h-[12px] w-[12px] bg-greenRec"
                                />
                                ON
                            </div>
                        </div>

                        <div className="flex h-fit flex-col justify-end pt-[280px] text-white">
                            <motion.div
                                initial={{ x: 0, y: 0 }}
                                animate={{ x: 0, y: 0 }}
                                transition={{ delay: 2, duration: 1, ease: 'easeInOut' }}
                            >
                                <motion.svg
                                    width={cardWidth}
                                    height={bracketSize}
                                    viewBox={`-10 -10 60 70`}
                                    initial="hidden"
                                    animate="visible"
                                    className="h-[50px]"
                                >
                                    <motion.line
                                        x1={10}
                                        y1={20}
                                        x2={0}
                                        y2={40}
                                        strokeLinecap="round"
                                        strokeWidth={7}
                                        variants={drawLines}
                                        custom={4}
                                        initial="hidden"
                                        animate={lineAnimationControl}
                                    />

                                    <motion.line
                                        x1={17}
                                        y1={27}
                                        x2={27}
                                        y2={7}
                                        strokeLinecap="round"
                                        strokeWidth={7}
                                        variants={drawLines}
                                        custom={4}
                                        initial="hidden"
                                        animate={lineAnimationControl}
                                    />

                                    <motion.line
                                        x1={13}
                                        y1={35}
                                        x2={3}
                                        y2={55}
                                        strokeLinecap="round"
                                        strokeWidth={7}
                                        variants={drawLines}
                                        custom={4}
                                        initial="hidden"
                                        animate={lineAnimationControl}
                                    />

                                    <motion.line
                                        x1={21}
                                        y1={40}
                                        x2={31}
                                        y2={20}
                                        strokeLinecap="round"
                                        strokeWidth={7}
                                        variants={drawLines}
                                        custom={4}
                                        initial="hidden"
                                        animate={lineAnimationControl}
                                    />
                                </motion.svg>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AnimatedCard
