import { GetServerSideProps } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { rankingAPI } from 'store';
import SearchForm from 'components/common/SearchForm';
import { RankingType } from 'utils/recordType';
import Ranking from 'components/units/record/Ranking';
import Pagenation from 'components/common/Pagenation';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let page = context.query.page ?? '1';

	try {
		const data = await rankingAPI(page as string);
		return {
			props: { rankList: data }
		};
	} catch (e) {
		return {
			redirect: {
				permanent: false,
				destination: '/error'
			}
		};
	}
};

interface RecordProps {
	rankList: RankingType[];
}

export default function index({ rankList }: RecordProps) {
	useEffect(() => {
		console.log(rankList[0]);
	}, [rankList]);
	return (
		<>
			<Background>
				<Image src="/img/background/in73r6sbixz31.webp" alt="background" fill />
			</Background>
			<PageWrap>
				<PageContent>
					<SearchForm />
					<RankingSection>
						<LastUpdate>
							마지막 업데이트 시각:{' '}
							{dayjs(rankList[0].currentTime).format('YYYY-MM-DD HH:mm:ss')}
						</LastUpdate>
						<Ranking rankList={rankList} />
					</RankingSection>
					<Pagenation />
				</PageContent>
			</PageWrap>
		</>
	);
}

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	z-index: -1;
`;

const PageWrap = styled.div`
	width: 100vw;
	height: 100vh;
`;

const PageContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
`;

const RankingSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const LastUpdate = styled.p`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 5px;
	font-size: 1.35rem;
	font-style: italic;
	font-weight: 600;
`;
