import { X } from "lucide-react";


const PdfModal = ({ url, onClose }) => {
  if (!url) return null;

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50">
      <div className="bg-white w-4/5 h-4/5 rounded shadow-lg relative py-12">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 rounded-full px-2 py-2 hover:bg-secondary"
        >
          <X size={20} className="text-gray-600"/>
        </button>

        <iframe
          src={url}
          title="PDF Preview"
          className="w-full h-full mt-1"
        ></iframe>
      </div>
    </div>
  );
};

export default PdfModal;
