import React, { useContext } from 'react';

// context api
import { ModalContext } from '../context/modal.context';

// React Modal npm package
import Modal from 'react-modal';

// style
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

// setting Modal to div#root
Modal.setAppElement('#root');

const ReactModal = () => {
	let { open, closeModal } = useContext(ModalContext);

	return (
		<Modal
			isOpen={open}
			//onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="SpaceX Modal"
		>
			<button onClick={closeModal}>close</button>
			<div>I am a modal</div>
			<form>
				<input />
				<button>tab navigation</button>
				<button>stays</button>
				<button>inside</button>
				<button>the modal</button>
			</form>
		</Modal>
	);
};

export default ReactModal;
