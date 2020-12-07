// components
import Layout from './layout/layout';
import Header from './components/Header';
import Grid from './components/Grid';
import MobileMessage from './components/MobileMessage';
import ReactModal from './components/ReactModal';

// context api
import ModalContextProvider from './context/modal.context';

function App() {
	return (
		<ModalContextProvider>
			<Layout>
				<Header />
				<Grid />
				<MobileMessage />
				<ReactModal />
			</Layout>
		</ModalContextProvider>
	);
}

export default App;
