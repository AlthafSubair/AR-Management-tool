import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { getNotes } from "../services/services"

const NoteModal = ({ setOpen, open }) => {

    const [allNotes, setAllNotes] = useState([]);
    const [patientNotes, setPatientNote] = useState([])
    const [appNotes, setAppNote] = useState([])

    const [tab, setTab] = useState("all")

    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await getNotes(open);

                setAllNotes(res.data);

                setPatientNote(res.data.filter(note => note.isPatientNote === true));

                setAppNote(res.data.filter(note => note.isPatientNote === false));

            } catch (error) {
                console.error("Failed to fetch notes:", error);
            }
        };

        fetchData();
    }, [open]);





    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
            <div className="bg-white rounded-md shadow-lg max-w-6xl min-w-6xl flex flex-col p-6 overflow-y-scroll max-h-[80%] min-h-[80%]">
                <div className='flex flex-row justify-between'>
                    <h1 className='text-slate-950 text-xl font-semibold'>Notes</h1>

                    <div className="font-medium flex flex-row gap-6 ">
                        <button
                            onClick={() => setTab("all")}
                            className={`${tab === "all" ? "text-primary" : "text-gray-700"}`}
                        >
                            ALL
                        </button>
                        <button
                            onClick={() => setTab("appointment")}
                            className={`${tab === "appointment" ? "text-primary" : "text-gray-700"}`}
                        >
                            APPOINTMENT NOTES
                        </button>
                        <button
                            onClick={() => setTab("patient")}
                            className={`${tab === "patient" ? "text-primary" : "text-gray-700"}`}
                        >
                            PATIENT NOTES
                        </button>
                    </div>


                    <button className="text-600 rounded-full p-3 hover:bg-secondary" onClick={() => setOpen({ patientId: "", claimId: "" })}><X size={20} /></button>
                </div>

                {tab === "all" && <div className="flex flex-col m-12">
                    {allNotes.map((note, idx) => (
                        <div key={note?.date} className="block">
                            <h1 className="text-slate-900 font-medium">{note?.note}</h1>
                            {idx !== allNotes.length - 1 && <hr className="my-2 border-gray-300" />}
                        </div>
                    ))}
                </div>}

                {tab === "appointment" && <div className="flex flex-col m-12">
                    {appNotes.map((note, idx) => (
                        <div key={note?.date} className="block">
                            <h1 className="text-slate-900 font-medium">{note?.note}</h1>
                            {idx !== appNotes.length - 1 && <hr className="my-2 border-gray-300" />}
                        </div>
                    ))}
                </div>}

                {tab === "patient" && <div className="flex flex-col m-12">
                    {patientNotes.map((note, idx) => (
                        <div key={note?.date} className="block">
                            <h1 className="text-slate-900 font-medium">{note?.note}</h1>
                            {idx !== patientNotes.length - 1 && <hr className="my-2 border-gray-300" />}
                        </div>
                    ))}
                </div>}


            </div>
        </div>

    )
}

export default NoteModal