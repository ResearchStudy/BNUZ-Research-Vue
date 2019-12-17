import index from "@/pages/index";
import Organization from "@/pages/organization/Organization";
import PreEntry from '@/pages/Person/PreEntry/index'
import PersonIndex from '@/pages/Person/Index/index'
import AlrEntry from '@/pages/Person/AlrEntry/index'
import ResetPwd from '@/pages/Person/ResetPwd/index'

const normalRoutes = [
    {
        path: '/',
        component: index,
        children: [
            {path: 'home', component: Organization},
        ]
    },
    {
        path : '/person' , component : PersonIndex, children:[
            {path : 'pre-entry' , component : PreEntry},
            {path : 'alr-entry' , component : AlrEntry},
            {path : 'reset-pwd' ,component : ResetPwd},

        ]
    }
]

export default normalRoutes
