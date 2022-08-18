import { AlertConstants } from './AlertConstants';

export const AlertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: AlertConstants.SUCCESS, message };
}

function error(message) {
    return { type: AlertConstants.ERROR, message };
}

function clear() {
    return { type: AlertConstants.CLEAR };
}