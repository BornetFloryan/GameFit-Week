import ProviderDashboard from "@/views/prestataire/ProviderDashboard.vue";
import ProviderDedicationManagement from "@/components/prestataire/dedications/ProviderDedicationManagement.vue";
import ProviderAddDedication from "@/components/prestataire/dedications/ProviderAddDedication.vue";
import ProviderDedicationReservation from "@/components/prestataire/dedications/ProviderDedicationReservation.vue";
import ProviderGoodieSalesList from "@/components/prestataire/goodies/ProviderGoodieSalesList.vue";
import ProviderchartView from "@/components/ProviderChartView.vue";
import ProviderGuestbook from "@/components/prestataire/ProviderGuestbook.vue";
import ProviderEditor from "@/components/prestataire/ProviderEditor.vue";
import ProviderSchedule from "@/components/prestataire/ProviderSchedule.vue";
import ProviderModifyGoodie from "@/components/prestataire/goodies/ProviderModifyGoodie.vue";

export default [
    {
        path: '/provider-dashboard',
        name: 'provider-dashboard',
        component: ProviderDashboard,
        meta: { requiresAuth: true, requiredPrivilege: "1" },
        children: [
            {
                path: 'provider-schedule',
                name: 'provider-schedule',
                component: ProviderSchedule,
                meta: { requiresAuth: true, requiredPrivilege: "1"},
            },
            {
                path: 'provider-editor',
                name: 'provider-editor',
                component: ProviderEditor,
                meta: { requiresAuth: true, requiredPrivilege: "1" },
            },
            {
                path: 'provider-dedication',
                name: 'provider-dedication',
                component: ProviderDedicationManagement,
                meta: { requiresAuth: true, requiredPrivilege: "1" },
            },
            {
                path: 'provider-dedication-add',
                name: 'provider-dedication-add',
                component: ProviderAddDedication,
                meta: { requiresAuth: true, requiredPrivilege: "1" },
            },
            {
                path: 'provider-dedication-reservation',
                name: 'provider-dedication-reservation',
                component: ProviderDedicationReservation,
                meta: { requiresAuth: true, requiredPrivilege: "1" },
            },
            {
                path: 'provider-goodies',
                name: 'provider-goodies',
                component: ProviderGoodieSalesList,
                meta: { requiresAuth: true, requiredPrivilege: "1" },
            },
            {
                path: 'add-goodie',
                name: 'add-goodie',
                component: ProviderDedicationManagement,
                meta: { requiresAuth: true, requiredPrivilege: "1" },
            },
            {
                path: 'modify-goodie/:item_id',
                name: 'modify-goodie',
                component: ProviderModifyGoodie,
                meta: { requiresAuth: true, requiredPrivilege: "1" },
            },
            {
                path:'provider-guestbook',
                name:'provider-guestbook',
                component: ProviderGuestbook,
                meta: { requiresAuth: true, requiredPrivilege: "1" },
            },
            {
                path:'chart',
                name:'chart',
                component: ProviderchartView,
                meta: { requiresAuth: true, requiredPrivilege: "1" },
            }
        ],
    },
];