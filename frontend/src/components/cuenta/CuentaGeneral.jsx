// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// eslint-disable-next-line no-unused-vars
const CuentaGeneral = ({ icon: Icon, title, children }) => {
	return (
		<motion.div
			className='bg-superficie backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-superficie-borde mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='flex items-center mb-5'>
				<Icon className='text-texto mr-4 mb-5' size='24' />
				<h2 className='text-xl font-semibold text-texto mb-5'>{title}</h2>
			</div>
			{children}
		</motion.div>
	);
};
export default CuentaGeneral;
