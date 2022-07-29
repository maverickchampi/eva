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
  const { filteredResults } = UseSearch(psicologos, busqueda, "nombre", "apellido_paterno");
  const dataPsicologos = [
    {
      foto: 'https://static.generated.photos/vue-static/face-generator/landing/wall/21.jpg',
      nombre: 'Maria',
      apellido_paterno: 'Fernandez',
      apellido_materno: 'Guzman',
      profesion: 'Psicologa',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerit non proident, sunt in culpa qui offic',
      precio: '100',
      fechas: [
        {
          id: 1,
          fecha: '2022/07/10',
          horarios: [
            {
              id: 1,
              horario_inicio: '10:00',
              horario_fin: '11:00'
            },
            {
              id: 2,
              horario_inicio: '11:00',
              horario_fin: '12:00'
            },
            {
              id: 3,
              horario_inicio: '12:00',
              horario_fin: '13:00'
            }
          ]
        },
        {
          id: 2,
          fecha: '2022/07/11',
          horarios: [
            {
              id: 1,
              horario_inicio: '10:00',
              horario_fin: '11:00'
            },
            {
              id: 2,
              horario_inicio: '11:00',
              horario_fin: '12:00'
            },
          ]
        },
        {
          id: 3,
          fecha: '2022/07/12',
          horarios: [
            {
              id: 1,
              horario_inicio: '10:00',
              horario_fin: '11:00'
            },
            {
              id: 2,
              horario_inicio: '11:00',
              horario_fin: '12:00'
            },
            {
              id: 3,
              horario_inicio: '12:00',
              horario_fin: '13:00'
            },
            {
              id: 4,
              horario_inicio: '13:00',
              horario_fin: '14:00'
            }
          ]
        },
        {
          id: 4,
          fecha: '2022/07/14',
          horarios: [
            {
              id: 1,
              horario_inicio: '10:00',
              horario_fin: '11:00'
            },
            {
              id: 2,
              horario_inicio: '11:00',
              horario_fin: '12:00'
            },
            {
              id: 3,
              horario_inicio: '12:00',
              horario_fin: '13:00'
            }
          ]
        },
        {
          id: 5,
          fecha: '2022/07/15',
          horarios: [
            {
              id: 1,
              horario_inicio: '10:00',
              horario_fin: '11:00'
            },
            {
              id: 2,
              horario_inicio: '11:00',
              horario_fin: '12:00'
            },
            {
              id: 3,
              horario_inicio: '12:00',
              horario_fin: '13:00'
            }
          ]
        },
        {
          id: 6,
          fecha: '2022/07/16',
          horarios: [
            {
              id: 1,
              horario_inicio: '10:00',
              horario_fin: '11:00'
            },
            {
              id: 2,
              horario_inicio: '11:00',
              horario_fin: '12:00'
            },
            {
              id: 3,
              horario_inicio: '12:00',
              horario_fin: '13:00'
            }
          ]
        },
        {
          id: 7,
          fecha: '2022/07/17',
          horarios: [
            {
              id: 1,
              horario_inicio: '10:00',
              horario_fin: '11:00'
            },
            {
              id: 2,
              horario_inicio: '11:00',
              horario_fin: '12:00'
            },
            {
              id: 3,
              horario_inicio: '12:00',
              horario_fin: '13:00'
            }
          ]
        },
        {
          id: 8,
          fecha: '2022/07/18',
          horarios: [
            {
              id: 1,
              horario_inicio: '10:00',
              horario_fin: '11:00'
            },
            {
              id: 2,
              horario_inicio: '11:00',
              horario_fin: '12:00'
            },
            {
              id: 3,
              horario_inicio: '12:00',
              horario_fin: '13:00'
            }
          ]
        },
        {
          id: 9,
          fecha: '2022/07/19',
          horarios: [
            {
              id: 1,
              horario_inicio: '10:00',
              horario_fin: '11:00'
            },
            {
              id: 2,
              horario_inicio: '11:00',
              horario_fin: '12:00'
            },
            {
              id: 3,
              horario_inicio: '12:00',
              horario_fin: '13:00'
            }
          ]
        },
        {
          id: 10,
          fecha: '2022/07/20',
          horarios: [
            {
              id: 1,
              horario_inicio: '10:00',
              horario_fin: '11:00'
            },
            {
              id: 2,
              horario_inicio: '11:00',
              horario_fin: '12:00'
            },
            {
              id: 3,
              horario_inicio: '12:00',
              horario_fin: '13:00'
            }
          ]
        }
      ]
    },
    {
      foto: 'https://static.generated.photos/vue-static/face-generator/landing/wall/2.jpg',
      nombre: 'Camila',
      apellido_paterno: 'Fernandez',
      apellido_materno: 'Guzman',
      profesion: 'Psicologa',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      precio: '100',
      fechas: []
    },
    {
      foto: 'https://static.generated.photos/vue-static/face-generator/landing/wall/8.jpg',
      nombre: 'Alejandra',
      apellido_paterno: 'Fernandez',
      apellido_materno: 'Guzman',
      profesion: 'Psicologa',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      precio: '100',
      fechas: []
    },
    {
      foto: 'https://static.generated.photos/vue-static/face-generator/landing/wall/4.jpg',
      nombre: 'Maria',
      apellido_paterno: 'Fernandez',
      apellido_materno: 'Guzman',
      profesion: 'Psicologa',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      precio: '100',
      fechas: []
    }
  ]
 
  const mouseDownModal = (e) =>{
    const divPadre = e.target.closest('.modal-content');
    if(!divPadre) setOpenModal(false)
  }
  
  const cargarPsicologos = () => {
    const json = {
      correo: usuario().correo,
      contrasenia: usuario().contrasenia,
    };
    postListPsicologos(JSON.stringify(json)).then((response) => {
      console.log(response.psicologos)
      // setPsicologos(response.psicologos);
      setPsicologos(dataPsicologos)
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