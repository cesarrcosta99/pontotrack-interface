import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useUser } from '../../hooks/UserContext';
import { api } from '../../services/api';

import Logo from '../../assets/logo-ponto-track.png';
import {
	Button,
	ButtonRegister,
	Container,
	Form,
	Imagem,
	SecondContainer,
} from './styles';

export function Login() {
	const { putUserData } = useUser();
	const navigate = useNavigate();
	const schema = yup
		.object({
			email: yup
				.string()
				.email('Digite um e-mail válido')
				.required('O e-mail é obrigatório'),
			password: yup
				.string()
				.min(6, 'A senha deve ter pelo menos 6 caracteres')
				.required('Digite uma senha'),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (clienteData) => {
		const { data } = await toast.promise(
			api.post('sessions', {
				email: clienteData.email,
				password: clienteData.password,
			}),
			{
				pending: 'Verificando seus dados',
				success: 'Seja bem-vindo(a)',
				error: 'Verifique seu e-mail e senha ',
			},
		);

		putUserData(data);

		setTimeout(() => {
			navigate('/vehicle-registration');
		}, 2000);
	};

	return (
		<Container>
			<Imagem src={Logo} />
			<h1>ÁREA DE ACESSO AO PORTAL</h1>

			<SecondContainer>
				<Form onSubmit={handleSubmit(onSubmit)} noValidate>
					<input
						type="email"
						placeholder="E-mail"
						{...register('email')}
						className={errors.email ? 'error' : ''}
					/>
					<p>{errors.email?.message}</p>
					<input
						type="password"
						placeholder="Senha"
						{...register('password')}
						className={errors.password ? 'error' : ''}
					/>
					<p>{errors.password?.message}</p>
					<Button type="submit">Login</Button>
				</Form>
				<ButtonRegister onClick={() => navigate('/register')}>
					Crie Sua Conta
				</ButtonRegister>
			</SecondContainer>
		</Container>
	);
}
