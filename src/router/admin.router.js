import AdminDashBoardView from "@/views/admin/AdminDashBoardView.vue";
import AdminDedicationView from "@/views/admin/AdminDedicationView.vue";
import AdminRequests from "@/components/admin/AdminRequests.vue";
import AdminDedicationManagement from "@/components/admin/dedications/AdminDedicationManagement.vue";
import AdminStandManagement from "@/components/admin/stands/AdminStandManagement.vue";
import AdminModifyStand from "@/components/admin/stands/AdminModifyStand.vue";
import AdminStandReservation from "@/components/admin/stands/AdminStandReservation.vue";
import AdminModifyStandReservation from "@/components/admin/stands/AdminModifyStandReservation.vue";
import AdminAddStandReservation from "@/components/admin/stands/AdminAddStandReservation.vue";
import AdminAccountsManagement from "@/components/admin/accounts/AdminAccountsManagement.vue";
import AdminModifyAccount from "@/components/admin/accounts/AdminModifyAccount.vue";
import AdminAddAccount from "@/components/admin/accounts/AdminAddAccount.vue";
import AdminBracket from "@/components/admin/AdminBracket.vue";

export default [
    {
        path: '/admin-dashboard',
        name: 'admin-dashboard',
        component: AdminDashBoardView,
        meta: { requiresAuth: true, requiredPrivilege: '2' },
        children: [
            {
                path: 'admin-accounts',
                name: 'admin-accounts',
                component: AdminAccountsManagement,
                meta: { requiresAuth: true, requiredPrivilege: '2'},
            },
            {
                path: 'admin-accounts/:item_id',
                name: 'admin-accounts-edit',
                component: AdminModifyAccount,
                meta: { requiresAuth: true, requiredPrivilege: '2'},
            },
            {
                path: 'admin-accounts-add',
                name: 'admin-accounts-add',
                component: AdminAddAccount,
                meta: { requiresAuth: true, requiredPrivilege: '2'},
            },
            {
                path: 'admin-requests',
                name: 'admin-requests',
                component: AdminRequests,
                meta: { requiresAuth: true, requiredPrivilege: '2'},
            },
            {
                path: 'admin-stand-management',
                name: 'admin-stand-management',
                component: AdminStandManagement,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
            },
            {
                path: 'admin-stand-management/:item_id',
                name: 'admin-stand-management-edit',
                component: AdminModifyStand,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
            },
            {
                path: 'admin-stand-reservations',
                name: 'admin-stand-reservations',
                component: AdminStandReservation,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
            },
            {
                path: 'admin-stand-reservations/:item_id',
                name: 'admin-stand-reservations-edit',
                component: AdminModifyStandReservation,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
            },
            {
                path: 'admin-add-stand-reservation',
                name: 'admin-add-stand-reservation',
                component: AdminAddStandReservation,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
            },
            {
                path: 'admin-add-stand-reservation/:stand_id',
                name: 'admin-add-stand-reservation-stand-id',
                component: AdminAddStandReservation,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
            },
            {
                path: 'admin-dedication',
                name: 'admin-dedication',
                component: AdminDedicationView,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
                children: [
                    {
                        path: 'admin-dedication-management',
                        name: 'admin-dedication-management',
                        component: AdminDedicationManagement,
                        meta: { requiresAuth: true, requiredPrivilege: '2' },
                    },
                ],
            },
            {
                path: 'admin-bracket',
                name: 'admin-bracket',
                component: AdminBracket,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
            },
        ],
    },
];