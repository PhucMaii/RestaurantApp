import { reduce } from 'lodash';

export const formatToTwoDecimalPlace = (num) => {
    if (typeof num === 'number') {
        return num.toFixed(2);
    }
    return 'N/A';
};

export const calculateTotalInObject = (array, field) => {
    return reduce(
        array,
        function (sum, item) {
            return sum + item[field];
        },
        0,
    );
};
