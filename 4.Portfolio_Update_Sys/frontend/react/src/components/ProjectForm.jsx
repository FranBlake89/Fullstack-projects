import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";

const Form = () => {
    let [showAlert, setShowAlert] = useState(false);
    let [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        icon: "",
        title: "",
        shortDesc: "",
        longDesc: "",
        urlDemo: "",
        urlRepo: "",
        urlWebsite: "",
        urlImgs: [],
        skills: [],
    });

    const accessToken = localStorage.getItem("token");
    const api = axios.create({
        baseURL: "http://localhost:3000",
        headers: {
        Authorization: `${accessToken}`,
        },
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
        ...formData,
        [id]: value,
        });
    };
    // Manejar cambios en arreglos (por ejemplo, skills o urlImgs)
    const handleArrayChange = (e, field) => {
        const { value } = e.target;
        setFormData({
        ...formData,
        [field]: value.split(",").map((item) => item.trim()), // Separar por comas y eliminar espacios
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const response = await api.post("/api/projects/create-project", formData);
        console.log(response);
        if (response.status === 201) {
            setIsSuccess(true);
        } else {
            setMessage("Hubo un error al crear el proyecto.");
            setShowAlert(true);
        }
        } catch (error) {
        setMessage(error.response.data.message || "Ocurrió un error.");
        setShowAlert(true);
        }
    };

    return (
        <div className="relative max-w-2xl mx-auto">
        {/* ALERT */}
        {showAlert && (
            <div className="absolute top-0 left-0 right-0 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <div className="flex justify-between items-center">
                <p>{message}</p>
                <button
                onClick={() => setShowAlert(false)}
                className="text-red-500 hover:text-red-700"
                >
                &times;
                </button>
            </div>
            </div>
        )}

        {/* SUCCESS MESSAGE */}
        {isSuccess ? (
            <div className="flex justify-center items-center p-6 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                />
            </svg>
            <p>Proyecto guardado con éxito!\nPuedes cerrar esta ventana</p>
            </div>
        ) : (
            /* FORM */
            <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 space-y-6"
            >

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label htmlFor="icon" className="block text-gray-700 mb-2">
                    Icon URL:
                </label>
                <input
                    type="text"
                    id="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <label htmlFor="title" className="block text-gray-700 mb-2">
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div className="md:col-span-2">
                <label htmlFor="shortDesc" className="block text-gray-700 mb-2">
                    Short Description:
                </label>
                <textarea
                    id="shortDesc"
                    value={formData.shortDesc}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe una breve descripción..."
                />
                </div>

                <div className="md:col-span-2">
                <label htmlFor="longDesc" className="block text-gray-700 mb-2">
                    Long Description:
                </label>
                <textarea
                    id="longDesc"
                    value={formData.longDesc}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe una descripción más larga con viñetas..."
                />
                </div>

                <div>
                <label htmlFor="urlDemo" className="block text-gray-700 mb-2">
                    Demo URL:
                </label>
                <input
                    type="text"
                    id="urlDemo"
                    value={formData.urlDemo}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <label htmlFor="urlRepo" className="block text-gray-700 mb-2">
                    Repository URL:
                </label>
                <input
                    type="text"
                    id="urlRepo"
                    value={formData.urlRepo}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <label htmlFor="urlWebsite" className="block text-gray-700 mb-2">
                    Website URL:
                </label>
                <input
                    type="text"
                    id="urlWebsite"
                    value={formData.urlWebsite}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <label htmlFor="urlImgs" className="block text-gray-700 mb-2">
                    Images URLs (separated by commas):
                </label>
                <input
                    type="text"
                    id="urlImgs"
                    value={formData.urlImgs.join(", ")}
                    onChange={(e) => handleArrayChange(e, "urlImgs")}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="URL de las imágenes separadas por comas..."
                />
                </div>

                <div className="md:col-span-2">
                <label htmlFor="skills" className="block text-gray-700 mb-2">
                    Skills (separated by commas):
                </label>
                <input
                    type="text"
                    id="skills"
                    value={formData.skills.join(", ")}
                    onChange={(e) => handleArrayChange(e, "skills")}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Habilidades separadas por comas..."
                />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Enviar
            </button>
            </form>
        )}
        </div>
    );
};

export default Form;
