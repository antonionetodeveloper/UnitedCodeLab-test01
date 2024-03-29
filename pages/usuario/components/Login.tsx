import axios from "axios"
import { useRouter } from "next/router"
import { setCookie } from "nookies"
import { useContext, useState } from "react"
import styled from "styled-components"
import RegularButton from "../../../components/Buttons/RegularButton"
import { RegularInput } from "../../../components/Inputs/RegularInput"
import SimpleLoader from "../../../components/Loaders/simple"
import Context from "../../../context/Context"
import { API_URL } from "../../_document"

export const Login = () => {
	const Router = useRouter()

	const { setAuth } = useContext(Context)

	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	const [textError, setTextError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleLoginSubmit = async () => {
		setLoading(true)
		await axios
			.post(API_URL + "api/user/Login", {
				login,
				password,
			})
			.then((res) => {
				const response = res.data
				if (response.success) {
					setLogin("")
					setPassword("")

					const token = response.data.token
					setCookie(null, "token", token, {
						maxAge: 604800, // 7 days = 604800 sec
						path: "/",
					})

					const name = response.data.user.name
					setCookie(null, "name", name, {
						maxAge: 604800, // 7 days = 604800 sec
						path: "/",
					})

					setAuth(true)
					setLoading(false)
					Router.push("/usuario/dashboard")
				}
			})
			.catch((err) => {
				setTextError(err.data)
				setLoading(false)
			})
	}

	return (
		<form action="">
			<h5>Login</h5>
			<div className="fields">
				<div>
					<RegularInput
						setValue={setLogin}
						placeholder="Login"
						type="text"
						value={login}
					/>
				</div>
				<div>
					<RegularInput
						setValue={setPassword}
						placeholder="Senha"
						type="password"
						value={password}
					/>
				</div>
				<ButtonContainer loading={loading}>
					<RegularButton
						clicked={() => {
							handleLoginSubmit()
						}}
					>
						{loading ? <SimpleLoader /> : "Entrar"}
					</RegularButton>
					{textError !== "" ? <span>{textError}</span> : <></>}
				</ButtonContainer>
			</div>
		</form>
	)
}

const ButtonContainer: any = styled.div`
	button {
		background-color: ${(props: any) =>
			props.loading ? "#3b82f6" : "#f3f7fe"};
	}
`

export default Login
