import { useEffect, useState } from "react";
import useSummaryStore from "../../store/summaryStore";
import useTableStore from "../../store/tableStore";
import formatFullName from "../../utils/formatFullName";
import formatPriceWithComma from "../../utils/formatPrice";
import { getLocations, updateClaim } from "../../services/services";
import SelectInput from "../SelectInput";
import formatDateForInput from "../../utils/formatDateForInput";

const ClaimSummary = () => {
    const { result } = useTableStore();
    const { details } = useSummaryStore();

    const [edit, setEdit] = useState(false);
    const [locations, setLocations] = useState([]);

    const [formData, setFormData] = useState({
        dos: details?.dos,
        location: result?.facilityId,
    });

    useEffect(() => {
        if (result) {
            setFormData({
                dos: result?.dos || "",
                location: result?.facilityId || "", // fallback if null
            });
        }
    }, [result]);



    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await getLocations(result?.clinicId);
                setLocations(res?.locationDtoList || []);
            } catch (error) {
                console.log("Error fetching locations:", error);
            }
        };

        if (result?.clinicId) {
            fetchDetails();
        }
    }, [result?.clinicId]);

    const handleSave = async () => {
        try {
            const selectedLocation = locations.find(
                (loc) => loc.id === formData.location
            );

            if (!selectedLocation) {
                console.error("Invalid location selected");
                return;
            }

            const payload = {
                claimId: result.claimId,
                clinicId: result.clinicId,
                locationId: selectedLocation.id,
                locationName: selectedLocation.locationName,
                dos: formData.dos,
                visitId: result.visitId,
            };

            console.log("Submitting payload:", payload);

            await updateClaim(result.claimId, payload);

            details.dos = formData.dos;
            result.facilityId = formData.location;

            // 👇 Optionally update result.locationName if shown elsewhere
            const updatedLoc = locations.find(loc => loc.id === formData.location);
            if (updatedLoc) result.locationName = updatedLoc.locationName;
            setEdit(false);
        } catch (error) {
            alert("Failed to update claim.");
            console.error(error);
        }
    };



    return (
        <div className="bg-white shadow-xl rounded-md w-full p-4 flex flex-col">
            <div className="flex flex-row justify-between">
                <h1 className="text-xl font-semibold text-slate-900 pl-4">
                    Claim Summary
                </h1>
                {edit ? (
                    <div className="flex flex-row gap-4">
                        <button
                            onClick={() => setEdit(false)}
                            className="bg-white text-primary border border-primary py-2 px-3 rounded-md font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-primary text-white py-2 px-3 rounded-md font-semibold"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setEdit(true)}
                        className="bg-primary text-white py-2 px-3 rounded-md font-semibold"
                    >
                        Edit
                    </button>
                )}
            </div>

            <div className="flex flex-row justify-between p-4">
                <div className="flex flex-col">
                    {edit ? (
                        <div className="relative w-40">
                            <label
                                htmlFor="date"
                                className="absolute -top-3 left-0 text-sm text-teal-600"
                            >
                                DOS Start
                            </label>

                            <input
                                type="date"
                                value={formatDateForInput(formData.dos)}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        dos: e.target.value,
                                    }))
                                }
                                className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 leading-tight focus:outline-none"
                            />
                        </div>
                    ) : (
                        <>
                            <h1 className="text-gray-600 text-sm">DOS</h1>
                            <h1 className="text-slate-800 font-medium">{formatDateForInput(details?.dos)}</h1>
                        </>
                    )}
                </div>

                <div className="flex flex-col">
                    <h1 className="text-gray-600 text-sm">Patient</h1>
                    <h1 className="text-slate-800 font-medium">
                        {formatFullName(
                            result?.patientFName,
                            result?.patientMName,
                            result?.patientLName
                        )}
                    </h1>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-gray-600 text-sm">Rendering</h1>
                    <h1 className="text-slate-800 font-medium">
                        {result?.renderingProviderName?.split(",").join(" ")}
                    </h1>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-gray-600 text-sm">Billing</h1>
                    <h1 className="text-slate-800 font-medium">
                        {formatFullName(
                            result?.providerFName,
                            result?.providerMName,
                            result?.providerLName
                        )}
                    </h1>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-gray-600 text-sm">Referring</h1>
                    <h1 className="text-slate-800 font-medium">
                        {result?.renderingProviderName?.split(",").join(" ")}
                    </h1>
                </div>
            </div>

            <div className="flex flex-row justify-between p-4">
                <div className="flex flex-col">
                    <h1 className="text-gray-600 text-sm">Service</h1>
                    <h1 className="text-slate-800 font-medium">
                        {result.appointmentType}
                    </h1>
                </div>

                <div className="flex flex-col">
                    {edit ? (
                        <SelectInput
                            datas={locations}
                            label="Location"
                            valueKey="id"
                            labelKey="locationName"
                            select="Select Location"
                            value={formData.location}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    location: parseInt(e.target.value),
                                }))
                            }
                        />
                    ) : (
                        <>
                            <h1 className="text-gray-600 text-sm">Location</h1>
                            <h1 className="text-slate-800 font-medium">
                                {locations.find((loc) => loc.id === result?.facilityId)
                                    ?.locationName ?? "N/A"}
                            </h1>
                        </>
                    )}
                </div>

                <div className="flex flex-col">
                    <h1 className="text-gray-600 text-sm">Status</h1>
                    <h1 className="text-slate-800 font-medium">{result?.status}</h1>
                </div>
            </div>

            <div className="flex flex-row justify-between p-4 flex-wrap gap-4">
                {[
                    ["Billed", details?.billed],
                    ["Pri Paid", details?.priPaid],
                    ["Sec Paid", details?.secPaid],
                    ["Pt Paid", details?.patPaid],
                    ["Adjusted", details?.adjustment],
                    ["Pri Bal", details?.priBal],
                    ["Sec Bal", details?.secBal],
                    ["Pt Bal", details?.patBal],
                ].map(([label, value]) => (
                    <div key={label} className="flex flex-col">
                        <h1 className="text-gray-600 text-sm">{label}</h1>
                        <h1 className="text-slate-800 font-medium">
                            {formatPriceWithComma(value)}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClaimSummary;
