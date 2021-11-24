import { useState, useMemo } from "react";

const UseSearch = (array, busqueda, filtro, filtroA) => {
  const [filteredResults, setFilteredResults] = useState(null);

  useMemo(() => {
    if (array !== null) {
      const result = array.filter((value) => {
        return (
          value[filtro].toLowerCase().includes(busqueda.toLowerCase()) ||
          value[filtroA].toLowerCase().includes(busqueda.toLowerCase())
        );
      });

      setFilteredResults(result);
    }
  }, [array, busqueda, filtro, filtroA]);

  return { filteredResults };
};

export default UseSearch;
