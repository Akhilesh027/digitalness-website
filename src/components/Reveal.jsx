import { motion } from 'framer-motion';
export default function Reveal({children, className='', delay=0, as='div'}) {
  const Component = motion[as] || motion.div;
  return <Component className={className} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.55,delay,ease:[.2,.75,.25,1]}}>{children}</Component>;
}
