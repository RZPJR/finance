const state = {
    cash_receipt_list: {
        isLoading: false,
        data: [],
        filter:{
            search: '',
            region: '', //area
            site: '', //warehouse
            customer: '',
            date_type: 'Received Date',
            date_filter: {
                input : '',
                model : '',
                date : [],
            },
            status: 999,
        },
        table_headers: [
            {
                text: "Cash Receipt Code / Sales Invoice Code",
                width: "20%",
                class: "grey--text text--darken-4",
                sortable: false
            },
            {
                text: "Receipt Date",
                width: "10%",
                class: "grey--text text--darken-4",
                sortable: false
            },
            {
                text: "Delivery Date",
                width: "10%",
                class: "grey--text text--darken-4",
                sortable: false
            },
            {
                text: "Customer",
                width: "10%",
                class: "grey--text text--darken-4",
                sortable: false
            },
            {
                text: "Area",
                width: "10%",
                class: "grey--text text--darken-4",
                sortable: false
            },
            {
                text: "Image",
                width: "5%",
                class: "grey--text text--darken-4",
                sortable: false
            },
            {
                text: "Payment Amount",
                width: "10%",
                class: "grey--text text--darken-4",
                sortable: false
            },
            {
                text: "Paid Off",
                width: "5%",
                class: "grey--text text--darken-4",
                sortable: false
            },
            {
                text: "Status",
                width: "5%",
                class: "grey--text text--darken-4",
                sortable: false
            },
            {
                text: "",
                width: "5%",
                sortable: false
            },
        ],
        status_options: [
            {
                text:'All Status',
                value:999
            },
            {
                text:'Active',
                value:1
            },
            {
                text:'Archived',
                value:2
            }
        ],
        date_type_options: [
            {
                text: "Receipt Date",
                value: 1,
            },
            {
                text: "Invoice Date",
                value: 2,
            },
            {
                text: "Order Delivery Date",
                value: 3,
            },
            {
                text: "Received Date",
                value: 4,
            },
        ],
    },
};
  
export default state;
  