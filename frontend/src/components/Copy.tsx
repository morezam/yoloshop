import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { useState } from 'react';
import SelfCloseModal from './modals/SelfCloseModal';

interface CopyProps {
	text: string;
	children: React.ReactNode;
	styling?: string;
}

const Copy = ({ text, styling, children }: CopyProps) => {
	const [isOpen, setOpen] = useState(false);
	const [copiedText, copy] = useCopyToClipboard();

	return (
		<div
			className={`cursor-pointer ${styling}`}
			onClick={() => {
				setOpen(true);
				copy(text);
			}}>
			<SelfCloseModal
				title="Text Copied to Clipboard"
				isOpen={isOpen}
				setOpen={setOpen}
			/>
			{children}
		</div>
	);
};

export default Copy;
