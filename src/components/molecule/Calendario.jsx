import React, { useEffect } from "react";
import { MES_NOMBRE } from "../../constants/variables";

const Calendario = () => {
  const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };

  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };

  const generateCalendar = (month, year) => {
    let calendar = document.querySelector(".calendario");
    let calendar_days = calendar.querySelector(".calendario-dias");
    let calendar_header_year = calendar.querySelector("#anio");
    let mes_picker = calendar.querySelector("#mes-picker");

    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    calendar_days.innerHTML = "";

    let currDate = new Date();
    if (!month) month = currDate.getMonth();
    if (!year) year = currDate.getFullYear();

    let curr_month = `${MES_NOMBRE[month]}`;
    mes_picker.innerHTML = curr_month;
    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month, 1);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      let day = document.createElement("div");
      if (i >= first_day.getDay()) {
        day.classList.add("calendario-dia-hover");
        day.innerHTML = i - first_day.getDay() + 1;
        day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`;
        if (
          i - first_day.getDay() + 1 === currDate.getDate() &&
          year === currDate.getFullYear() &&
          month === currDate.getMonth()
        ) {
          day.classList.add("curr-date");
        }
      }
      calendar_days.appendChild(day);
    }
  };

  useEffect(() => {
    let calendar = document.querySelector(".calendario");
    let month_list = calendar.querySelector(".mes-lista");
    let currDate = new Date();
    let curr_month = { value: currDate.getMonth() };
    let curr_year = { value: currDate.getFullYear() };
    let month_picker = calendar.querySelector("#mes-picker");

    MES_NOMBRE.forEach((e, index) => {
      let month = document.createElement("div");
      month.innerHTML = `<div data-month="${index}">${e}</div>`;
      month.querySelector("div").onclick = () => {
        month_list.classList.remove("show");
        curr_month.value = index;
        generateCalendar(index, curr_year.value);
      };
      month_list.appendChild(month);
    });
    month_picker.onclick = () => {
      month_list.classList.add("show");
    };

    generateCalendar(curr_month.value, curr_year.value);
    document.querySelector("#prev-anio").onclick = () => {
      --curr_year.value;
      generateCalendar(curr_month.value, curr_year.value);
    };

    document.querySelector("#next-anio").onclick = () => {
      ++curr_year.value;
      generateCalendar(curr_month.value, curr_year.value);
    };
  }, []);
  return (
    <div className="calendario">
      <div className="calendario__header">
        <div className="mes-picker" id="mes-picker">
          Enero
        </div>
        <div className="anio-picker">
          <span class="anio-change" id="prev-anio">
            <pre>{"<"}</pre>
          </span>
          <span id="anio">2021</span>
          <span class="anio-change" id="next-anio">
            <pre>{">"}</pre>
          </span>
        </div>
      </div>
      <div class="calendario__body">
        <div class="calendar-mes-dia">
          <div>Dom</div>
          <div>Lun</div>
          <div>Mar</div>
          <div>Mie</div>
          <div>Jue</div>
          <div>Vie</div>
          <div>Sab</div>
        </div>
        <div class="calendario-dias"></div>
      </div>
      <div class="mes-lista"></div>
    </div>
  );
};

export default Calendario;
