import { useState } from 'react';
import './cadastro.css';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
	const [nome, setNome] = useState('');
	const [usuario, setUsuario] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmarSenha, setConfirmarSenha] = useState('');
	const [tipo, setTipo] = useState('');

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Lógica para salvar o usuário
		console.log({ nome, usuario, senha, confirmarSenha, tipo });
	};

	const handleBack = () => {
		navigate('/');
	};

	return (
		<div className="cadastro-container">
			<h2>CADASTRO DE USUÁRIO</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Nome</label>
					<input placeholder="Digite o nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
				</div>
				<div className="form-group">
					<label>Usuário</label>
					<input placeholder="Digite o usuário" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
				</div>
				<div className="form-group">
					<label>Senha</label>
					<input placeholder="Digite uma senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
				</div>
				<div className="form-group">
					<label>Confirmar Senha</label>
					<input placeholder="Confirme a senha" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
				</div>
				<div className="form-group">
					<label>Tipo</label>
					<input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
				</div>
				<div className="form-actions">
					<button type="button" className="voltar-btn" onClick={handleBack}>
						Voltar
					</button>
					<button type="submit" className="salvar-btn">
						Salvar
					</button>
				</div>
			</form>
		</div>
	);
};

export default Cadastro;
