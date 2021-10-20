import React from 'react';
import './App.css';
export default function App(){
  return(
    <body>
    <header>
        <ul>
           <li><a href="">Inicio</a></li>
        </ul>
        <ul>
        <li><a href="">Perfil</a></li>
        </ul>
    </header>
    <div id="flotante">
      <div class="A">
          <div id="seccion">
              <div class="A">  
              <img src="images/cara1.png"/>
              </div> 
              <div class="B">
                <h3>Estadisticas</h3>
                <img id="estad" src="images/descarga.png"/>
              </div>
              <div class="C">
                <h3>¿Cómo te sientes hoy?</h3>
                <img src="images/cara1.png"/>
                <img src="images/cara2.png"/>
                <img src="images/cara3.png"/>
                <img src="images/cara4.png"/>
                <img src="images/cara5.png"/>
              </div> 
          </div>    
      </div>
      <div class="A">
          <div id="seccion">
              <div class="A">
              <h3>Nueva publicación</h3>
                   <input id="que" type="text" name="user" placeholder="¿Qué estas pensando?"/>
                   <p/>
                   <button>Publicar</button>
              </div> 
              <div class="B">
              </div> 
          </div> 
      </div>
      <div class="A">
          <div id="Seccion">
              <div class="B">
              <h3>Calendario de emociones</h3>
              </div>
              <div class="B">
              <h3>Recomendaciones</h3>
                  <div>
                   <h4>Talleres recreativos</h4>
                   <img src="images/niños.jpg"/>
                  </div>
                  <div>
                   <h4>Mejorar ambiente de estudio</h4>
                   <img src="images/karate.jpg"/>
                  </div>
              </div>
              
          </div>
      </div>
      
      
    </div>
    </body>
  );
}