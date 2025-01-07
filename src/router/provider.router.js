import ProviderDashboard from "@/views/prestataire/ProviderDashboard.vue";
import ProviderDedicationManagement from "@/components/prestataire/dedications/ProviderDedicationManagement.vue";
import ProviderAddDedication from "@/components/prestataire/dedications/ProviderAddDedication.vue";
import ProviderDedicationReservation from "@/components/prestataire/dedications/ProviderDedicationReservation.vue";
import GoodieSalesList from "@/components/prestataire/goodies/GoodieSalesList.vue";
import ProviderRestaurantManagement from "@/components/prestataire/foods/ProviderRestaurantManagement.vue";
import ProviderchartView from "@/components/ProviderChartView.vue";

export default [
    {
        path: '/provider-dashboard',
        name: 'provider-dashboard',
        component: ProviderDashboard,
        meta: { requiresAuth: true, requiredPrivilege: '1' },
        children: [
            {
                path: 'provider-dedication',
                name: 'provider-dedication',
                component: ProviderDedicationManagement,
                meta: { requiresAuth: true, requiredPrivilege: '1' },
            },
            {
                path: 'provider-dedication-add',
                name: 'provider-dedication-add',
                component: ProviderAddDedication,
                meta: { requiresAuth: true, requiredPrivilege: '1' },
            },
            {
                path: 'provider-dedication-reservation',
                name: 'provider-dedication-reservation',
                component: ProviderDedicationReservation,
                meta: { requiresAuth: true, requiredPrivilege: '1' },
            },

            {
                path: 'provider-restaurant',
                name: 'provider-restaurant',
                component: ProviderRestaurantManagement,
                meta: { requiresAuth: true, requiredPrivilege: '1' },
                children: [
                    {
                        path: 'provider-restaurant-management',
                        name: 'provider-restaurant-management',
                        component:ProviderRestaurantManagement ,
                        meta: { requiresAuth: true, requiredPrivilege: '1' },
                    },
                ],
            },

            {
                path: 'provider-goodies',
                name: 'provider-goodies',
                component: GoodieSalesList,
                meta: { requiresAuth: true, requiredPrivilege: '1' },
                children: [
                    {
                        path: '/add-goodie',
                        name: '/add-goodie',
                        component: ProviderDedicationManagement,
                        meta: { requiresAuth: true, requiredPrivilege: '1' },
                    },
                ],
            },
            {
                path:'chart',
                name:'chart',
                component: ProviderchartView,
                meta: { requiresAuth: true, requiredPrivilege: '1' },
            }
        ],
    },
];
