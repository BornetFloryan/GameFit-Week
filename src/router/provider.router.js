import ProviderDashboard from "@/views/prestataire/ProviderDashboard.vue";
import ProviderDedicationView from "@/views/prestataire/ProviderDedicationView.vue";
import ProviderDedicationManagement from "@/components/prestataire/ProviderDedicationManagement.vue";
import GoodieSalesList from "@/components/prestataire/GoodieSalesList.vue";
import ProviderRestaurantManagement from "@/components/prestataire/ProviderRestaurantManagement.vue";
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
                component: ProviderDedicationView,
                meta: { requiresAuth: true, requiredPrivilege: '1' },
                children: [
                    {
                        path: 'provider-dedication-management',
                        name: 'provider-dedication-management',
                        component: ProviderDedicationManagement,
                        meta: { requiresAuth: true, requiredPrivilege: '1' },
                    },
                ],
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
            }
        ],
    },
];
