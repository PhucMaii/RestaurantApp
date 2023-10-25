import useLocalStorage from '../../hooks/useLocalStorage';

export const isAuthenticated = () => {
    const [currentCustomer, _setCurrentCustomer] = useLocalStorage(
        'current-customer',
        {},
    );
    const isAuthenticated = currentCustomer;
    // isAuthenticated returns an empty object if user signed out => errors, need to check size of that object as well
    return isAuthenticated && Object.keys(isAuthenticated).length > 0
        ? true
        : false;
};
