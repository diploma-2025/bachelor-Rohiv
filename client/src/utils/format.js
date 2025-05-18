export const fullNameValidator = (name) => {
    return !/^[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+$/u.test(name)
}

export const phoneValidator = (phone) => {
    return !/^0[5-9][0-9]{8}$/.test(phone)
}