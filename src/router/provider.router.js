import ProviderDashboard from "@/views/prestataire/ProviderDashboard.vue";
import ProviderDedicationView from "@/views/prestataire/ProviderDedicationView.vue";
import ProviderDedicationManagement from "@/components/prestataire/ProviderDedicationManagement.vue";

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
        ],
    },
];