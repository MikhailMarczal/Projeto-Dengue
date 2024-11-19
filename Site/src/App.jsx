import './App.css';
import Login from './components/login/login';
import Cadastro from './components/cadastro/cadastro';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/login/protected-route';
import Dashboard from './components/dashboard';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Login />} />

					<Route path="/cadastro" element={<ProtectedRoute element={<Cadastro />} />} />
					<Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
