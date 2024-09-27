export const stores = [
    {
        id: '1',
        name: 'ALDO Centre Eatons',
        address: '1007, 1009 Saint-Catherine St W #1007-1009, Montreal, Quebec H3B 1H1',
        location: {
            latitude: 45.50067114976815,
            longitude: -73.57270995311015
        },
    },
    {
        id: '2',
        name: 'ALDO Destiny USA Mall',
        address: '10317 Destiny USA Dr F-107, Syracuse, NY 13204, United States',
        location: {
            latitude: 43.067335268713954,
            longitude: -76.17087501561873
        },
    },
    {
        id: '3',
        name: 'ALDO Pheasant Lane Mall',
        address: '310 Daniel Webster Hwy W131, Nashua, NH 03060, United States',
        location: {
            latitude: 42.70142547490119,
            longitude: -71.43636802571147
        },
    },
    {
        id: '4',
        name: 'ALDO Holyoke Mall',
        address: '50 Holyoke St E363, Holyoke, MA 01040, United States',
        location: {
            latitude: 42.16794431930019,
            longitude: -72.64197914447713
        },
    },
    {
        id: '5',
        name: 'ALDO Maine Mall',
        address: '364 Maine Mall Rd N 157, South Portland, ME 04106, United States',
        location: {
            latitude: 43.6336571051641,
            longitude: -70.33445327327449
        },
    },
    {
        id: '6',
        name: 'ALDO Crossgates Mall',
        address: 'Crossgates Mall, 1 Crossgates Mall Rd D202, Albany, NY 12203, United States',
        location: {
            latitude: 42.68922592195915,
            longitude: -73.84896831562845
        },
    },
    {
        id: '7',
        name: 'ALDO Burlington Mall',
        address: '75 Middlesex Turnpike #1062, Burlington, MA 01803, United States',
        location: {
            latitude: 42.481338471184856,
            longitude: -71.21428054446906
        },
    },
    {
        id: '8',
        name: 'ALDO Solomon Pond Mall',
        address: '601 Donald Lynch Blvd S134, Marlborough, MA 01752, United States',
        location: {
            latitude: 42.35621143546647,
            longitude: -71.61300760214293
        },
    },
    {
        id: '9',
        name: 'ALDO Auburn Mall',
        address: '385 Southbridge St N 320, Auburn, MA 01501, United States',
        location: {
            latitude: 42.202627581242446,
            longitude: -71.83524614447626
        },
    },
    {
        id: '10',
        name: 'ALDO Waterloo Premium Outlets',
        address: '655 NY-318, Waterloo, NY 13165, United States',
        location: {
            latitude: 42.956392447843,
            longitude: -76.92101069416539
        },
    },
];

