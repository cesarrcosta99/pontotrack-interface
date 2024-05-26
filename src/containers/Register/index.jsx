import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { api } from '../../services/api';
import 'react-phone-input-2/lib/style.css';

import Logo from '../../assets/logo-ponto-track.png';
import {
	ButtonRegister,
	Container,
	Form,
	Imagem,
	SecondContainer,
} from './styles';

export function Register() {
	const schema = yup
		.object({
			name: yup.string().required('O nome é obrigatório'),
			email: yup
				.string()
				.email('Digite um e-mail válido')
				.required('O e-mail é obrigatório'),
			password: yup
				.string()
				.min(6, 'A senha deve ter pelo menos 6 caracteres')
				.required('A senha é obrigatória'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'As senhas devem ser iguais')
				.required('As senhas devem ser iguais'),
			phone: yup.string().required('Telefone é obrigatório'),
			address: yup.string().required('Endereço é obrigatório'),
		})
		.required();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (clienteData) => {
		try {
			const { status } = await api.post(
				'users',
				{
					name: clienteData.name,
					email: clienteData.email,
					password: clienteData.password,
					phone: clienteData.phone,
					address: clienteData.address,
				},
				{ validateStatus: () => true },
			);

			if (status === 201 || status === 202) {
				toast.success('Cadastro criado com sucesso');
				setTimeout(() => {
					navigate('/login');
				}, 2500);
			} else if (status === 409) {
				toast.error('Email já cadastrado! Faça login para continuar');
			} else {
				throw new Error();
			}
		} catch (err) {
			toast.error('Falha no sistema! Tente novamente');
		}
	};

	return (
		<Container>
			<Imagem src={Logo} />
			<h1>Crie sua conta no Ponto Track</h1>

			<SecondContainer>
				<Form onSubmit={handleSubmit(onSubmit)} noValidate>
					<input
						type="text"
						placeholder="Nome completo"
						{...register('name')}
						className={errors.name ? 'error' : ''}
					/>
					<p>{errors.name?.message}</p>

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

					<input
						type="password"
						placeholder="Confirme sua senha"
						{...register('confirmPassword')}
						className={errors.confirmPassword ? 'error' : ''}
					/>
					<p>{errors.confirmPassword?.message}</p>

					<PhoneInput
						country={'br'}
						value={getValues('phone')}
						inputStyle={{
							height: '38px',
							width: '322px',
							fontSize: '18px',
							border: errors.phone ? '2px solid #CC1717' : 'none',
						}}
						containerStyle={{ marginBottom: '15px' }}
						placeholder="Telefone"
						onChange={(phone) =>
							setValue('phone', phone, { shouldValidate: true })
						}
					/>
					<p className={errors.phone ? 'tel error' : 'tel'}>
						{errors.phone?.message}
					</p>

					<input
						type="text"
						placeholder="Endereço"
						{...register('address')}
						className={errors.address ? 'error endereco' : 'endereco'}
					/>
					<p className={errors.address ? 'error' : ''}>
						{errors.address?.message}
					</p>

					<ButtonRegister type="submit">CRIAR CONTA</ButtonRegister>
				</Form>
			</SecondContainer>
		</Container>
	);
}
