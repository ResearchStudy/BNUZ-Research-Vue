import Index from '@/pages/RootAdmin/Index/index'
import Home from '@/pages/RootAdmin/Home/index'
import TagsManager from '@/pages/RootAdmin/TagsManager/index'
import AuditPendingList from '@/pages/RootAdmin/AuditPendingList/index'
import AuditPendingDetail from '@/pages/RootAdmin/AuditPendingDetail/index'
import AuditPendingModify from '@/pages/RootAdmin/AuditPendingModify/index'
import AuditPendingModifyDetail from '@/pages/RootAdmin/AuditPendingModifyDetail/index'
import AuditFinishList from '@/pages/RootAdmin/AuditFinishList/index'
import AuditFinishDetail from '@/pages/RootAdmin/AuditFinishDetail/index'
import AccountsManager from '@/pages/RootAdmin/AccountsManager/index'
import AccountsDetail from '@/pages/RootAdmin/AccountsDetail/index'
import InformationList from '@/pages/RootAdmin/InformationList/index'
import InformationDetail from '@/pages/RootAdmin/InformationDetail/index'

const adminRoutes = [
  {
    path: '/root-admin', component: Index, children: [
      { path: '/', redirect: 'dashboard' },
      { path: 'dashboard', component: Home },
      { path: 'tags', component: TagsManager },
      { path: 'audit-pending-list', component: AuditPendingList },
      { path: 'audit-pending-list/:id', component: AuditPendingDetail },
      { path: 'audit-pending-modify/', component: AuditPendingModify },
      { path: 'audit-pending-modify/:id', component: AuditPendingModifyDetail },
      { path: 'audit-finish-list', component: AuditFinishList },
      { path: 'audit-finish-list/:id', component: AuditFinishDetail },
      { path: 'accounts', component: AccountsManager },
      { path: 'accounts-detail/:id', component: AccountsDetail },
      { path: 'information-list/', component: InformationList },
      { path: 'information-list/:id', component: InformationDetail },
    ]
  }
]

export default adminRoutes
