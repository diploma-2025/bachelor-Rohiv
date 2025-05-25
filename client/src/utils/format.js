export const fullNameValidator = (name) => {
    return !/^[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+$/u.test(name)
}

export const phoneValidator = (phone) => {
    return !/^0[5-9][0-9]{8}$/.test(phone)
}

export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    const cleaned = String(phoneNumber).replace(/\D/g, '');
    if (cleaned.length === 10) {
        const p1 = cleaned.substring(0, 3);
        const p2 = cleaned.substring(3, 6);
        const p3 = cleaned.substring(6, 8);
        const p4 = cleaned.substring(8, 10);
        return `+38 (${p1}) ${p2} ${p3} ${p4}`;
    }
    return phoneNumber;
}

export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return dateString;
    }
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat('uk-UA', options);
    return formatter.format(date);
}
