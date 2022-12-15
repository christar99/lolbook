import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { ChampionProps } from 'utils/types';
import { useAppDispatch, useAppSelector } from 'store';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { csrFetch } from 'store/csrFetch';
import tips from '/public/img/tips.png';

const SlideContainer = styled.div`
	width: 90vw;
	height: 350px;
	margin-top: 50px;
	position: relative;
	user-select: none;

	& ::-webkit-scrollbar {
		color: black;
	}

	& ::-webkit-scrollbar-thumb {
		background-color: rgb(235, 102, 45);
		border-radius: 20px;
	}

	& ::-webkit-scrollbar-track {
		background-color: rgb(26, 36, 46);
		border-radius: 20px;
	}
`;

const Slider = styled.div`
	width: 100%;
	height: 100%;
	overflow-x: auto;
	overflow-y: hidden;
	display: flex;
	align-items: center;
	gap: 15px;

	.navBack {
		font-size: 6rem;
		color: rgb(235, 102, 45);
		position: absolute;
		left: -50px;

		:hover {
			cursor: pointer;
		}
	}

	.navForward {
		font-size: 6rem;
		color: rgb(235, 102, 45);
		position: absolute;
		right: -60px;

		:hover {
			cursor: pointer;
		}
	}
`;

const CardContainer = styled.div`
	height: 300px;
	display: flex;
	position: relative;

	& ::-webkit-scrollbar {
		color: black;
	}

	& ::-webkit-scrollbar-thumb {
		background-color: rgb(52, 69, 85);
		border-radius: 0;
	}

	& ::-webkit-scrollbar-track {
		background-color: rgb(26, 36, 46);
		border-radius: 0;
	}
`;

const Card = styled.div`
	width: 170px;
	height: 300px;
	position: relative;

	:hover {
		cursor: pointer;
	}
`;

const ChampionName = styled.span`
	width: 170px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 10;
	bottom: 0;
	font-size: 2rem;
	color: #fff;
	background-color: #000;
	opacity: 0.7;
`;

const ChampionInfo = styled.div`
	width: 350px;
	height: 100%;
	padding: 20px 15px;
	background-color: rgb(26, 36, 46);
	position: relative;
	color: #fff;
	overflow-y: auto;
`;

const CardTopArea = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

const CardSubject = styled.div`
	display: flex;
	flex-direction: column;
`;

const CardName = styled.span`
	font-size: 2.3rem;
`;

const CardTitle = styled.span`
	font-size: 1.7rem;
`;

const MoveDetailPage = styled.button`
	height: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: inherit;
	font-size: 1.6rem;
	background-color: #fff;

	:hover {
		cursor: pointer;
		background-color: skyblue;
	}
`;

const Info = styled.div`
	margin: 20px 0;
`;

const barGraph = keyframes`
    from {
        width: 0;
    }
`;

const Graph = styled.div`
	font-size: 1.7rem;
	position: relative;
	margin-bottom: 5px;

	::after {
		content: '';
		height: 15px;
		position: absolute;
		left: 100px;
		animation: ${barGraph} linear 0.5s;
	}
`;

const Attack = styled(Graph)<{ attack: number }>`
	::after {
		width: ${(props) => props.attack * 15}px;
		background: linear-gradient(to bottom, hotpink, red);
	}
`;
const Magic = styled(Graph)<{ magic: number }>`
	::after {
		width: ${(props) => props.magic * 15}px;
		background: linear-gradient(to bottom, cornflowerblue, blue);
	}
`;
const Defense = styled(Graph)<{ defense: number }>`
	::after {
		width: ${(props) => props.defense * 15}px;
		background: linear-gradient(to bottom, lightGreen, darkGreen);
	}
`;
const Difficulty = styled(Graph)<{ difficulty: number }>`
	::after {
		width: ${(props) => props.difficulty * 15}px;
		background: linear-gradient(to bottom, indianred, purple);
	}
`;

const Tips = styled.div``;

const TipsText = styled.span`
	margin-bottom: 10px;
	display: inline-block;
	font-size: 2.1rem;

	img {
		margin-right: 5px;
	}
`;

const TipList = styled.ul`
	padding: 0 10px;
`;

const Tip = styled.li`
	list-style: circle;
	margin-bottom: 5px;
	font-size: 1.8rem;
`;

