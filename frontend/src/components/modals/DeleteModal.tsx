import Btn from '@components/Btn';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface DeleteModalProps {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	title?: string;
	children: React.ReactNode;
}

const DeleteModal = ({
	isOpen,
	setOpen,
	title,
	children,
}: DeleteModalProps) => {
	return (
		<Modal
			overlayClassName="flex justify-center items-center fixed bottom-0 top-0 bg-black/20 z-40 w-screen h-screen"
			className="text-lg w-60 sm:w-96 sm:text-xl flex flex-col justify-between text-slate-900 opacity-100 bg-white rounded-xl z-50 px-4 py-4 focus-visible:outline-0"
			isOpen={isOpen}>
			<p className="text-center mb-5">{title ? title : 'Are You Sure?'}</p>
			<div className="flex items-center justify-around sm:pt-6">
				<div>
					<Btn
						styling="bg-transparent hover:bg-transparent"
						onClick={() => setOpen(false)}>
						cancel
					</Btn>
				</div>
				{children}
			</div>
		</Modal>
	);
};

export default DeleteModal;
