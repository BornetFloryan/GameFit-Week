import AdminDashBoardView from "@/views/admin/AdminDashBoardView.vue";
import AdminAccountsManagement from "@/components/admin/accounts/AdminAccountsManagement.vue";
import AdminModifyAccount from "@/components/admin/accounts/AdminModifyAccount.vue";
import AdminAddAccount from "@/components/admin/accounts/AdminAddAccount.vue";
import AdminRequests from "@/components/admin/AdminRequests.vue";
import AdminStandManagement from "@/components/admin/stands/AdminStandManagement.vue";
import AdminModifyStand from "@/components/admin/stands/AdminModifyStand.vue";
import AdminStandReservation from "@/components/admin/stands/AdminStandReservation.vue";
import AdminModifyStandReservation from "@/components/admin/stands/AdminModifyStandReservation.vue";
import AdminAddStandReservation from "@/components/admin/stands/AdminAddStandReservation.vue";
import AdminDedicationManagement from "@/components/admin/dedications/AdminDedicationManagement.vue";
import AdminModifyDedication from "@/components/admin/dedications/AdminModifyDedication.vue";
import AdminAddDedication from "@/components/admin/dedications/AdminAddDedication.vue";
import AdminDedicationReservation from "@/components/admin/dedications/AdminDedicationReservation.vue";
import AdminModifyDedicationReservation from "@/components/admin/dedications/AdminModifyDedicationReservation.vue";
import AdminAddDedicationReservation from "@/components/admin/dedications/AdminAddDedicationReservation.vue";
import AdminBracket from "@/components/admin/AdminBracket.vue";
import AdminchartView from "@/components/admin/AdminChartView.vue";
import AdminReportsManagement from "@/components/admin/reports/AdminReportsManagement.vue";
import AdminReportProcessed from "@/components/admin/reports/AdminReportProcessed.vue";

export default [
    {
        path: '/admin-dashboard',
        name: 'admin-dashboard',
        component: AdminDashBoardView,
        meta: { requiresAuth: true, requiredPrivilege: "2" },
        children: [
            {
                path: 'admin-requests',
                name: 'admin-requests',
                component: AdminRequests,
                meta: { requiresAuth: true, requiredPrivilege: "2"},
            },
            {
                path: 'admin-accounts',
                name: 'admin-accounts',
                component: AdminAccountsManagement,
                meta: { requiresAuth: true, requiredPrivilege: "2"},
            },
            {
                path: 'admin-accounts/:item_id',
                name: 'admin-accounts-edit',
                component: AdminModifyAccount,
                meta: { requiresAuth: true, requiredPrivilege: "2"},
            },
            {
                path: 'admin-accounts-add',
                name: 'admin-accounts-add',
                component: AdminAddAccount,
                meta: { requiresAuth: true, requiredPrivilege: "2"},
            },
            {
                path: 'admin-stand-management',
                name: 'admin-stand-management',
                component: AdminStandManagement,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-stand-management/:item_id',
                name: 'admin-stand-management-edit',
                component: AdminModifyStand,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-stand-reservation',
                name: 'admin-stand-reservation',
                component: AdminStandReservation,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-stand-reservation/:item_id',
                name: 'admin-stand-reservation-edit',
                component: AdminModifyStandReservation,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-add-stand-reservation',
                name: 'admin-add-stand-reservation',
                component: AdminAddStandReservation,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-add-stand-reservation/:stand_id',
                name: 'admin-add-stand-reservation-stand-id',
                component: AdminAddStandReservation,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-dedication',
                name: 'admin-dedication',
                component: AdminDedicationManagement,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-dedication/:item_id',
                name: 'admin-dedication-edit',
                component: AdminModifyDedication,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-dedication-add',
                name: 'admin-dedication-add',
                component: AdminAddDedication,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-dedication-reservation',
                name: 'admin-dedication-reservation',
                component: AdminDedicationReservation,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-dedication-reservation/:item_id',
                name: 'admin-dedication-reservation-edit',
                component: AdminModifyDedicationReservation,
                meta: { requiresAuth: true, requiredPrivilege: "2"},
            },
            {
                path: 'admin-dedication-reservation-add',
                name: 'admin-dedication-reservation-add',
                component: AdminAddDedicationReservation,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-bracket',
                name: 'admin-bracket',
                component: AdminBracket,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-reports',
                name: 'admin-reports',
                component: AdminReportsManagement,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            },
            {
                path: 'admin-reports/:guestbook_entry_id',
                name: 'admin-reports-processed',
                component: AdminReportProcessed,
                meta: { requiresAuth: true, requiredPrivilege: "2"},
            },
            {
                path: 'testChartadmin',
                name: 'testChartadmin',
                component: AdminchartView,
                meta: { requiresAuth: true, requiredPrivilege: "2" },
            }

        ],
    },
];
