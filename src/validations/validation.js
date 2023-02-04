const isValidName = function (value) {
    if (typeof value === "undefined" || value === null || value == " ")
        return false;
    if (typeof value === "string" && value.trim().length > 0 && value.match(/^[a-zA-Z]*$/))
        return true;
    return false;
}

const isValidPhone = function (value) {
    return (/^[\s]*[6-9]\d{9}[\s]*$/gi).test(value)


}
const isValidPass = function (value) {
    if (value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/))
        return true
    return false

}

module.exports = { isValidName, isValidPhone, isValidPass }