<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                name="search"
                                v-model="filter.search"
                                prepend-inner-icon="search"
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                outlined
                                dense
                                filled
                                data-unq="cashReceipt-input-search"
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code, name, phone number</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="showFilter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-if="showFilter"
                        class="no-caps fs12"
                        data-unq="cashReceipt-button-filterExpandLess"
                    >
                        Hide
                        <v-icon right>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-else
                        class="no-caps fs12"
                        data-unq="cashReceipt-button-filterExpandMore"
                    >
                        Show<v-icon right>mdi-chevron-down</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if='showFilter'>
                <v-col cols="12" md="3">
                    <SelectArea
                        v-model="filter.region"
                        :norequired="true"
                        :aux_data="2"
                        :label="'Region'"
                        :dense="true"
                        @selected="regionSelected"
                        data-unq="cashReceipt-select-region"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectWarehouse
                        :norequired="true"
                        :aux_data="2"
                        :dense="true"
                        @selected="siteSelected"
                        :label="'Site'"
                        data-unq="cashReceipt-select-site"
                    ></SelectWarehouse>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectMerchant
                        :norequired="true"
                        @selected="customerSelected"
                        :label="'Customer'"
                        :dense="true"
                        data-unq="cashReceipt-select-customer"
                    ></SelectMerchant>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="filter.date_type"
                        :items="date_type_options"
                        item-text="text"
                        item-value="text"
                        label="Date Type"
                        data-unq="cashReceipt-select-dateType"
                        dense
                        outlined
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <v-menu
                        ref="menu"
                        v-model="filter.date_filter.model"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on: tooltip }">
                                        <div v-on="{ ...tooltip}">
                                            <v-text-field
                                                prepend-inner-icon="mdi-calendar"
                                                outlined
                                                clearable
                                                maxlength="24"
                                                @click:clear="filter.date_filter.date = [],filter.date_filter.input =''"
                                                v-model="filter.date_filter.input"
                                                dense
                                            >
                                                <template v-slot:label>
                                                    {{filter.date_type}}
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </template>
                                <span>Invoice Date</span>
                                </v-tooltip>
                            </div>
                        </template>
                        <v-date-picker
                            range
                            v-model="filter.date_filter.date"
                            data-unq="cashReceipt-datePicker-dateFilter"
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="filter.date_filter.model = false"
                            >OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6" md="3" class="-mt24">
                    <v-select
                        v-model="filter.status"
                        :items="status_options"
                        item-text="text"
                        item-value="value"
                        label="Status"
                        data-unq="cashReceipt-select-status"
                        dense
                        outlined
                    ></v-select>
                </v-col>
            </v-row>
        </div>        
        <div class="box-title">
            <v-row>
                <v-col class="right">
                    <v-btn
                        name="create_bulk_receipt"
                        depressed
                        color="#50ABA3"
                        class="no-caps bold mr-4"
                        @click="nextMethod()"
                        data-unq="cashReceipt-button-createActiveReceipt"
                    >
                        <span class="text-white">Create Active Receipt</span>
                    </v-btn>
                    <v-btn
                        name="create_bulk_receipt"
                        depressed
                        color="#50ABA3"
                        class="no-caps bold"
                        @click="confirmReceiptDialog = true"
                        data-unq="cashReceipt-button-confirmReceipt"
                    >
                        <span class="text-white">Confirm Receipt</span>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="cash_receipt.table_headers"
                :items="cash_receipt.data"
                :loading="cash_receipt.isLoading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr class="h48">
                        <td>
                            <span v-if="props.item.code">{{props.item.code}}</span>
                            <span v-else>-</span>
                            /
                            <span v-if="props.item.sales_invoice.code">{{ props.item.sales_invoice.code }}</span>
                            <span v-else>-</span>
                        </td>
                        <td>
                            <span v-if="props.item.recognition_date">
                                {{formatDate(props.item.recognition_date)}}
                            </span>
                            <span class="text-black60" v-else>-</span>
                            /
                            <span
                                class="text-black60"
                                v-if="props.item.received_date"
                            >
                                {{ formatDate(props.item.received_date) }}
                            </span>
                            <span class="text-black60" v-else>-</span>
                        </td>
                        <td>{{ formatDate(props.item.sales_invoice.sales_order.delivery_date)}}</td>
                        <td>
                            <span
                                v-if="props.item.sales_invoice.sales_order.branch.merchant.customer_group == 1"
                            >
                                {{ props.item.sales_invoice.sales_order.branch.merchant.name }}
                                <br />
                                <label class="text-black60">
                                    {{ props.item.sales_invoice.sales_order.branch.name }}
                                </label>
                            </span>
                            <span v-else>{{ props.item.sales_invoice.sales_order.branch.merchant.name }}</span>
                        </td>
                        <td>
                            <span>{{ props.item.sales_invoice.sales_order.area.name }}</span>
                            /
                            <span 
                                v-if="props.item.sales_invoice.sales_order.warehouse.name"
                            >
                                {{ props.item.sales_invoice.sales_order.warehouse.name }}
                            </span>
                            <span v-else>-</span>
                        </td>
                        <td>
                            <span v-if="props.item.image_url" class="primary-color" @click="popupImage = true, selectImage(props.index)" data-unq="cashReceipt-button-transferProof">Transfer Proof</span>
                            <span v-else>-</span>
                        </td>
                        <td>
                            <v-row>Rp{{ formatPrice(props.item.amount) }}</v-row>
                            <v-row>{{ props.item.payment_method.name }}</v-row>
                        </td>
                        <td>{{ props.item.paid_off === 1 ? 'Paid Off' : '-' }}</td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                    :text-color="statusMasterText('active')"
                                >
                                    <span class="pa-md-2">Active</span>
                                </v-chip>
                            </div>
                            <div v-else-if="props.item.status == 2">
                                <v-chip
                                    :color="statusMaster('finished')"
                                    :text-color="statusMasterText('finished')"
                                >
                                    <span class="pa-md-2">Finished</span>
                                </v-chip>
                            </div>
                            <div v-else-if="props.item.status == 3">
                                <v-chip
                                    :color="statusMaster('cancelled')"
                                    :text-color="statusMasterText('cancelled')"
                                >
                                    <span class="pa-md-2">Cancelled</span>
                                </v-chip>
                            </div>
                            <div v-else-if="props.item.status == 5">
                                <v-chip
                                    :color="statusMaster('in_progress')"
                                    :text-color="statusMasterText('in_progress')"
                                >
                                    <span class="pa-md-2">In Progress</span>
                                </v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn icon v-on="{ ...menu }" data-unq="cashReceipt-button-actionButton">
                                        <v-icon dark>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item
                                        v-privilege="'sp_can_active'"
                                        v-if="props.item.status == 1"
                                        @click="cancelPaymentActive(props.item.id)"
                                        data-unq="cashReceipt-button-cancelActiveReceipt"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Cancel</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item
                                        v-privilege="'sp_can'"
                                        v-if="props.item.status == 2 || props.item.status == 5"
                                        @click="cancelPayment(props.item.id)"
                                        data-unq="cashReceipt-button-cancelReceipt"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Cancel</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <div v-if="props.item.status == 1 || props.item.status == 2 || props.item.status == 5">
                                        <hr /> 
                                    </div>
                                    <v-list-item 
                                        @click="seeHistory(props.item.id)"
                                        data-unq="cashReceipt-button-history"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>See History</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <div v-if="(props.item.status == 1 || props.item.status == 5) && props.item.payment_method.name !== 'Cash'" v-privilege="'sp_crt_active'">
                                        <hr />
                                    </div>
                                    <v-list-item 
                                        v-if="(props.item.status == 1 || props.item.status == 5) && props.item.payment_method.name !== 'Cash'" 
                                        v-privilege="'sp_crt_active'"
                                        @click="openPopupReceiptProof(props.index)"
                                        data-unq="cashReceipt-button-addReceiptProof"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Add Receipt Proof</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <div v-if="props.item.status == 1 || props.item.status == 5" v-privilege="'sp_crt_active'">
                                        <hr />
                                    </div>
                                    <v-list-item 
                                        v-if="props.item.status == 1 || props.item.status == 5" 
                                        v-privilege="'sp_cnf'"
                                        @click="confirmReceipt(props.item)"
                                        data-unq="cashReceipt-button-confirmReceipt"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Confirm Receipt</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
                <v-alert
                    slot="no-results"
                    :value="true"
                    color="error"
                    icon="warning"
                    data-unq="cashReceipt-error-receiptList"
                >
                    Your search for "{{ filter.search }}" found no results.
                </v-alert>
            </v-data-table>
        </div>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions, mapMutations } from "vuex";

    export default {
        name: 'CashReceipt',
        data() {
            return {
                showFilter : false,
            }
        },
        mounted() {
            this.$store.commit('setCashReceiptDateFilter', {
                model: "",
                input: new Date(Date.now() + 3600 * 1000 * 7).toISOString().substr(0, 10),
                date: [new Date(Date.now() + 3600 * 1000 * 7).toISOString().substr(0, 10),],
            })
            this.fetchCashReceipt()
        },
        computed: {
            ...mapState({
                cash_receipt: state => state.cashReceipt.cash_receipt_list,
                filter: state => state.cashReceipt.cash_receipt_list.filter,
                status_options: state => state.cashReceipt.cash_receipt_list.status_options,
                date_type_options: state => state.cashReceipt.cash_receipt_list.date_type_options,
            }),
        },
        methods: { 
            ...mapActions([
                'fetchCashReceipt'
            ]),
            ...mapMutations([
                'setCashReceiptFilter',
            ]),
            //For Filter Region
            regionSelected(val) {
                this.filter.area = null;
                if (val !== ''  && val !== undefined && val !== null) {
                    this.$store.commit('setCashReceiptFilter', {
                        ...this.filter,
                        region: val.id
                    })
                }
            },
            //For Filter Site
            siteSelected(val) {
                this.filter.site = null;
                if (val !== ''  && val !== undefined && val !== null) {
                    this.$store.commit('setCashReceiptFilter', {
                        ...this.filter,
                        site: val.id
                    })
                }
            },
            //For Filter Customer
            customerSelected(val) {
                this.filter.customer = null;
                if (val !== ''  && val !== undefined && val !== null) {
                    this.$store.commit('setCashReceiptFilter', {
                        ...this.filter,
                        customer: val.id
                    })
                }
            },
        },
        watch: {
            'filter.search': {
                handler: function (val) {
                    if (val) {
                        this.fetchCashReceipt()
                    }
                },
                deep: true
            },
            'filter.region': {
                handler: function (val) {
                    if (val) {
                        this.fetchCashReceipt()
                    }
                },
                deep: true
            },
            'filter.site': {
                handler: function (val) {
                    if (val) {
                        this.fetchCashReceipt()
                    }
                },
                deep: true
            },
            'filter.customer': {
                handler: function (val) {
                    if (val) {
                        this.fetchCashReceipt()
                    }
                },
                deep: true
            },
            'filter.date_type': {
                handler: function (val) {
                    if (val) {
                        this.fetchCashReceipt()
                    }
                },
                deep: true
            },
            'filter.status': {
                handler: function (val) {
                    if (val) {
                        this.fetchCashReceipt()
                    }
                },
                deep: true
            },
            'filter.date_filter.input': {
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.filter.date_filter.date[0] = this.$moment(val).format('YYYY-MM-DD')
                                Vue.nextTick(() => {
                                    this.fetchCashReceipt()
                                });
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0,10)
                            let date2 = val.substr(14,23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                let date3 = new Date(this.filter.date_filter.date[0])
                                let date4 = new Date(this.filter.date_filter.date[1])
                                if (parseInt((date4-date3)/(24*3600*1000)) > 29 || parseInt((date4-date3)/(24*3600*1000)) < -29) {
                                    if (date4 < date3) {
                                        this.filter.date_filter.date[0] = this.$moment(date3).format('YYYY-MM-DD')
                                        this.filter.date_filter.date.splice(1,1)
                                    } else {
                                        this.filter.date_filter.date[0] = this.$moment(date3).format('YYYY-MM-DD')
                                        this.filter.date_filter.date.splice(1,1)
                                    }
                                }else {
                                    this.fetchCashReceipt()
                                }
                            }
                        }
                    } else {
                        this.fetchCashReceipt()
                    }
                },
                deep: true
            },
            'filter.date_filter.date': {
                handler: function (val) {
                    if (val) {
                        this.filter.date_filter.input = this.formatDateRange(val)
                    }
                },
                deep: true
            },
        },
    } 
</script>
