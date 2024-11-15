import { useState, useEffect } from "react"
import { CarForm } from "../../components/Forms/CarForm"
import { PhoneForm } from "../../components/Forms/PhoneForm"
import { PropertyForm } from "../../components/Forms/PropertyForm"
import { NavLink } from "react-router-dom"
import { useForm } from "react-hook-form"
import { CONSTANTS } from "../../utility/constants"
import { api } from "../../utility/axios"
import { useNavigate, useParams } from "react-router-dom"

export const FormPolicy = () => {

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    let tipoPoliza = watch("tipoPoliza")
    const navigate = useNavigate()
    const { idPolicy } = useParams()

    useEffect(() => {
        if (idPolicy) {
            fetchPolicyById(idPolicy);
        }
    }, [idPolicy, reset]);

    const fetchPolicyById = async (id) => {
        try {
            const response = await api.get(`/v1/polices/${id}`);
            const policyData = response.data.payload;
            tipoPoliza = policyData.tipoPoliza.toString();
            let policyDetails = {};
            switch (parseInt(policyData.tipoPoliza, 10)) {
                case 1:
                    policyDetails = await fetchAutoPolicyDetails(id);
                    break;
                case 2:
                    policyDetails = await fetchInmueblePolicyDetails(id);
                    break;
                case 3:
                    policyDetails = await fetchCelularPolicyDetails(id);
                    break;
                default:
                    throw new Error("Tipo de póliza desconocido");
            }
            reset({ ...policyData, ...policyDetails });
            console.log({ ...policyData, ...policyDetails });
            console.log(tipoPoliza);
        } catch (error) {
            console.error('Error al obtener detalles de la póliza:', error);
        }
    };

    const fetchAutoPolicyDetails = async (id) => {
        const response = await api.get(`/v1/polices/autos/${id}`);
        const policyData = response.data.payload;
        return {
            marcaAuto: policyData.marca,
            modeloAuto: policyData.modelo,
            anioAuto: policyData.anio,
            numeroPlaca: policyData.numeroPlaca,
        };
    };

    const fetchInmueblePolicyDetails = async (id) => {
        const response = await api.get(`/v1/polices/property/${id}`);
        const policyData = response.data.payload;
        return {
            direccionInmueble: policyData.direccion,
            tipoInmueble: policyData.tipoInmueble,
        };
    };

    const fetchCelularPolicyDetails = async (id) => {
        const response = await api.get(`/v1/polices/phone/${id}`);
        const policyData = response.data.payload;
        return {
            marcaCelular: policyData.marca,
            modeloCelular: policyData.modelo,
        };
    };

    const onSubmit = async (data) => {
        setIsLoading(true)

        try {
            const body = {
                usuario: localStorage.getItem('username'),
                tipoPoliza: parseInt(data.tipoPoliza, 10),
                montoAsegurado: data.montoAsegurado,
                fechaInicio: data.fechaInicio,
                fechaVencimiento: data.fechaVencimiento,
                ...(data.tipoPoliza == 1 && {
                    marcaAuto: data.marcaAuto,
                    modeloAuto: data.modeloAuto,
                    anioAuto: data.anioAuto,
                    numeroPlaca: data.numeroPlaca,
                }),
                ...(data.tipoPoliza == 2 && {
                    direccionInmueble: data.direccionInmueble,
                    tipoInmueble: data.tipoInmueble,
                }),
                ...(data.tipoPoliza == 3 && {
                    marcaCelular: data.marcaCelular,
                    modeloCelular: data.modeloCelular,
                })
            }

            if (idPolicy) {
                await api.put(`/v1/polices/${idPolicy}`, body);
                navigate('/my-polices');
            } else {
                await api.post('/v1/polices', body);
                navigate('/my-polices');
            }
        } catch (error) {
            console.error('Error al guardar:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
                <div className="border-b mt-12 border-gray-900/10 pb-12">
                    <h2 className="text-xl font-semibold text-gray-900">{idPolicy ? "Actualizar Póliza de Seguro" : "Información de la Póliza de Seguro"}</h2>
                    <p className="mt-1 text-md text-gray-600">Completa los detalles de tu póliza de seguro.</p>

                    <div className="mt-10 grid grid-cols-1 gap-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center ">
                            <div>
                                <label htmlFor="tipoPoliza" className="block text-sm font-medium text-gray-900">
                                    Tipo de Seguro
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="tipoPoliza"
                                        name="tipoPoliza"
                                        disabled={idPolicy}
                                        className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                        {...register("tipoPoliza", { required: CONSTANTS.VALIDATION.REQUIRED })}
                                    >
                                        <option value="">Selecciona el tipo de seguro</option>
                                        <option value="1">Seguro de Auto</option>
                                        <option value="2">Seguro de Inmueble</option>
                                        <option value="3">Seguro de Celular</option>
                                    </select>
                                    {errors.tipoPoliza && <span className="text-red-500">{errors.tipoPoliza.message}</span>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="insured-amount" className="block text-sm font-medium text-gray-900">
                                    Monto Asegurado
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="insured-amount"
                                        name="insured-amount"
                                        type="number"
                                        className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Ingresa el monto asegurado"
                                        {...register("montoAsegurado", { required: CONSTANTS.VALIDATION.REQUIRED })}
                                    />
                                    {errors.montoAsegurado && <span className="text-red-500">{errors.montoAsegurado.message}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center ">
                            <div>
                                <label htmlFor="policy-start-date" className="block text-sm font-medium text-gray-900">
                                    Fecha de Inicio de la Póliza
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="policy-start-date"
                                        name="policy-start-date"
                                        type="date"
                                        className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                        {...register("fechaInicio", { required: CONSTANTS.VALIDATION.REQUIRED })}
                                    />
                                    {errors.fechaInicio && <span className="text-red-500">{errors.fechaInicio.message}</span>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="policy-end-date" className="block text-sm font-medium text-gray-900">
                                    Fecha de Vencimiento de la Póliza
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="policy-end-date"
                                        name="policy-end-date"
                                        type="date"
                                        className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                        {...register("fechaVencimiento", { required: CONSTANTS.VALIDATION.REQUIRED })}
                                    />
                                    {errors.fechaVencimiento && <span className="text-red-500">{errors.fechaVencimiento.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {tipoPoliza == "1" && <CarForm register={register} errors={errors} />}
                {tipoPoliza == "2" && <PropertyForm register={register} errors={errors} watch={watch} />}
                {tipoPoliza == "3" && <PhoneForm register={register} errors={errors} />}
            </div>

            <div className="container mt-6 mb-12 flex items-center justify-end gap-x-6">
                <NavLink to="/my-polices" type="button" className="font-semibold text-gray-900">
                    Cancelar
                </NavLink>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.268 0 0 6.268 0 14h4zm2 5.291l2-2V4a8 8 0 118 8h-4a4 4 0 00-4 4v4.291l2-2z"></path>
                            </svg>
                            Cargando...
                        </div>
                    ) : (
                        idPolicy ? 'Actualizar' : 'Solicitar'
                    )}
                </button>
            </div>
        </form>
    )
}
