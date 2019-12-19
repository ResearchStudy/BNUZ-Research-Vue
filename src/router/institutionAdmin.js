import Index from '@/pages/InstitutionAdmin/Index/index'
import DashBoard from '@/pages/InstitutionAdmin/DashBoard/index'

const institutionAdminRoutes = [
  {
    path: '/insitution-admin', component: Index, children: [
      { path: '/', redirect: 'dashboard' },
      { path: 'dashboard', component: DashBoard },
    ]
  }
]

export default institutionAdminRoutes