export const getStoresByID = (id: string) => {
    return {
        store: {
            id: id,
            address: "test address",
            timeZone: "America/New_York",
            salesData: {
                tenDays: [
                    {
                        date: ((d => new Date(d.setDate(d.getDate())))(new Date())).toString(),
                        sales: [1000.15, 1200.15, 1010.15, 1300.15, 2000.15, 1300.15, 1600.15, 1500.15, 1700.15, 1200.15][Number(id) - 1]
                    },
                    {
                        date: ((d => new Date(d.setDate(d.getDate() - 1)))(new Date())).toString(),
                        sales: [1300.15, 1300.15, 1310.15, 1320.15, 2100.15, 1400.15, 1600.15, 1400.15, 1400.15, 1300.15][Number(id) - 1]
                    },
                    {
                        date: ((d => new Date(d.setDate(d.getDate() - 2)))(new Date())).toString(),
                        sales: [1400.15, 1400.15, 1210.15, 1400.15, 2200.15, 1600.15, 1600.15, 1500.15, 1500.15, 1400.15][Number(id) - 1]
                    },
                    {
                        date: ((d => new Date(d.setDate(d.getDate() - 3)))(new Date())).toString(),
                        sales: [1300.15, 1300.15, 1110.15, 1500.15, 2200.15, 1700.15, 1600.15, 1300.15, 1200.15, 1300.15][Number(id) - 1]
                    },
                    {
                        date: ((d => new Date(d.setDate(d.getDate() - 4)))(new Date())).toString(),
                        sales: [1200.15, 1300.15, 1010.15, 1340.15, 2200.15, 1600.15, 1600.15, 1500.15, 1600.15, 1400.15][Number(id) - 1]
                    },
                    {
                        date: ((d => new Date(d.setDate(d.getDate() - 5)))(new Date())).toString(),
                        sales: [1010.15, 1200.15, 1310.15, 1350.15, 2300.15, 1630.15, 1600.15, 1200.15, 1400.15, 1100.15][Number(id) - 1]
                    },
                    {
                        date: ((d => new Date(d.setDate(d.getDate() - 6)))(new Date())).toString(),
                        sales: [1300.15, 1500.15, 1410.15, 1600.15, 2400.15, 1700.15, 1600.15, 1500.15, 1600.15, 1200.15][Number(id) - 1]
                    },
                    {
                        date: ((d => new Date(d.setDate(d.getDate() - 7)))(new Date())).toString(),
                        sales: [1400.15, 1600.15, 1210.15, 1500.15, 2020.15, 1800.15, 1600.15, 1400.15, 1500.15, 1600.15][Number(id) - 1]
                    },
                    {
                        date: ((d => new Date(d.setDate(d.getDate() - 8)))(new Date())).toString(),
                        sales: [1500.15, 1500.15, 1110.15, 1400.15, 2040.15, 1400.15, 1600.15, 1600.15, 1200.15, 1500.15][Number(id) - 1]
                    },
                    {
                        date: ((d => new Date(d.setDate(d.getDate() - 9)))(new Date())).toString(),
                        sales: [1300.15, 1400.15, 1010.15, 1500.15, 2200.15, 1300.15, 1600.15, 1400.15, 1500.15, 1200.15][Number(id) - 1]
                    },
                ],
            },
            recentSales: [
                {
                    id: "1",
                    date: new Date().toLocaleString(),
                    model: "ADERI",
                    price: 100.15,
                    paymentMethod: "Visa",
                },
                {
                    id: "2",
                    date: new Date().toLocaleString(),
                    model: "MIRIRA",
                    price: 110.15,
                    paymentMethod: "Debit",
                },
                {
                    id: "3",
                    date: new Date().toLocaleString(),
                    model: "SODANO",
                    price: 100.15,
                    paymentMethod: "Mastercard",
                },
                {
                    id: "4",
                    date: new Date().toLocaleString(),
                    model: "WUMA",
                    price: 105.15,
                    paymentMethod: "Visa",
                },
                {
                    id: "5",
                    date: new Date().toLocaleString(),
                    model: "BEODA",
                    price: 80.15,
                    paymentMethod: "Visa",
                },
            ],
            inventory: [
                { "model": "ADERI", "quantity": [90, 65, 45, 34, 54, 34, 25, 64, 50, 45][Number(id) - 1] },
                { "model": "MIRIRA", "quantity": [54, 63, 63, 46, 54, 63, 26, 76, 65, 34][Number(id) - 1] },
                { "model": "CAELAN", "quantity": [65, 45, 65, 45, 36, 56, 87, 45, 65, 34][Number(id) - 1] },
                { "model": "BUTAUD", "quantity": [72, 73, 84, 95, 63, 84, 63, 52, 47, 67][Number(id) - 1] },
                { "model": "SCHOOLER", "quantity": [61, 63, 73, 84, 95, 26, 38, 45, 54, 54][Number(id) - 1] },
                { "model": "SODANO", "quantity": [54, 67, 45, 43, 75, 87, 65, 45, 43, 65][Number(id) - 1] },
                { "model": "MCTYRE", "quantity": [89, 87, 67, 56, 54, 43, 32, 43, 45, 65][Number(id) - 1] },
                { "model": "CADAUDIA", "quantity": [87, 39, 876, 65, 54, 34, 54, 65, 67, 78][Number(id) - 1] },
                { "model": "RASIEN", "quantity": [62, 37, 84, 37, 26, 37, 48, 95, 58, 47, 36][Number(id) - 1] },
                { "model": "WUMA", "quantity": [21, 32, 34, 45, 56, 67, 78, 89, 67, 56][Number(id) - 1] },
                { "model": "GRELIDIEN", "quantity": [12, 23, 12, 32, 54, 65, 67, 54, 34, 45][Number(id) - 1] },
                { "model": "CADEVEN", "quantity": [87, 67, 56, 45, 34, 56, 67, 64, 35, 72][Number(id) - 1] },
                { "model": "SEVIDE", "quantity": [27, 38, 27, 26, 37, 58, 54, 76, 37, 65][Number(id) - 1] },
                { "model": "ELOILLAN", "quantity": [54, 65, 76, 54, 65, 76, 65, 54, 43, 23][Number(id) - 1] },
                { "model": "BEODA", "quantity": [87, 65, 54, 43, 65, 87, 56, 43, 65, 76][Number(id) - 1] },
                { "model": "VENDOGNUS", "quantity": [86, 85, 64, 35, 75, 35, 46, 75, 35, 57][Number(id) - 1] },
                { "model": "ABOEN", "quantity": [90, 54, 56, 76, 97, 45, 46, 34, 65, 76][Number(id) - 1] },
                { "model": "ALALIWEN", "quantity": [23, 44, 54, 76, 46, 75, 35, 45, 63, 23][Number(id) - 1] },
                { "model": "GREG", "quantity": [54, 34, 23, 63, 56, 43, 54, 23, 54, 76][Number(id) - 1] },
                { "model": "BOZZA", "quantity": [32, 43, 54, 35, 54, 45, 23, 54, 76, 45][Number(id) - 1] },
            ],
        }
    };
}
// ['ADERI', 'MIRIRA', 'CAELAN', 'BUTAUD', 'SCHOOLER', 'SODANO', 'MCTYRE', 'CADAUDIA', 'RASIEN', 'WUMA', 'GRELIDIEN', 'CADEVEN', 'SEVIDE', 'ELOILLAN', 'BEODA', 'VENDOGNUS', 'ABOEN', 'ALALIWEN', 'GREG', 'BOZZA' ]