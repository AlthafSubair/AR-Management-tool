import { useState } from "react";
import SelectInput from "../SelectInput";
import useTableStore from "../../store/tableStore";
import { addLog } from "../../services/services";

const owner = [
  { value: "1775", text: "Test Internal" },
  { value: "1840", text: "Jisna Varghese" },
  { value: "12", text: "Vineeth Joseph" },
  { value: "1849", text: "Demo Test" },
  { value: "1903", text: "NoClinic ArManager" },
];

const Log = () => {
    const {result} = useTableStore();
  const [formData, setFormData] = useState({
    activityDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    notes: "",
    staffUserId: "", // Selected staff userId
    staffName: "",   // Selected staff name
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleOwnerChange = (e) => {
    const selected = owner.find((o) => o.value === e.target.value);
    handleChange("staffUserId", selected?.value);
    handleChange("staffName", selected?.text);
  };

  const handleSave = async() => {
    const payload = {
      staffProductivityCallerId: 0,
      staffProductivityOtherId: 0,
      typeId: 0,
      applicationId: 8,
      activityId: 0,
      activityDate: formData.activityDate,
      phoneNo: "",
      callRefNo: "",
      csrName: "",
      notes: formData.notes,
      dueDate: formData.dueDate,
      status: 0,
      result: 0,
      priorAuthNo: "",
      insuranceId: 0,
      staffUserId: parseInt(formData.staffUserId),
      staffName: formData.staffName,
      duration: 0,
      payorPortalId: 0,
      payorName: "",
      priorAuthId: 0,
      copay: "",
      coInsurance: "",
      outstandingDeductible: 0,
      patientBalance: 0,
      insuranceType: 0,
      patientId: 0,
      appointmentId: 0,
      medicalCodingId: 0,
      visitId: 0,
      claimId: result?.claimId || 0,
      taskId: 0,
    };

    console.log("Payload to submit:", payload);

    // Submit this payload via API here
    // e.g. await postLog(payload)

    try {

        const res = await addLog(payload)

        console.log(res)

        const [formData, setFormData] = useState({
    activityDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    notes: "",
    staffUserId: "", // Selected staff userId
    staffName: "",   // Selected staff name
  });
        
    } catch (error) {
        console.log("error in adding log")
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-md w-full p-4 flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-semibold text-slate-900 pl-4">Log</h1>
        <button
          onClick={handleSave}
          className="bg-primary text-white py-2 px-3 rounded-md font-semibold"
        >
          Save
        </button>
      </div>

      <div className="flex flex-row gap-8 p-4">
        <div className="relative w-40">
          <label
            htmlFor="activityDate"
            className="absolute -top-3 left-0 text-sm text-teal-600"
          >
            Date
          </label>

          <input
            type="date"
            value={formData.activityDate}
            onChange={(e) => handleChange("activityDate", e.target.value)}
            className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 leading-tight focus:outline-none uppercase"
          />
        </div>

        <div className="relative w-40">
          <label
            htmlFor="dueDate"
            className="absolute -top-3 left-0 text-sm text-teal-600"
          >
            Due Date
          </label>

          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 leading-tight focus:outline-none uppercase"
          />
        </div>

        <SelectInput
          datas={owner}
          label={"Owner"}
          valueKey={"value"}
          labelKey={"text"}
          select={"All Owner"}
          value={formData.staffUserId}
          onChange={handleOwnerChange}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center border-b border-primary py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Log;
