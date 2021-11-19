import { useState, useMemo } from "react";

const UseSearch = (array, filtro, busqueda) => {
  const [filteredResults, setFilteredResults] = useState(null);

  useMemo(() => {
    if (array !== null) {
      const result = array.filter((value) => {
        return value[filtro].toLowerCase().includes(busqueda.toLowerCase());
      });

      setFilteredResults(result);
    }
  }, [array, filtro, busqueda]);

  return { filteredResults };
};

export default UseSearch;