interface ChampionListProps {
	championList?: ChampionProps[];
}

function ChampionSlide({ championList }: ChampionListProps) {
	const dispatch = useAppDispatch();
	const championDetail = useAppSelector((state) => state.champions.championDetail);
	const slider = useRef<HTMLDivElement>(null);
	const [mouseIsDown, setMouseDown] = useState<boolean>(false);
	const [startX, setStartX] = useState<number>(0);
	const [scrollLeft, setScrollLeft] = useState<number>(0);
	const [championInfo, openChampionInfo] = useState<string>('');

	useEffect(() => {
		console.log(championDetail);
	}, [championDetail]);

	const clickChmpionDetail = (name: string) => {
		openChampionInfo(name);
		dispatch(csrFetch.getChampionDetail(name));
	};

	const scrollMoveLeft = () => {
		if (slider.current !== null) {
			setScrollLeft(scrollLeft - 1000);
			slider.current.scrollTo({
				left: scrollLeft - 1000,
				behavior: 'smooth'
			});
		}
	};

	const scrollMoveRight = () => {
		if (slider.current !== null) {
			setScrollLeft(scrollLeft + 1000);
			slider.current.scrollTo({
				left: scrollLeft + 1000,
				behavior: 'smooth'
			});
		}
	};

	const mouseLeave = (e: MouseEvent<HTMLDivElement>) => {
		setMouseDown(false);
		if (slider.current !== null) {
			slider.current.classList.remove('active');
		}
	};

	const mouseUp = (e: MouseEvent<HTMLDivElement>) => {
		setMouseDown(false);
		if (slider.current !== null) {
			slider.current.classList.remove('active');
		}
	};

	const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
		setMouseDown(true);
		if (slider.current !== null) {
			slider.current.classList.add('active');
			setStartX(e.pageX - slider.current.offsetLeft);
			setScrollLeft(slider.current.scrollLeft);
		}
	};

	const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!mouseIsDown) {
			return false;
		}
		e.preventDefault();
		if (slider.current !== null) {
			const x = e.pageX - slider.current.offsetLeft;
			const walk = x - startX;
			slider.current.scrollLeft = scrollLeft - walk;
		}
	};

	return (
		<SlideContainer>
			<Slider
				ref={slider}
				onMouseDown={(e) => mouseDown(e)}
				onMouseLeave={(e) => mouseLeave(e)}
				onMouseUp={(e) => mouseUp(e)}
				onMouseMove={(e) => mouseMove(e)}>
				<MdArrowBackIos className="navBack" onClick={scrollMoveLeft} />
				<MdArrowForwardIos className="navForward" onClick={scrollMoveRight} />
				{championList !== undefined &&
					championList.map((champion, index) => {
						return (
							<CardContainer key={index}>
								<Card onClick={() => clickChmpionDetail(champion.id)}>
									<Image
										src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
										width={170}
										height={300}
										alt="ChampionLoadingImg"
									/>
									<ChampionName>{champion.name}</ChampionName>
								</Card>
								{championInfo === champion.id && (
									<ChampionInfo>
										<CardTopArea>
											<CardSubject>
												<CardName>{champion.name}</CardName>
												<CardTitle>{champion.title}</CardTitle>
											</CardSubject>
											<MoveDetailPage>챔피언 상세보기</MoveDetailPage>
										</CardTopArea>
										<Info>
											<Attack attack={champion.info.attack}>
												평타데미지
											</Attack>
											<Magic magic={champion.info.magic}>스킬데미지</Magic>
											<Defense defense={champion.info.defense}>방어</Defense>
											<Difficulty difficulty={champion.info.difficulty}>
												난이도
											</Difficulty>
										</Info>
										<Tips>
											<TipsText>
												<Image
													src={tips}
													width={20}
													height={20}
													alt="tips"
												/>
												Tips
											</TipsText>
											<TipList>
												{championDetail !== undefined &&
													championDetail[champion.id] !== undefined &&
													championDetail[champion.id].allytips.map(
														(tip, tipIdx) => {
															return <Tip key={tipIdx}>{tip}</Tip>;
														}
													)}
											</TipList>
										</Tips>
									</ChampionInfo>
								)}
							</CardContainer>
						);
					})}
			</Slider>
		</SlideContainer>
	);
}

export default ChampionSlide;