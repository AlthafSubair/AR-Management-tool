import { ChevronDown } from 'lucide-react';


const SelectInput = ({ datas, label, valueKey, labelKey, select, value, onChange }) => {
  return (
    <div className="relative w-28">
      <label
        htmlFor="select"
        className="absolute -top-3 left-0 text-sm text-teal-600"
      >
        {label}
      </label>

      <select
        value={value ?? ""}
        onChange={onChange}
        className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 pr-8 leading-tight focus:outline-none"
      >
        <option value="">{select}</option>

        {datas.map((data) => (
          <option key={data[valueKey]} value={data[valueKey]}>
            {data[labelKey]}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
        <ChevronDown size={20} />
      </div>
    </div>
  );
};

export default SelectInput;
