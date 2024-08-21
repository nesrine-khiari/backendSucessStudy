export const DateParser = (date_str) => {
    if (date_str) {
        const date = new Date(date_str);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}/${month}/${day}`;
    } else {
        return "not mentioned";
    }
};
