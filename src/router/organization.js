import Organization from "@/pages/organization/Organization";
import index from "@/pages/index";

const organizationRoutes = [
    {
        path: '/', component: index, children: [
            {path: 'organization', component: Organization}
        ]
    }
];

export default organizationRoutes