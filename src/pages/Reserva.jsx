import { useEffect, useState } from 'react';
import MenuLateral from '../components/atom/MenuLateral'
import MiniPerfil from '../components/atom/MiniPerfil'
import Psicologo from '../components/molecule/Psicologo';
import Modal from '../components/organism/Modal';
import { user as usuario } from "../constants/methods";
import UseSearch from '../hooks/UseSearch';
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

        const fecha_nueva = fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getDate();
        
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
      const data_fechas = obtenerFechas(data)
      setPsicologos(data_fechas)
    });
  };

  useEffect(() => {
    cargarPsicologos()
  }, []);

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
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Reserva