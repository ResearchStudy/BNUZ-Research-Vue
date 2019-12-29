import Index from '@/pages/RootAdmin/Index/index'
import Home from '@/pages/RootAdmin/Home/index'
import TabsManager from '@/pages/RootAdmin/TabsManager/index'
import AuditPendingList from '@/pages/RootAdmin/AuditPendingList/index'
import AuditPendingDetail from '@/pages/RootAdmin/AuditPendingDetail/index'
import AuditPendingModify from '@/pages/RootAdmin/AuditPendingModify/index'
import AuditPendingModifyDetail from '@/pages/RootAdmin/AuditPendingModifyDetail/index'
import AuditFinishList from '@/pages/RootAdmin/AuditFinishList/index'
import AuditFinishDetail from '@/pages/RootAdmin/AuditFinishDetail/index'
import AccountsManager from '@/pages/RootAdmin/AccountsManager/index'
import AccountsDetail from '@/pages/RootAdmin/AccountsDetail/index'

const adminRoutes = [
  {
    path: '/root-admin', component: Index, children: [
      { path: '/', redirect: 'dashboard' },
      { path: 'dashboard', component: Home },
      { path: 'tabs', component: TabsManager },
      { path: 'audit-pending-list', component: AuditPendingList },
      { path: 'audit-pending-list/:id', component: AuditPendingDetail },
      { path: 'audit-pending-modify/', component: AuditPendingModify },
      { path: 'audit-pending-modify/:id', component: AuditPendingModifyDetail },
      { path: 'audit-finish-list', component: AuditFinishList },
      { path: 'audit-finish-list/:id', component: AuditFinishDetail },
      { path: 'accounts', component: AccountsManager },
      { path: 'accounts-detail/:id', component: AccountsDetail },
    ]
  }
]

export default adminRoutes
