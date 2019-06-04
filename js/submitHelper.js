import { setLoading } from './setLoading';

const hirePlan = ({desc, price, size}) => {

    setLoading();

    if(desc) {
        document.getElementById('description').value = desc;
    }

    if(price) {
        document.getElementById('price').value = price;
    }

    if(size) {
        document.getElementById('sizeCheckout').value = size;
    }

    document.getElementById('hirePlan').submit();
}

export {
    hirePlan
};