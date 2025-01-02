import AdminDashBoardView from "@/views/admin/AdminDashBoardView.vue";
import AdminDedicationView from "@/views/admin/AdminDedicationView.vue";
import AdminRequests from "@/components/admin/AdminRequests.vue";
import AdminDedicationManagement from "@/components/admin/AdminDedicationManagement.vue";
import AdminStandManagement from "@/components/admin/AdminStandManagement.vue";
import AdminModifyStandForm from "@/components/admin/AdminModifyStandForm.vue";
import AdminStandReservation from "@/components/admin/AdminStandReservation.vue";
import AdminModifyStandReservationForm from "@/components/admin/AdminModifyStandReservationForm.vue";

export default [
    {
        path: '/admin-dashboard',
        name: 'admin-dashboard',
        component: AdminDashBoardView,
        meta: { requiresAuth: true, requiredPrivilege: '2' },
        children: [
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
                component: AdminModifyStandForm,
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
                component: AdminModifyStandReservationForm,
                meta: { requiresAuth: true, requiredPrivilege: '2' },
            }
        ],
    },
];