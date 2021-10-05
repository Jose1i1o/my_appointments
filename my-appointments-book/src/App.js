import { BiCalendarHeart } from "react-icons/bi"
import AddApointment from "./components/AddApointment";
import Search from "./components/Search";
import APPOINTMENTLIST from "./utils/data.json"
import AppointmentInfo from "./components/Appointmentinfo";


function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
    <h1 className="pb-8 text-5xl">
    <BiCalendarHeart className="inline-block text-red-400 align-top"/>Your Appointments
    </h1>
      <AddApointment className="" />
    <Search />
        <ul className="pt-2 divide-y divide-gray-200">
          {APPOINTMENTLIST.map((appointment) => (
            <AppointmentInfo key={appointment.id}
              appointment={appointment}
            />
          ))}
        </ul>
    </div>
  );
}

export default App;
