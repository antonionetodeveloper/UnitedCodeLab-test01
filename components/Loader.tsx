import Head from "next/head"
import styled from "styled-components"

// credits: Made by @Nawsome
// https://uiverse.io/Nawsome/cold-liger-90

const Loader = ({ little }: { little?: boolean }) => {
	return (
		<>
			<Head>
				<title>Carregando...</title>
			</Head>
			<Container isLittle={little}>
				<div className="boxes">
					<div className="box">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className="box">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className="box">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className="box">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</Container>
		</>
	)
}

const Container: any = styled.div`
	width: ${(props: any) => (props.isLittle ? "25vw" : "100vw")};
	height: ${(props: any) => (props.isLittle ? "15vh" : "100vh")};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 3;

	.boxes {
		--size: ${(props: any) => (props.isLittle ? "20px" : "32px")};
		--duration: 800ms;
		height: calc(var(--size) * 2);
		width: calc(var(--size) * 3);
		position: relative;
		transform-style: preserve-3d;
		transform-origin: 50% 50%;
		margin-top: calc(var(--size) * 1.5 * -1);
		transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
	}

	.boxes .box {
		width: var(--size);
		height: var(--size);
		top: 0;
		left: 0;
		position: absolute;
		transform-style: preserve-3d;
	}

	.boxes .box:nth-child(1) {
		transform: translate(100%, 0);
		-webkit-animation: box1 var(--duration) linear infinite;
		animation: box1 var(--duration) linear infinite;
	}

	.boxes .box:nth-child(2) {
		transform: translate(0, 100%);
		-webkit-animation: box2 var(--duration) linear infinite;
		animation: box2 var(--duration) linear infinite;
	}

	.boxes .box:nth-child(3) {
		transform: translate(100%, 100%);
		-webkit-animation: box3 var(--duration) linear infinite;
		animation: box3 var(--duration) linear infinite;
	}

	.boxes .box:nth-child(4) {
		transform: translate(200%, 0);
		-webkit-animation: box4 var(--duration) linear infinite;
		animation: box4 var(--duration) linear infinite;
	}

	.boxes .box > div {
		--background: #5c8df6;
		--top: auto;
		--right: auto;
		--bottom: auto;
		--left: auto;
		--translateZ: calc(var(--size) / 2);
		--rotateY: 0deg;
		--rotateX: 0deg;
		position: absolute;
		width: 100%;
		height: 100%;
		background: var(--background);
		top: var(--top);
		right: var(--right);
		bottom: var(--bottom);
		left: var(--left);
		transform: rotateY(var(--rotateY)) rotateX(var(--rotateX))
			translateZ(var(--translateZ));
	}

	.boxes .box > div:nth-child(1) {
		--top: 0;
		--left: 0;
	}

	.boxes .box > div:nth-child(2) {
		--background: #145af2;
		--right: 0;
		--rotateY: 90deg;
	}

	.boxes .box > div:nth-child(3) {
		--background: #447cf5;
		--rotateX: -90deg;
	}

	.boxes .box > div:nth-child(4) {
		--background: #dbe3f4;
		--top: 0;
		--left: 0;
		--translateZ: calc(var(--size) * 3 * -1);
	}

	@-webkit-keyframes box1 {
		0%,
		50% {
			transform: translate(100%, 0);
		}

		100% {
			transform: translate(200%, 0);
		}
	}

	@keyframes box1 {
		0%,
		50% {
			transform: translate(100%, 0);
		}

		100% {
			transform: translate(200%, 0);
		}
	}

	@-webkit-keyframes box2 {
		0% {
			transform: translate(0, 100%);
		}

		50% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(100%, 0);
		}
	}

	@keyframes box2 {
		0% {
			transform: translate(0, 100%);
		}

		50% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(100%, 0);
		}
	}

	@-webkit-keyframes box3 {
		0%,
		50% {
			transform: translate(100%, 100%);
		}

		100% {
			transform: translate(0, 100%);
		}
	}

	@keyframes box3 {
		0%,
		50% {
			transform: translate(100%, 100%);
		}

		100% {
			transform: translate(0, 100%);
		}
	}

	@-webkit-keyframes box4 {
		0% {
			transform: translate(200%, 0);
		}

		50% {
			transform: translate(200%, 100%);
		}

		100% {
			transform: translate(100%, 100%);
		}
	}

	@keyframes box4 {
		0% {
			transform: translate(200%, 0);
		}

		50% {
			transform: translate(200%, 100%);
		}

		100% {
			transform: translate(100%, 100%);
		}
	}
`

export default Loader
