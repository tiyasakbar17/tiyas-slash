import React, { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Loading from "../components/PopUps/Loading";
import PopUps from "../components/PopUps/PopUps";
import useWindowDimensions from "../components/ScreenSize";
import axios from "axios";

function LoginPage() {
	const { width, height } = useWindowDimensions();

	const innitialValue = {
		login: false,
		register: false,
		isPoped: false,
		loadingComp: false,
		message: "",
	};

	const [state, setState] = useState(innitialValue);

	const showModal = (type) => {
		setState((prevState) => ({ ...prevState, [type]: !prevState[type] }));
	};

	const setLoading = (load) => {
		setState((prev) => ({ ...prev, loadingComp: load }));
	};

	const loginHandler = async (data) => {
		setLoading(true);
		try {
			const results = await axios.post("/api/v1/login", data);
			if (results.status === 200) {
				localStorage.setItem("token", results.data.token);
				const search = window.location.search;
				const params = new URLSearchParams(search);
				const next = params.get("next");

				window.location.href = next ? next : "https://www.slash.co/";
			}
			setLoading(false);
		} catch (error) {
            console.log(error.response);
			setState((prev) => ({ ...prev, message: error.response.data.message, isPoped: true }));
			setLoading(false);
		}
	};

	const registerHandler = async (data) => {
        setLoading(true);
		try {
			const results = await axios.post("/api/v1/register", data);
			if (results.status === 200) {
				localStorage.setItem("token", results.data.token);
				const search = window.location.search;
				const params = new URLSearchParams(search);
				const next = params.get("next");

				window.location.href = next ? next : "https://www.slash.co/";
			}
			setLoading(false);
		} catch (error) {
			setState((prev) => ({ ...prev, message: error.response.data.message, isPoped: true }));
			setLoading(false);
		}
    };

	return (
		<>
			{state.isPoped && <PopUps message={state.message} showPopUp={() => setState((prev) => ({ ...prev, isPoped: false }))} />}
			{state.loadingComp && <Loading />}
			{state.login && <Login onClick={() => showModal("login")} userLogin={loginHandler} />}
			{state.register && <Register onClick={() => showModal("register")} userRegister={registerHandler} />}
			<div className="home-container" style={{ width, height }}>
				<div className="wrapper" style={{ width: 0.9 * width, height: 0.9 * height }}>
					<div className="main-picture">
						<img src="https://picsum.photos/800/550" alt="gambar awal" className="main-image" />
					</div>
					<div className="login-side">
						<div className="text-center">
							<h3>Selamat Datang</h3>
						</div>
						<div className="shadow p-3 mb-5 bg-white rounded">
							<div className="card text-white bg-primer mb-3 main-item pointer">
								<div className="card-header text-center" onClick={() => showModal("login")}>
									Login
								</div>
							</div>
							<div className="card text-white bg-second mb-3 main-item pointer">
								<div className="card-header text-center" onClick={() => showModal("register")}>
									Register
								</div>
							</div>
							<button hidden data-toggle="modal" data-target="#addDataLabel" id="showClick"></button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoginPage;
