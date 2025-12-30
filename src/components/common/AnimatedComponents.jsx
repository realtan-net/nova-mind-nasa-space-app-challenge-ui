import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Fade in from bottom animation
export const FadeInUp = ({ children, delay = 0, duration = 0.5 }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
};

// Scale up animation
export const ScaleIn = ({ children, delay = 0, duration = 0.4 }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
};

// Stagger children animation container
export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
};

// Stagger child item
export const StaggerItem = ({ children }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
        >
            {children}
        </motion.div>
    );
};

// Card hover animation wrapper
export const AnimatedCard = ({ children, delay = 0 }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            {children}
        </motion.div>
    );
};

// Page transition wrapper
export const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

// Pulse animation for stat cards
export const PulseAnimation = ({ children }) => {
    return (
        <motion.div
            animate={{
                scale: [1, 1.02, 1],
                opacity: [1, 0.9, 1],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    );
};
