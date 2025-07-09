import { useEffect } from 'react'
import useFilterFormStore from '../store/filterFormStore';
import { getList } from "../services/services";
import useTableStore from '../store/tableStore';

const Table = () => {

    const { form } = useFilterFormStore();
      const {setResults, results} = useTableStore();

    useEffect(() => {

        const fetchList = async () => {
            try {
                const result = await getList(form);
                setResults(result.data)
            } catch (err) {
                console.log("error" + err)
            }
        };

        fetchList();
    }, []);

    console.log(results)


    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-500 uppercase bg-secondary">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                <tbody>
                  {
                    results.map((item, index) => (
                          
                    <tr className="bg-white border-b  border-gray-400 text-gray-800 hover:bg-gray-50" key={index}>
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>

                        <td className="px-6 py-4">
                            {item?.dos}
                        </td>

                        <td className="px-6 py-4">
                          {`${item?.patientFName} ${item?.patientMName} ${item?.patientLName} `}
                        </td>
                        
                         <td className="px-6 py-4">
                            {item?.patientDob}
                        </td>

                        <td className="px-6 py-4">
                            {item?.clinicName}
                        </td>

                          <td className="px-6 py-4">
                            {`${item?.providerFName} ${item?.providerMName} ${item?.providerLName} `}
                        </td>

                        <td className="px-6 py-4">
                            {item?.clinicId}
                        </td>

                          <td className="px-6 py-4">
                            {item?.payorName}
                        </td>

                        <td className="px-6 py-4">
                            date
                        </td>

                        <td className="px-6 py-4">
                            select owner
                        </td>

                        <td className="px-6 py-4">
                            {item?.status}
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


                        
                    </tr>
                    ))
                  }


                </tbody>
            </table>
        </div>


    )
}

export default Table