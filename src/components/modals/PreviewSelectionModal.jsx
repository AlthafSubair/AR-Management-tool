import { viewClaim } from "../../services/services";




const PreviewSelectionModal = ({ isPreview, setPreview, setPdfUrl }) => {

   

    const onPrimary = async (patientId, claimId) => {
        try {

            const res = await viewClaim({ patientId, claimId, rankType: "1" });
            const blob = new Blob([res], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
             setPdfUrl(url);

        } catch (error) {
            console.log("error in viewing primary")
        }
    }

    const onSecondary = async (patientId, claimId) => {
        try {

            const res = await viewClaim({ patientId, claimId, rankType: "2" });
            const blob = new Blob([res], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
             setPdfUrl(url);

        } catch (error) {
            console.log("error in viewing primary")
        }
    }

   


    return (
        <>
        <div className="absolute top-full left-0 mt-2 bg-white rounded shadow-lg z-50 w-32" onMouseLeave={() => setPreview({
            patientId: "",
            claimId: "",
            payerId: "",
            secondaryPayerId: ""
        })}>
            <button
                disabled={isPreview.payerId <= 0}
                onClick={() => onPrimary(isPreview.patientId, isPreview.claimId)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${isPreview.payerId <= 0 && "text-gray-500"}`}
            >
                Primary
            </button>
            <button
                disabled={isPreview.secondaryPayerId <= 0}
                 onClick={() => onSecondary(isPreview.patientId, isPreview.claimId)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${isPreview.secondaryPayerId <= 0 && "text-gray-500"}`}
            >
                Secondary
            </button>

        </div>



        </>
    );
};

export default PreviewSelectionModal;
