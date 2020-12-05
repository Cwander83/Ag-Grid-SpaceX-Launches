// styles
import './assets/styles/app.scss';

// components
import Layout from './layout/layout';
import Header from './components/Header';
import Grid from './components/Grid';

function App() {
	return (
		<Layout>
			<Header />
			<Grid />
		</Layout>
	);
}

export default App;
