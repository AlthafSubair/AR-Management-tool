import { useEffect, useState } from 'react'
import useFilterFormStore from '../store/filterFormStore';
import { getList, multiUpdateOwner } from "../services/services";
import useTableStore from '../store/tableStore';
import useCheckboxStore from '../store/checkBoxStore';
import { ChevronDown, PencilIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import formatFullName from '../utils/formatFullName';
import formatDateForInput from '../utils/formatDateForInput';

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
    const { setResults, results } = useTableStore();
    const selectedIds = useCheckboxStore(state => state.selectedIds);
    const toggleId = useCheckboxStore(state => state.toggleId);
    const selectAll = useCheckboxStore(state => state.selectAll);
    const clearAll = useCheckboxStore(state => state.clearAll);

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

    console.log(results)

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                {/* Table Heading */}

                <thead className="text-xs text-gray-500 uppercase bg-secondary">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                {/* checkbox for selecting all rows */}
                                <input id="checkbox-all-search"
                                    onChange={handleSelectAll}
                                    checked={results.length > 0 && selectedIds.size === results.length}
                                    indeterminate={selectedIds.size > 0 && selectedIds.size < results.length}
                                    type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            DOS
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Patient Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            DOB
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Clinic Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Provider
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Payor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Due Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Owner
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Billed
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Paid
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Balance
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>

                    </tr>
                </thead>

                {/* Table Body */}

                <tbody>
                    {/* looping through data */}
                    {
                        results.map((item, index) => (

                            <tr className="bg-white border-b  border-gray-400 text-gray-800 hover:bg-gray-50" key={index}>
                                <td className="w-4 p-4">
                                    <div className="flex items-center">

                                        {/* checkbox for individually select rows */}

                                        <input
                                            checked={selectedIds.has(item.claimId)}
                                            onChange={() => toggleId(item.claimId)}
                                            iid={`checkbox-${item.claimId}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>

                                {/* table data`s */}

                                <td className="px-6 py-4">
                                    {item?.dos}
                                </td>

                                <td className="px-6 py-4">
                                    {formatFullName(item?.patientFName, item?.patientMName, item?.patientLName)}

                                </td>

                                <td className="px-6 py-4">
                                    {item?.patientDob}
                                </td>

                                <td className="px-6 py-4">
                                    {`${item?.clinicName.slice(0, 10)}...`}
                                </td>

                                <td className="px-6 py-4">
                                    {formatFullName(item?.providerFName, item?.providerMName, item?.providerLName)}
                                </td>

                                <td className="px-6 py-4">
                                    {`${item?.appointmentType.slice(0, 10)}...`}
                                </td>

                                <td className="px-6 py-4">
                                    {`${item?.payorName.slice(0, 10)}...`}
                                </td>

                                <td className="px-6 py-4">
                                    <input
                                        type="date"
                                        value={formatDateForInput(item?.dueDate) || ''}
                                        onChange={(e) => handleDueDateChange(item.claimId, e.target.value)}
                                        className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 leading-tight focus:outline-none uppercase" />
                                </td>

                                <td className="px-6 py-4">
                                    <div className="relative w-28">

                                        {/* Select for owner update */}
                                        <select
                                            value={item?.ownerId ?? " "}
                                            onChange={(e) => handleOwnerUpdate(e.target.value, item.claimId)}
                                            className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 pr-8 leading-tight focus:outline-none"
                                        >


                                            {
                                                owner.map((o) => (
                                                    <option key={o.value} value={o.value}>
                                                        {o.text}
                                                    </option>
                                                ))
                                            }


                                        </select>

                                        <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                            <ChevronDown size={20} />
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    {`${item?.status.slice(0, 10)}...`}
                                </td>

                                <td className="px-6 py-4">
                                    ${item?.billed}
                                </td>

                                <td className="px-6 py-4">
                                    ${item?.paid}
                                </td>

                                <td className="px-6 py-4">
                                    ${item?.balance}
                                </td>

                                {/* Action buttons */}
                                <td className="px-6 py-6 gap-4 text-primary flex">
                                    <button onClick={() => setOpen({ patientId: item?.patientId, claimId: item?.claimId })} className='underline'>Notes</button>
                                    <button className='underline'>Preview</button>
                                    <button onClick={() => setEob(item?.claimId)} className='underline'>Eob</button>
                                    <Link to='/edit' ><PencilIcon size={20} /></Link>
                                </td>



                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>


    )
}

export default Table