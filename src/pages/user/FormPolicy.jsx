import { useState } from "react"
import { CarForm } from "../../components/Forms/CarForm"
import { PhoneForm } from "../../components/Forms/PhoneForm"
import { PropertyForm } from "../../components/Forms/PropertyForm"
import { NavLink } from "react-router-dom"
export const FormPolicy = () => {

    const [tipoPoliza, setTipoPoliza] = useState("")

    const handleChange = (e) => {
        setTipoPoliza(e.target.value)
        console.log(e.target.value)
    }

    return (
        <form>
            <div className="container">
                <div className="border-b mt-12 border-gray-900/10 pb-12">
                    <h2 className="text-xl font-semibold text-gray-900">Información de la Póliza de Seguro</h2>
                    <p className="mt-1 text-md text-gray-600">Completa los detalles de tu póliza de seguro.</p>

                    <div className="mt-10 grid grid-cols-1 gap-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center ">
                            {/* Tipo de Seguro */}
                            <div>
                                <label htmlFor="tipoPoliza" className="block text-sm font-medium text-gray-900">
                                    Tipo de Seguro
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="tipoPoliza"
                                        name="tipoPoliza"
                                        className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                        onChange={handleChange}
                                        value={tipoPoliza}
                                    >
                                        <option value="">Selecciona el tipo de seguro</option>
                                        <option value="1">Seguro de Auto</option>
                                        <option value="2">Seguro de Inmueble</option>
                                        <option value="3">Seguro de Celular</option>
                                    </select>
                                </div>
                            </div>
                            {/* Monto Asegurado */}
                            <div>
                                <label htmlFor="insured-amount" className="block text-sm font-medium text-gray-900">
                                    Monto Asegurado
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="insured-amount"
                                        name="insured-amount"
                                        type="number"
                                        required
                                        className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Ingresa el monto asegurado"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center ">
                            {/* Fecha de Inicio de la Póliza */}
                            <div>
                                <label htmlFor="policy-start-date" className="block text-sm font-medium text-gray-900">
                                    Fecha de Inicio de la Póliza
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="policy-start-date"
                                        name="policy-start-date"
                                        type="date"
                                        required
                                        className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            {/* Fecha de Vencimiento de la Póliza */}
                            <div>
                                <label htmlFor="policy-end-date" className="block text-sm font-medium text-gray-900">
                                    Fecha de Vencimiento de la Póliza
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="policy-end-date"
                                        name="policy-end-date"
                                        type="date"
                                        required
                                        className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {tipoPoliza == 1 && <CarForm />}
            {tipoPoliza == 2 && <PropertyForm />}
            {tipoPoliza == 3 && <PhoneForm />}


            <div className="container mt-6 mb-12 flex items-center justify-end gap-x-6">
                <NavLink to="/my-polices" type="button" className="font-semibold text-gray-900">
                    Cancelar
                </NavLink>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Solicitar
                </button>
            </div>
        </form>
    )
}
