import { useEffect, useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import './Login.css';
import Cookies from 'js-cookie';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			navigate('/dashboard', { replace: true });
		}
	}, [navigate]);

	async function handleSubmit(event) {
		event.preventDefault();
		await api.post('/rpc/auth', { login: username, senha: password }).then((res) => {
			Cookies.set('token', res.data);
			navigate('/cadastro');
		});
	}

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<h1 className="titulo-principal">DENSYS</h1>
				<div className="input-field">
					<h2 className="titulo-input">Usuário</h2>
					<input type="login" placeholder="Digite seu login" onChange={(e) => setUsername(e.target.value)} />
					<FaUser className="icon" />
				</div>
				<div className="input-field">
					<h2 className="titulo-input">Senha</h2>
					<input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
					<FaLock className="icon" />
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
