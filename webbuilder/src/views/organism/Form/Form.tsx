import { AnimatePresence, motion } from 'framer-motion';

import { useResponderState } from '@app/store/jotai/responderFormState';

import FormSlide from './FormSlide';
import ThankyouPage from './ThankyouPage';
import WelcomePage from './WelcomePage';

const Form = () => {
    const { currentSlide } = useResponderState();

    return (
        <div className="h-screen w-screen">
            <AnimatePresence custom={currentSlide} mode="wait">
                {currentSlide === -1 && (
                    <motion.div
                        className="relative flex h-full flex-1 flex-col items-center justify-center "
                        key={'welcome-page'}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <WelcomePage />
                    </motion.div>
                )}

                {currentSlide >= 0 && (
                    <motion.div
                        className="relative flex h-full flex-1 flex-col items-center justify-center "
                        key={currentSlide}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FormSlide index={currentSlide} />
                    </motion.div>
                )}

                {currentSlide === -2 && (
                    <motion.div
                        className="relative flex h-full flex-1 flex-col items-center justify-center "
                        key={'thank-you-page'}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ThankyouPage />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Form;
