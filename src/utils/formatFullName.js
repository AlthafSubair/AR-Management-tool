
const formatFullName = (first, middle, last, maxLength = 10) => {
    const fullName = [first, middle, last].filter(Boolean).join(' ');
    return fullName.length > maxLength
        ? fullName.slice(0, maxLength).trim() + '…'
        : fullName;
};

export default formatFullName;