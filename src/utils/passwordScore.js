const commonPasswords = [
    'admin',
    'administrator',
    'password',
    'qwerty',
    'welcome',
    'letmein',
    'parola',
];

const sequential = /(0123|1234|2345|3456|4567|5678|6789|7890|abcd|bcde|cdef|defg|qwer|asdf|zxcv)/iu;
const repeated = /(.)\1{2,}/u;
const clamp = value => Math.min(Math.max(value, 0), 5);

const variety = password => [
    /[a-z]/u,
    /[A-Z]/u,
    /\d/u,
    /[^A-Za-z0-9]/u,
].filter(pattern => pattern.test(password)).length;

const penalties = (password, normalized) => [
    commonPasswords.includes(normalized),
    sequential.test(password),
    repeated.test(password),
].filter(Boolean).length;

export default password => {
    if (!password) {
        return 0;
    }

    const normalized = password.toLowerCase();
    const longEnough = password.length >= 8;
    const classes = variety(password);

    const value = [
        longEnough,
        password.length >= 12,
        password.length >= 16,
        longEnough && classes >= 3,
        longEnough && classes >= 4,
    ].filter(Boolean).length;

    return clamp(value - penalties(password, normalized));
};
