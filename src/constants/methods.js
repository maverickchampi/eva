export const user = () => {
  return sessionStorage.getItem(btoa("user"))
    ? JSON.parse(atob(sessionStorage.getItem(btoa("user"))))
    : null;
};

export const convertirMoneda = (number) =>{
  const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  })

  return formatter.format(number);
}

export const horarioAmPm = (horario) =>{
  const array = horario.split(':')
  const hora =  parseInt(array[0])
  const minuto = parseInt(array[1])

  const horaFormato = hora == 0 ? "12" : hora > 12 ? hora - 12 : hora
  const minutoFormato = (minuto < 10 ? "0" : "") + minuto; 
  var ampm = hora < 12 ? "AM" : "PM"; 

  const formatoTiempo = horaFormato + ":" + minutoFormato + " " + ampm; 
  return formatoTiempo; 
}

export const fechaMesDia = (fecha) =>{
  const fechaGeneral =  new Date(fecha);
  const mes = fechaGeneral.toLocaleString("es-PE", { month: "long" });
  const dia =  fechaGeneral.getDate();

  return {mes, dia}
}

export const subtraerDias = (fecha, dias) =>{
  const date = new Date(fecha)
  const fecha_subtraida= new Date(date.setDate(date.getDate() - dias))
  return fecha_subtraida
}
