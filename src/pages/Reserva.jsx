import { useEffect, useState } from 'react';
import MenuLateral from '../components/atom/MenuLateral'
import MiniPerfil from '../components/atom/MiniPerfil'
import Psicologo from '../components/molecule/Psicologo';
import Modal from '../components/organism/Modal';
import { user as usuario } from "../constants/methods";
import UseSearch from '../hooks/UseSearch';
import { getCitas } from '../services/Cita';
import { postListPsicologos } from '../services/Usuario';

const Reserva = () => {
  const [user, setUser] = useState({
    ...usuario(),
    foto: usuario()?.foto || "https://i.ibb.co/JBcGfKj/imagen.png",
  });
  const [busqueda, setBusqueda] = useState("");
  const [psicologos , setPsicologos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [ModalContent, setModalContent] = useState();
  const { filteredResults } = UseSearch(psicologos, busqueda, "nombre", "apellidoPa");
  const [citas, setCitas] = useState([]);
 
  const mouseDownModal = (e) =>{
    const divPadre = e.target.closest('.modal-content');
    if(!divPadre) setOpenModal(false)
  }

  const rangoHoras = () =>{
    const hora_inicio = 9 , hora_fin = 17;
    let horarios = [];
    for(let i= hora_inicio; i<= hora_fin ; i++){
      horarios.push({id: (horarios.length + 1), horario_inicio: `${i}:00`, horario_fin: `${(i+1)}:00`})
    }
    return horarios;
  }

  const rangoFecha = (fechaInicio, fechaFin) =>{
    let fechas = [];
    while(fechaFin.getTime() >= fechaInicio.getTime()){
        fechaInicio.setDate(fechaInicio.getDate() + 1);
        const mes = (fechaInicio.getMonth() + 1);
        const dia = fechaInicio.getDate();
        const fecha_nueva = fechaInicio.getFullYear() + '/' + (mes < 10 ? `0${mes}`: mes) + '/' + (dia < 10 ? `0${dia}`: dia);
        
        fechas.push({id: (fechas.length + 1), fecha : fecha_nueva, horarios : rangoHoras()});
    }
    return fechas
  }

  const obtenerFechas = (data) =>{
    const hoy = new Date();
    const fecha_fin = new Date(new Date().setDate(new Date().getDate() + 10))
    const fechas = rangoFecha(hoy, fecha_fin);
    const data_nueva = data.map((psicologo) => ({...psicologo, fechas: fechas}))
    return data_nueva;
  }
  
  const cargarPsicologos = async () => {
    const json = {
      correo: usuario().correo,
      contrasenia: usuario().contrasenia,
    };
    await  postListPsicologos(JSON.stringify(json)).then((response) => {
      const data = response.psicologos;
      let data_fechas = obtenerFechas(data)

      if(citas?.length > 0){
        data_fechas = data_fechas.map((psicologo) => {
          const cita_fecha = citas?.filter((cita) => cita?.psicologo?.id === psicologo?.id);
          if(cita_fecha?.length > 0){
            console.log(cita_fecha);
            psicologo.fechas = psicologo?.fechas?.map((fecha) => {
              const fecha_formato = fecha?.fecha.replaceAll('/', '-');
              console.log(fecha_formato);
              const fecha_existente = cita_fecha.find((cita) => cita?.fecha === fecha_formato)
              if(fecha_existente){
                // console.log(fecha_existente?.inicio);
                fecha.horarios = fecha?.horarios?.filter((horario)=> horario?.horario_inicio !== fecha_existente?.inicio)
                const fecha_actual = {...fecha};
                console.log(fecha_actual);
                return fecha_actual;
              }
              return fecha;
            })
            return psicologo;
          }
          return psicologo;
        })
      }
      setPsicologos(data_fechas)
      console.log(data_fechas);
    });
  };

  const cargarCitas = async () => {
    const json = {
      correo: usuario().correo,
      contrasenia: usuario().contrasenia,
    };
    await getCitas(JSON.stringify(json)).then((response) => {
      const data = response.citas;
      setCitas(data)
    });
  };

  useEffect(() => {
    cargarPsicologos()
    cargarCitas()
  }, []);

  useEffect(() => {
    cargarPsicologos()
  }, [citas]);

  return (
    <>
      <Modal isOpen={openModal} onMouseDown= {mouseDownModal} children={ModalContent}/>   
      <div className="reserva">
        <div className="container">
          <MenuLateral link= {3} />
          <div className="content dashboard-reserva">
            <div className="reserva__item">
              <div className="reserva-header">
                <h3 className="title">Lista de psicólogos</h3>
                <div className="content__search">
                  <i className="fas fa-search"></i>
                  <input 
                    type="search" 
                    id="buscar_psicologo" 
                    placeholder="Buscar por nombre o apellido..." 
                    onChange={(e) => setBusqueda(e.target.value)}
                    value={busqueda}
                  />
                </div>
              </div>
              <div className="reserva-psicologo">
                {
                  filteredResults?.length > 0 ? 
                  filteredResults?.map((psicologo, key) => (
                    <Psicologo 
                      key={key} 
                      psicologo={psicologo} 
                      setModalContent={setModalContent}
                      setOpenModal={setOpenModal}
                      user={user}
                      cargarCitas={cargarCitas}
                    />
                  ))
                  : <div>No se encontro nada</div>
                }
              </div>
            </div>
            <MiniPerfil
              user={user}
              isReserva= {true}
              emociones = {[]}
              citas= {citas}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Reserva