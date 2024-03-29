import axios from 'axios';
import dayjs from 'dayjs';
import { setClientInfo } from './aws';

export const winningRate = (win: number, lose: number) => {
	return Math.floor((win * 100) / (win + lose));
};

export const timeStampToDate = (timeStamp: number) => {
	const date = dayjs(timeStamp).format('YYYY-MM-DD, hh:mm:ss');
	return date;
};

export const romeToNumber = (rome: string) => {
	const number: { [key: string]: number } = {
		I: 1,
		II: 2,
		III: 3,
		IV: 4,
		V: 5
	};
	return number[rome];
};

export const selectStyle = {
	control: (base: any) => ({
		...base,
		height: '15px',
		minWidth: 130,
		background: '#212F3D',
		border: 'none',
		margin: 0,
		borderRadius: 0,
		fontSize: '1.5rem',
		fontFamily: 'system-ui',
		fontWeight: 700
	}),

	menu: (base: any) => ({
		...base,
		background: '#212F3D',
		color: '#ABB2B9',
		borderRadius: 0,
		fontSize: '1.5rem',
		fontFamily: 'system-ui',
		fontWeight: 700
	}),

	menuList: (base: any) => ({
		...base,
		borderRadius: 0
	}),

	singleValue: (base: any) => ({
		...base,
		color: '#ABB2B9'
	})
};

export const rateCalculator = (kill: number, death: number, assist: number) => {
	const result = ((kill + assist) / death).toFixed(2);
	return Number(result) === Infinity ? 'Perfect' : '평점 ' + result;
};

export const setEnterLog = async () => {
	let info = {
		ip: '',
		country_name: '',
		city: ''
	};
	try {
		const { data } = await axios.get('https://geolocation-db.com/json/');
		info = {
			ip: data.IPv4,
			country_name: data.country_name,
			city: data.city
		};
	} catch (e) {
		info = {
			ip: 'unknown',
			country_name: 'unknown',
			city: 'unknown'
		};
	}
	setClientInfo(info);
};
