
function formatDateForInput(dateStr) {
    if (!dateStr) return "";

    // If dateStr is already in YYYY-MM-DD, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return dateStr;
    }

    // Try parsing MM/DD/YYYY or other formats:
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        // If invalid date, return empty string
        return "";
    }

    // Format as YYYY-MM-DD with leading zeros
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
}

export default formatDateForInput;
