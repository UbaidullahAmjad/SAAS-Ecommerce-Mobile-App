import { product1, product4, product11 } from '@common';
import DummyAddress from '@component/items/DummyAddress';

const OrdersDummy = [
    { id: "1", orderid: "111", image: product1, name: 'Party Wear Shoes', price: '$450', orderDate: '10 Oct 2021', orderQty: 1, tax: '$10', discount: "$50", grand_total: "$410", orderStatus: 'Completed', deliveryAddress: DummyAddress[0] },
    { id: "2", orderid: "707", image: product4, name: 'Men Shirt', price: '$200', orderDate: '25 Oct 2021', orderQty: 1, tax: '$20', discount: "$70", grand_total: "$150", orderStatus: 'Shipped', deliveryAddress: DummyAddress[1] },
    { id: "3", orderid: "1116", image: product11, name: 'Essential Cap Blue', price: '$120', orderDate: '10 Nov 2021', orderQty: 1, tax: '$0', discount: "$0", grand_total: "$120", orderStatus: "Pending", deliveryAddress: DummyAddress[0] },
];

export default OrdersDummy;
