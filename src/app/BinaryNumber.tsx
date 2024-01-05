import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface BinaryNumberProps {
    delay: number
}

const BinaryNumber: React.FC<BinaryNumberProps> = ({ delay }) => {
    const [number, setNumber] = useState(Math.round(Math.random()))
    const [isShown, setIsShown] = useState(false)
    const [color, setColor] = useState<'lightseagreen' | 'white'>('lightseagreen')

    useEffect(() => {
        const showTimer = setTimeout(() => {
            setIsShown(true)
            setColor(Math.random() > 0.5 ? 'lightseagreen' : 'white')
        }, delay)

        const changeTimer = setInterval(
            () => {
                setNumber(prev => (prev === 1 ? 0 : 1))
                setColor(Math.random() > 0.5 ? 'lightseagreen' : 'white')
            },
            Math.random() * 1000 + 1000
        )

        return () => {
            clearTimeout(showTimer)
            clearInterval(changeTimer)
        }
    }, [delay])

    if (!isShown) {
        return null
    }

    return (
        <motion.span
            animate={{ color: color }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
        >
            &nbsp;&nbsp;{number}
        </motion.span>
    )
}

export default BinaryNumber
