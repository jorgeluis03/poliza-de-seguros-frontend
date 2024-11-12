
export const FormProfile = () => {
    return (
        <form>
            <div className="container">
                <div className="border-b mt-12 border-gray-900/10 pb-12">
                    <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>
                    <p className="mt-1 text-md text-gray-600">Completa los detalles de tu perfil.</p>

                    <div className="mt-10 grid grid-cols-1 gap-y-6">

                        {/* Nombre Completo */}
                        <div>
                            <label htmlFor="full-name" className="block text-sm font-medium text-gray-900">
                                Nombre Completo
                            </label>
                            <div className="mt-1">
                                <input
                                    id="full-name"
                                    name="full-name"
                                    type="text"
                                    required
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa tu nombre completo"
                                />
                            </div>
                        </div>

                        {/* Número de Identificación */}
                        <div>
                            <label htmlFor="identification-number" className="block text-sm font-medium text-gray-900">
                                Número de Identificación (DNI)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="identification-number"
                                    name="identification-number"
                                    type="text"
                                    required
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa tu número de identificación"
                                />
                            </div>
                        </div>

                        {/* Dirección de Correo Electrónico */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Dirección de Correo Electrónico
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa tu correo electrónico"
                                />
                            </div>
                        </div>

                        {/* Número de Teléfono */}
                        <div>
                            <label htmlFor="phone-number" className="block text-sm font-medium text-gray-900">
                                Número de Teléfono
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phone-number"
                                    name="phone-number"
                                    type="tel"
                                    required
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa tu número de teléfono"
                                />
                            </div>
                        </div>

                        {/* Dirección Residencial */}
                        <div>
                            <label htmlFor="residential-address" className="block text-sm font-medium text-gray-900">
                                Dirección Residencial
                            </label>
                            <div className="mt-1">
                                <input
                                    id="residential-address"
                                    name="residential-address"
                                    type="text"
                                    required
                                    autoComplete="street-address"
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa tu dirección residencial"
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="container mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="font-semibold text-gray-900">
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Guardar
                </button>
            </div>
        </form>
    )
}