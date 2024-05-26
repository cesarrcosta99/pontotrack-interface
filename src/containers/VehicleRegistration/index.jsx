import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Logo from '../../assets/logo-ponto-track.png';
import { api } from '../../services/api';
import {
	ButtonRegister,
	Container,
	Form,
	Imagem,
	SecondContainer,
} from './styles';

export function VehicleRegistration() {
	const [isUpdate, setIsUpdate] = useState(false);
	const [vehicleId, setVehicleId] = useState(null);

	const schema = yup
		.object({
			plate: yup.string().required('A placa é obrigatória'),
			brand: yup.string().required('A marca é obrigatória'),
			model: yup.string().required('O modelo é obrigatório'),
			year: yup
				.number()
				.typeError('O ano é obrigatório')
				.required('O ano é obrigatório')
				.transform((value, originalValue) => {
					return typeof originalValue === 'string'
						? originalValue.trim() === ''
							? undefined
							: Number(originalValue)
						: originalValue;
				}),
			color: yup.string().required('A cor é obrigatória'),
			chassis_number: yup.string().required('O número do chassi é obrigatório'),
			vehicle_type: yup.string().required('O tipo do veículo é obrigatório'),
		})
		.required();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		const vehicleData = JSON.parse(
			localStorage.getItem('pontotrack:vehicleData'),
		);
		if (vehicleData) {
			if (
				window.confirm(
					'Você já tem um veículo cadastrado. Deseja atualizar as informações?',
				)
			) {
				setIsUpdate(true);
				setVehicleId(vehicleData.id);
				Object.keys(vehicleData).forEach((key) => {
					setValue(key, vehicleData[key]);
				});
			} else {
				navigate('/map');
			}
		}
	}, [navigate, setValue]);

	const onSubmit = async (data) => {
		try {
			const method = isUpdate ? 'put' : 'post';
			const url = isUpdate ? `vehicles/${vehicleId}` : 'vehicles';
			const { status, data: responseData } = await api[method](url, data, {
				validateStatus: () => true,
			});

			if (status === 201 || status === 200) {
				toast.success(
					`Veículo ${isUpdate ? 'atualizado' : 'cadastrado'} com sucesso!`,
				);
				localStorage.setItem(
					'pontotrack:vehicleData',
					JSON.stringify(responseData),
				);
				setTimeout(() => {
					navigate('/map');
				}, 2000);
			} else if (status === 409) {
				toast.error('Veículo já cadastrado');
			} else {
				throw new Error();
			}
		} catch (err) {
			toast.error(
				`Erro ao ${
					isUpdate ? 'atualizar' : 'cadastrar'
				} veículo! Tente novamente`,
			);
		}
	};

	return (
		<Container>
			<Imagem src={Logo} />
			<h1>{isUpdate ? 'Atualizar Veículo' : 'Cadastro de Veículo'}</h1>
			<SecondContainer>
				<Form onSubmit={handleSubmit(onSubmit)} noValidate>
					<select
						{...register('vehicle_type')}
						className={errors.vehicle_type ? 'error' : ''}
						style={{ height: 30 }}
					>
						<option value="">Selecione o tipo de veículo</option>
						<option value="carro">Carro</option>
						<option value="moto">Moto</option>
						<option value="caminhao">Caminhão</option>
					</select>
					<p style={{ marginTop: -4 }}>{errors.vehicle_type?.message}</p>
					<input
						type="text"
						placeholder="Placa"
						{...register('plate')}
						className={errors.plate ? 'error' : ''}
					/>
					<p>{errors.plate?.message}</p>
					<input
						type="text"
						placeholder="Marca"
						{...register('brand')}
						className={errors.brand ? 'error' : ''}
					/>
					<p>{errors.brand?.message}</p>
					<input
						type="text"
						placeholder="Modelo"
						{...register('model')}
						className={errors.model ? 'error' : ''}
					/>
					<p>{errors.model?.message}</p>
					<input
						type="text"
						placeholder="Ano"
						{...register('year')}
						className={errors.year ? 'error' : ''}
					/>
					<p>{errors.year?.message}</p>
					<input
						type="text"
						placeholder="Cor"
						{...register('color')}
						className={errors.color ? 'error' : 'endereco'}
					/>
					<p className={errors.color ? 'error' : ''}>{errors.color?.message}</p>
					<input
						type="text"
						placeholder="Número do chassi"
						{...register('chassis_number')}
						className={errors.chassis_number ? 'error' : 'endereco'}
					/>
					<p className={errors.chassis_number ? 'error' : ''}>
						{errors.chassis_number?.message}
					</p>
					<ButtonRegister type="submit">
						{isUpdate ? 'ATUALIZAR VEÍCULO' : 'CADASTRAR VEÍCULO'}
					</ButtonRegister>
				</Form>
			</SecondContainer>
		</Container>
	);
}
