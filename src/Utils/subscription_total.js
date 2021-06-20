
const getTotal = (cloudStorage, isUpfront, unitPrice) => {
    let noDiscount = unitPrice * cloudStorage;
    let discount = unitPrice * cloudStorage * 0.01;
     if (isUpfront === 'No') {
         return noDiscount;
     }

     return noDiscount - discount;
};

export default getTotal;
