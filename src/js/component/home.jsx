import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("");
	const [alert, setAlert] = useState(false);
	const [listaTareas, setListaTareas] = useState([]);

	const añadir = (e) => {
		if (e.key === "Enter") {
			if (tarea === "") {
				setAlert(true);
			}
			if (tarea.length > 0) {
				setAlert(false);
				setListaTareas([...listaTareas, { label: tarea, done: false }]);
				setTarea("");
			}
		}
	};

	const limpiar = () => {
		setListaTareas([]);
	};

	const update = (listaTareas) => {
		const requestOptionsInsertarTarea = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(listaTareas),
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/miguelangeljurado",
			requestOptionsInsertarTarea
		).then((response) => response.json());
	};

	useEffect(() => {
		const getLista = () => {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/miguelangeljurado"
			)
				.then((response) => response.json())
				.then((data) => setListaTareas(data));
		};
		getLista();
	}, []);

	return (
		<div className="container">
			<h1 className="text-center text-warning fw-bolder ">
				Lista de Tareas
			</h1>
			<div className="input-group flex-nowrap">
				<input
					type="text"
					className="form-control mx-auto border border-info text-info fw-bolder"
					placeholder="Introduce tu Tarea"
					aria-label="Username"
					aria-describedby="addon-wrapping"
					onChange={(e) => setTarea(e.target.value)}
					onKeyDown={añadir}
					value={tarea}
				/>
			</div>
			<Card
				listaTareas={listaTareas}
				setListaTareas={setListaTareas}
				update={update}
			/>
			<div
				className={`${
					alert
						? "alert alert-danger mt-4 mx-auto alerta text-center"
						: ""
				}`}
				role="alert">
				{`${alert ? "No puedes insertar una tarea vacia" : ""}`}
			</div>
			<div
				className=" text-center mt-3"
				role="group"
				aria-label="Basic mixed styles example">
				<button
					type="button"
					className="btn btn-danger"
					onClick={limpiar}>
					Limpiar
				</button>
			</div>
		</div>
	);
};

export default Home;
