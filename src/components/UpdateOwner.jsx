import React, { useState } from 'react'
import SelectInput from './SelectInput'
import useCheckBoxStore from '../store/checkBoxStore';
import { multiUpdateOwner } from '../services/services';
import useTableStore from '../store/tableStore';

// owners list

const owner = [
  { value: "1775", text: "Test Internal" },
  { value: "1840", text: "Jisna Varghese" },
  { value: "12", text: "Vineeth Joseph" },
  { value: "1849", text: "Demo Test" },
  { value: "1903", text: "NoClinic ArManager" },
];


const UpdateOwner = () => {

  // actions and variables from store

  const selectedIds = useCheckBoxStore(state => state.selectedIds);
  const { results, setResults } = useTableStore();

  // state for handling selected owner

  const [selectedOwner, setSelectedOwner] = useState('');

  // function to call api for owner update

  const onUpdate = async () => {
    if (selectedIds.size === 0 || !selectedOwner) return;

    // Find owner details (id and name) from the owner list
    const ownerInfo = owner.find((o) => o.value === selectedOwner);
    if (!ownerInfo) return;

    // Convert Set to array and build the final payload
    const payload = Array.from(selectedIds).map((claimId) => ({
      claimId,
      owner: ownerInfo.text,
      ownerId: Number(ownerInfo.value), // convert to number if needed
      statusId: null,
    }));


    try {

      const res = await multiUpdateOwner(payload); // calling api


      // if success filter table

      if (res.data === "Claims updated") {
        const updatedResults = results.map((item) => {
          const match = payload.find((p) => p.claimId === item.claimId);
          if (match) {
            return {
              ...item,
              owner: match.owner,
              ownerId: match.ownerId,
              statusId: match.statusId,
            };
          }
          return item;
        });

        setResults({
          results: updatedResults,
          totalRecords: updatedResults.length,
          start: 0,
        });
      } else {
        console.log("Failed to update owner")
      }

    } catch (error) {
      console.log("error in update onwer:", error)
    }

  };




  return (
    <div className="p-4 border border-slate-300 rounded-md my-6 flex flex-row gap-4">

{/* Owner select select input */}

      <SelectInput
        datas={owner}
        label={"Owner"}
        valueKey={"value"}
        labelKey={"text"}
        select={"Select Owner"}
        value={selectedOwner}
        onChange={(e) => setSelectedOwner(e.target.value)}
      />

      {/* Button */}

      <button
        disabled={selectedIds.size === 0 || !selectedOwner}
        onClick={onUpdate}
        className={`px-6 py-2 rounded-md ${selectedIds.size === 0 || !selectedOwner
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary text-white'
          }`}
      >
        Update
      </button>
    </div>

  )
}

export default UpdateOwner