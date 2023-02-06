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
]