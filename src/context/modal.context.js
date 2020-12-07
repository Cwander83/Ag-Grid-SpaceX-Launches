import React, { useState } from 'react';

// store default value
export const ModalContext = React.createContext();

// Provider
const ModalContextProvider = (props) => {
	const [open, setOpen] = useState(false);
	const [id, setId] = useState({});

	const openModal = () => setOpen(!open);

	const closeModal = () => setOpen(false);

	return (
		<ModalContext.Provider
			value={{
				open,
				setOpen,
				openModal,
				closeModal,
				id,
				setId,
			}}
		>
			{props.children}
		</ModalContext.Provider>
	);
};

export default ModalContextProvider;

// consumer
export const AdminConsumer = ModalContext.Consumer;
