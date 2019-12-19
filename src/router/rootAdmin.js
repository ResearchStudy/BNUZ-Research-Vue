import Index from '@/pages/RootAdmin/Index/index'
import Home from '@/pages/RootAdmin/Home/index'
import TabsManager from '@/pages/RootAdmin/TabsManager/index'
import AuditPendingList from '@/pages/RootAdmin/AuditPendingList/index'
import AuditPendingDetail from '@/pages/RootAdmin/AuditPendingDetail/index'
import AccountsManager from '@/pages/RootAdmin/AccountsManager/index'

const adminRoutes = [
    {
        path: '/root-admin', component: Index, children: [
            { path: '/', redirect: 'dashboard' },
            { path: 'dashboard', component: Home },
            { path: 'tabs', component: TabsManager },
            { path: 'audit-pending', component: AuditPendingList },
            { path: 'audit-pending/:id', component: AuditPendingDetail },
            { path: 'accounts', component: AccountsManager },
        ]
    }
]

export default adminRoutes
