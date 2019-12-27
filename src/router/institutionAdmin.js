import Index from '@/pages/InstitutionAdmin/Index/index'
import DashBoard from '@/pages/InstitutionAdmin/DashBoard/index'
import InformationManager from '@/pages/InstitutionAdmin/InformationManager/index'
import PublishInformation from '@/pages/PublishInformation/index'
import InformationDetail from '@/pages/InstitutionAdmin/InformationDetail/index'
import UpdateInformation from '@/pages/UpdateInformation/index'
import CourseManager from '@/pages/InstitutionAdmin/CourseManager/index'
import PreEnrollStudent from '@/pages/InstitutionAdmin/PreEnrollStudent/index'

import PreEnrollStudentByCourse from '@/pages/InstitutionAdmin/PreEnrollStudent/PreEnrollStudentByCourse'
const institutionAdminRoutes = [
  {
    path: '/insitution-admin', component: Index, children: [
      { path: '/', redirect: 'dashboard' },
      { path: 'dashboard', component: DashBoard },
      { path: 'informationManager', component: InformationManager },
      { path: 'publishInformation', component: PublishInformation },
      { path: 'information-list/:id', component: InformationDetail },
      { path: 'information-update/:id', component: UpdateInformation },
      { path: 'courseManager', component: CourseManager },
      { path: 'preEnrollStudent', component: PreEnrollStudent },
      { path: 'preEnrollStudentByCourse/:id', component: PreEnrollStudentByCourse },
    ]
  }
]

export default institutionAdminRoutes
