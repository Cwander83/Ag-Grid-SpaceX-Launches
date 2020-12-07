import React, { useContext } from 'react';

// context api
import { ModalContext } from '../context/modal.context';

// React Modal npm package
import Modal from 'react-modal';

// components
import RocketDetails from './RocketDetails';
import LaunchPadDetails from './LaunchPadDetails';

// style
const customStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.85)',
	},
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
	let { open, closeModal, id } = useContext(ModalContext);

	return (
		<Modal
			isOpen={open}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="SpaceX Modal"
		>
			
			{id.query === 'rockets' ? <RocketDetails /> : <LaunchPadDetails />}
		</Modal>
	);
};

export default ReactModal;
