import axios from 'axios';

export const versionAPI = async () => {
	const res = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
	return res.data;
};

export const patchNoteAPI = async (n: number) => {
	const res = await axios.get(
		`https://ehf9c6n132.execute-api.ap-northeast-2.amazonaws.com/patchNoteList/${n}`
	);
	return res.data;
};

export const championDetailAPI = async (name: string) => {
	const res = await axios.get(
		`https://ddragon.leagueoflegends.com/cdn/13.20.1/data/ko_KR/champion/${name}.json`
	);
	return res.data;
};

export const rankingAPI = async (page: string) => {
	const res = await axios.get(
		`https://8bihktj9y3.execute-api.ap-northeast-2.amazonaws.com/rankList/${page}`
	);
	return res.data;
};

export const matchListAPI = async (count: number, puuid: string) => {
	const res = await axios.get(
		`https://4tsd4q6r68.execute-api.ap-northeast-2.amazonaws.com/v2/getMatchList?puuid=${puuid}&startIdx=${
			count * 10
		}`
	);

	return res.data.body;
};
