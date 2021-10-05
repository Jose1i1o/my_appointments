import { useState, useEffect, useCallback } from 'react';
import { BiCalendarHeart } from "react-icons/bi"
import Search from "./components/Search";
import AddApointment from "./components/AddApointment";
import AppointmentInfo from "./components/Appointmentinfo";



function App() {

  let [appointments, setAppointments] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("aptDate");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointments.filter(
    item => {
        return (
          item.petName.toLowerCase().includes(query.toLowerCase()) ||
          item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
          item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = orderBy === "asc" ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
       ? -order : order
    )}
  )

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
      <AddApointment className="" 
        onSendAppointment={meeting => setAppointments([...appointments, meeting])}
        lastId={appointments.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
      />
    <Search query={query} 
      onQueryChange={newQuery => setQuery(newQuery)}
      orderBy={orderBy}
      onOrderByChange={mySort => setOrderBy(mySort)}
      sortBy={sortBy}
      onSortByChange={mySort => setSortBy(mySort)}
      />
        <ul className="pt-2 divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => (
            <AppointmentInfo key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={
                appointmentId =>
                  setAppointments(
                    appointments.filter((appointment) => appointment.id !== appointmentId))
                }
            />
            ))
          }
      </ul>
    </div>
  );
}

export default App;
