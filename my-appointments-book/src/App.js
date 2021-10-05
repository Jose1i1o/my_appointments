import { useState, useEffect, useCallback } from 'react';
import { BiCalendarHeart } from "react-icons/bi"
import Search from "./components/Search";
import AddApointment from "./components/AddApointment";
import AppointmentInfo from "./components/Appointmentinfo";



function App() {

  let [appointments, setAppointments] = useState([]);

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then(response => response.json())
      .then(data => { 
        setAppointments(data)
    });
}, [])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div className="App container mx-auto mt-3 font-thin">
    <h1 className="pb-8 text-5xl">
    <BiCalendarHeart className="inline-block text-red-400 align-top"/>Your Appointments
    </h1>
      <AddApointment className="" />
    <Search />
        <ul className="pt-2 divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <AppointmentInfo key={appointment.id}
              appointment={appointment}
            />
          ))}
        </ul>
    </div>
  );
}

export default App;
