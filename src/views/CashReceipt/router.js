export default [
    {
        path: '/finance/cash-receipt',
        name: 'CashReceipt',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Cash Receipt List'
        }
    },
]