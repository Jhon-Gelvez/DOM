<<<<<<< HEAD
export const setTextContent = (element, value) => {
    if (value === undefined) {
        return element.textContent;
    }
    element.textContent = value;
=======
export const setTextContent = (element, text) => {
    element.textContent = text;
>>>>>>> modularizacion-base
};
