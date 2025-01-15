
import { motion } from "framer-motion"
import splitStringUsingRegex from "../utils/splitStringUsingRegex";
export const Typewriter = ({inputString , size , color}) => {
    const charArray = splitStringUsingRegex(inputString);

    const charVariants = {
        hidden: { opacity: 0 },
        reveal: { opacity: 1 }
    }

    return (
        <>
            <motion.div
                initial="hidden"
                whileInView="reveal"
                transition={{ staggerChildren: .02 }}
                className={`text-${size} text-${color}`}
                
            >
                {charArray.map((char,index) => (
                    <motion.span
                        key={index}
                        transition={{ duration: 1 }}
                        variants={charVariants}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>
        </>
    )
}