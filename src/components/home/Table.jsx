import { useEffect, useState } from 'react'
import useFilterFormStore from '../../store/filterFormStore';
import { getList, multiUpdateOwner } from "../../services/services";
import useTableStore from '../../store/tableStore';
import useCheckboxStore from '../../store/checkBoxStore';
import { ChevronDown, PencilIcon } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';
import formatFullName from '../../utils/formatFullName';
import formatDateForInput from '../../utils/formatDateForInput';
import PreviewSelectionModal from '../modals/PreviewSelectionModal';
import PdfModal from '../modals/PdfModal';
import formatPriceWithComma from '../../utils/formatPrice';


// owners list

const owner = [
    { value: "0", text: "Unassigned" },
    { value: "1775", text: "Test Internal" },
    { value: "1840", text: "Jisna Varghese" },
    { value: "12", text: "Vineeth Joseph" },
    { value: "1849", text: "Demo Test" },
    { value: "1903", text: "NoClinic ArManager" },
];

const Table = ({setOpen, setEob}) => {

    // actions and variables from store

    const { form } = useFilterFormStore();
    const { setResults, results, setResult } = useTableStore();
    const selectedIds = useCheckboxStore(state => state.selectedIds);
    const toggleId = useCheckboxStore(state => state.toggleId);
    const selectAll = useCheckboxStore(state => state.selectAll);
    const clearAll = useCheckboxStore(state => state.clearAll);

    const [isPreview, setPreview] = useState({
        patientId: "",
        claimId: "",
        payerId: "",
        secondaryPayerId: ""
    })
     const [pdfUrl, setPdfUrl] = useState(null);

    // useeffect for fecthing data usings todays date on intial load

    useEffect(() => {
        const fetchList = async () => {
            try {
                const result = await getList(form);  // calling api service
                setResults(result.data) // storing result in store
            } catch (err) {
                console.log("error" + err)
            }
        };
        fetchList();
    }, []);

    // Handle "select all" checkbox

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = results.map(item => item.claimId); // assuming each item has a unique 'id'
            selectAll(allIds);
        } else {
            clearAll();
        }
    };

    // handling table inline select owner update 

    const handleOwnerUpdate = async (ownerId, claimId) => {
        try {

            // finding owner details using owner id

            const ownerInfo = owner.find(o => o.value === ownerId);

            // data to send to server

            const payload = [{
                claimId: claimId,
                owner: ownerInfo.text,
                ownerId: ownerId
            }]

            const res = await multiUpdateOwner(payload); // calling api service

            // if success filtering table and upadte changes

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
            console.log("error in updating owner: ", error)
        }
    }




    // handling table inline due date setting

    const handleDueDateChange = async (claimId, newDate) => {
        try {

            // data to send to the server

            const payload = [{
                claimId: claimId,
                dueDate: newDate,
            }];

            const res = await multiUpdateOwner(payload); // calling api service

            // if success upadte changes in ui

            if (res.data === "Claims updated") {
                const updatedResults = results.map((item) =>
                    item.claimId === claimId ? { ...item, dueDate: newDate } : item
                );

                setResults({
                    results: updatedResults,
                    totalRecords: updatedResults.length,
                    start: 0,
                });
            } else {
                console.log("Failed to update due date");
            }
        } catch (error) {
            console.log("error in updating due date: ", error);
        }
    };

       const closeModal = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl); // free memory
      setPdfUrl(null);
    }
  };

//   setting edit claim

const navigate = useNavigate();

