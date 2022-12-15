import Modal from 'react-modal';
import { useEffect, useRef } from 'react';

Modal.setAppElement('#root');

if (Modal.defaultStyles.overlay) {
	Modal.defaultStyles.overlay.backgroundColor = 'transparent';
}

interface SelfCloseModalProps {
	isOpen: boolean;
	setOpen: (open: boolean) => void;
	title: string;
}

const SelfCloseModal = ({ isOpen, setOpen, title }: SelfCloseModalProps) => {
	useEffect(() => {
		let timer: NodeJS.Timeout;

		timer = setTimeout(() => setOpen(false), 1000);

		return () => clearTimeout(timer);
	}, [isOpen]);

	return (
		<Modal
			className="text-lg text-rose-50 bg-green-500 rounded-xl absolute bottom-3 right-1/2 translate-x-1/2 px-4 py-2 focus-visible:outline-0"
			isOpen={isOpen}>
			<p>{title}</p>
		</Modal>
	);
};

export default SelfCloseModal;
