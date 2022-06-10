import React, { useEffect } from "react";

const Card = ({ listaTareas, setListaTareas, update }) => {
	const eliminar = (element) => {
		let filter = listaTareas.filter((tarea) => {
			return tarea.label !== element.label;
		});
		setListaTareas(filter);
	};

	useEffect(() => {
		console.log(listaTareas);
		if (listaTareas.length > 0) {
			update(listaTareas);
		}
	}, [listaTareas]);

	return (
		<>
			<div className="card tarjeta mt-3 mx-auto fw-bolder">
				<div className="card-body border border-info">
					<ul className="list-group-item border border-warning">
						{listaTareas.length === 0 ? (
							<p className="text-info text-center">
								Añade Tareas a la Lista
							</p>
						) : (
							listaTareas.map((element, index) => {
								return (
									<li
										key={index}
										className="d-flex justify-content-between text-info p-2">
										{element.label}
										<button
											onClick={() => eliminar(element)}
											className=" boton bg-danger rounded-circle text-white border-0">
											<i className="far fa-trash-alt"></i>
										</button>
									</li>
								);
							})
						)}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Card;
