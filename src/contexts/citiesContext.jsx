import { createContext, useReducer, useEffect, useState } from 'react';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "RemoveCity":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "AddCity":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [shouldRefetchCities, setShouldRefetchCities] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch("http://localhost:8230/cities");
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    }

    fetchCities();
  }, [shouldRefetchCities]);  // This will refetch when `shouldRefetchCities` changes

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch("http://localhost:8230/cities", {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "AddCity", payload: data });

      setShouldRefetchCities(true); // Trigger refetching after adding
      console.log(data);
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function removeCity(cityId) {
    dispatch({ type: "loading" });
    try {
      // Change the HTTP method to DELETE for removal
      await fetch(`http://localhost:8230/cities/${cityId}`, {
        method: "DELETE",  // Correct method
      });

      dispatch({ type: "RemoveCity", payload: cityId });
      setShouldRefetchCities(true); 
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <CitiesContext.Provider value={{ ...state, createCity, removeCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
