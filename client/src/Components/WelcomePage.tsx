import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

function WelcomePage() {
  type AnimatedTextProps = {
    text: string | string[];
    el?: keyof JSX.IntrinsicElements;
    className?: string;
    once?: boolean;
    repeatDelay?: number;
    animation?: {
      hidden: Variant;
      visible: Variant;
    };
  };

  const defaultAnimations = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  const AnimatedText = ({
    text,
    el: Wrapper = "p",
    className,
    once,
    repeatDelay,
    animation = defaultAnimations,
  }: AnimatedTextProps) => {
    const controls = useAnimation();
    const textArray = Array.isArray(text) ? text : [text];
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once });

    useEffect(() => {
      let timeout: any;
      const show = () => {
        controls.start("visible");
        if (repeatDelay) {
          timeout = setTimeout(async () => {
            await controls.start("hidden");
            controls.start("visible");
          }, repeatDelay);
        }
      };

      if (isInView) {
        show();
      } else {
        controls.start("hidden");
      }

      return () => clearTimeout(timeout);
    }, [isInView]);

    return (
      <Wrapper className={className}>
        <span className="sr-only">{textArray.join(" ")}</span>
        <motion.span
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { transition: { staggerChildren: 0.075 } },
            hidden: {},
          }}
          aria-hidden
        >
          {textArray.map((line, lineIndex) => (
            <span className="block" key={`${line}-${lineIndex}`}>
              {line.split(" ").map((word, wordIndex) => (
                <span className="inline-block" key={`${word}-${wordIndex}`}>
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${char}-${charIndex}`}
                      className="inline-block"
                      variants={animation}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <span className="inline-block">&nbsp;</span>
                </span>
              ))}
            </span>
          ))}
        </motion.span>
      </Wrapper>
    );
  };

  return (
    <section className="relative w-full h-screen mx-auto">
      <Nav />
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <AnimatedText
            el="h2"
            text={["Smaller budgets need smarter dollars"]}
            className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          />

          <p className="mb-4">
            Sign up, manage, and analyze your current spendings to help keep up
            with your finances.
          </p>
          <p>
            This budgeting app allows for a simple and quick way to remember the
            items you bought throughout your day-to-day life.
          </p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