const onEdit = (claimId) => {
    setResult(claimId);
    navigate('/edit')
}

    return (
      <div className="relative overflow-x-auto" >
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    {/* Table Heading */}
    <thead className="text-xs text-gray-500 uppercase bg-secondary">
      <tr>
        <th className="px-2 py-3">
          <div className="flex items-center">
            <input
              id="checkbox-all-search"
              onChange={handleSelectAll}
              checked={results.length > 0 && selectedIds.size === results.length}
              indeterminate={selectedIds.size > 0 && selectedIds.size < results.length}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
          </div>
        </th>
        <th className="px-4 py-1.5">DOS</th>
        <th className="px-4 py-1.5">Patient Name</th>
        <th className="px-4 py-1.5">DOB</th>
        <th className="px-4 py-1.5">Clinic Name</th>
        <th className="px-4 py-1.5">Provider</th>
        <th className="px-4 py-1.5">Type</th>
        <th className="px-4 py-1.5">Payor</th>
        <th className="px-4 py-1.5">Due Date</th>
        <th className="px-4 py-1.5">Owner</th>
        <th className="px-4 py-1.5">Status</th>
        <th className="px-4 py-1.5">Billed</th>
        <th className="px-4 py-1.5">Paid</th>
        <th className="px-4 py-1.5">Balance</th>
        <th className="px-4 py-1.5">Actions</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {results.map((item, index) => (
        <tr className="bg-white border-b border-gray-300 text-gray-800 hover:bg-gray-50 font-medium text-[15px]" key={index}>
          <td className="px-2 py-2">
            <div className="flex items-center">
              <input
                checked={selectedIds.has(item.claimId)}
                onChange={() => toggleId(item.claimId)}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="sr-only">checkbox</label>
            </div>
          </td>

          <td className="px-4 py-2">{item?.dos}</td>

          <td className="px-4 py-2">
            {formatFullName(item?.patientFName, item?.patientMName, item?.patientLName)}
          </td>

          <td className="px-4 py-2">{item?.patientDob}</td>

          <td className="px-4 py-2">{`${item?.clinicName?.slice(0, 10)}...`}</td>

          <td className="px-4 py-2">
            {formatFullName(item?.providerFName, item?.providerMName, item?.providerLName)}
          </td>

          <td className="px-4 py-2">{`${item?.appointmentType?.slice(0, 10)}...`}</td>

          <td className="px-4 py-2">{`${item?.payorName?.slice(0, 10)}...`}</td>

          <td className="px-4 py-2">
            <input
              type="date"
              value={formatDateForInput(item?.dueDate) || ''}
              onChange={(e) => handleDueDateChange(item.claimId, e.target.value)}
              className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 text-sm leading-tight focus:outline-none uppercase"
            />
          </td>

          <td className="px-4 py-2">
            <div className="relative w-28">
              <select
                value={item?.ownerId ?? " "}
                onChange={(e) => handleOwnerUpdate(e.target.value, item.claimId)}
                className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 text-sm pr-6 leading-tight focus:outline-none"
              >
                {owner.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.text}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <ChevronDown size={20} />
              </div>
            </div>
          </td>

          <td className="px-4 py-2">{`${item?.status?.slice(0, 10)}...`}</td>
          <td className="px-4 py-2">${formatPriceWithComma(item?.billed)}</td>
          <td className="px-4 py-2">${formatPriceWithComma(item?.paid)}</td>
          <td className="px-4 py-2">${formatPriceWithComma(item?.balance)}</td>

          <td className="px-4 py-2 gap-4 text-primary flex font-medium text-[15px] relative">
            <button onClick={() => setOpen({ patientId: item?.patientId, claimId: item?.claimId })} className="underline cursor-pointer">Notes</button>
           <button
  disabled={item.statusId === 1}
  onClick={() => setPreview({patientId: item.patientId, claimId: item?.claimId, payerId: item?.payerId, secondaryPayerId: item?.secondaryPayerId})}
  className={`${
    item.statusId !== 1 ? "text-primary cursor-pointer" : "text-gray-400 cursor-not-allowed"
  } underline`}
>
  Preview
</button>

{
    isPreview.claimId === item?.claimId && <PreviewSelectionModal isPreview={isPreview} setPreview={setPreview} setPdfUrl={setPdfUrl}/>
}

            <button onClick={() => setEob(item?.claimId)} className="underline">Eob</button>

            <button onClick={() => onEdit(item?.claimId)}><PencilIcon size={16} /></button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>


{pdfUrl && <PdfModal url={pdfUrl} onClose={closeModal} />}

</div>



    )
}

export default Table