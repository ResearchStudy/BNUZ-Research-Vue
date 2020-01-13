import Index from '@/pages/InstitutionAdmin/Index/index'
import DashBoard from '@/pages/InstitutionAdmin/DashBoard/index'
import InformationManager from '@/pages/InstitutionAdmin/InformationManager/index'
import PublishInformation from '@/pages/PublishInformation/index'
import InformationDetail from '@/pages/InstitutionAdmin/InformationDetail/index'
import UpdateInformation from '@/pages/UpdateInformation/index'
import CourseManager from '@/pages/InstitutionAdmin/CourseManager/index'
import CoursesForm from '@/pages/InstitutionAdmin/CourseManager/CoursesForm'
import CourseModify from '@/pages/InstitutionAdmin/CourseModify/index'
import PreEnrollStudent from '@/pages/InstitutionAdmin/PreEnrollStudent/index'
import TagsManager from '@/pages/InstitutionAdmin/TagsManager/index'

import PreEnrollStudentByCourse from '@/pages/InstitutionAdmin/PreEnrollStudent/PreEnrollStudentByCourse'
const institutionAdminRoutes = [
  {
    path: '/institution-admin', component: Index, children: [
      { path: '/', redirect: 'dashboard' },
      { path: 'dashboard', component: DashBoard },
      { path: 'informationManager', component: InformationManager },
      { path: 'publishInformation', component: PublishInformation },
      { path: 'information-list/:id', component: InformationDetail },
      { path: 'information-update/:id', component: UpdateInformation },
      { path: 'courseManager', component: CourseManager },
      { path: 'coursesForm', component: CoursesForm },
      { path: 'course-modify/:id', component: CourseModify },
      { path: 'preEnrollStudent', component: PreEnrollStudent },
      { path: 'preEnrollStudentByCourse/:id', component: PreEnrollStudentByCourse },
      { path: 'tags', component: TagsManager },
    ]
  }
]

export default institutionAdminRoutes
