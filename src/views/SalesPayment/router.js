export default [
    {
        path: '/finance/sales-payment',
        name: 'SalesPayment',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Sales Payment List'
        }
    },
    {
        path: '/finance/sales-payment/detail/:id',
        name: 'SalesPaymentDetail',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'Sales Payment Detail',
            breadcrumbs : [
                {
                    text: 'Sales Payment List',
                    to : '/finance/sales-payment'
                },
                {
                    text: 'Sales Payment Detail',
                },
            ],
        }
    },
]