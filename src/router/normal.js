import PreEntry from '@/pages/Person/PreEntry/index'
import PersonIndex from '@/pages/Person/Index/index'
import AlrEntry from '@/pages/Person/AlrEntry/index'
import ResetPwd from '@/pages/Person/ResetPwd/index'
import BaseData from '@/pages/Person/BaseData/index'
import ResetPhone from '@/pages/Person/ResetPhone/index'
import Address from '@/pages/Person/Address/index'
import Settled from '@/pages/Person/Settled/index'
import SettledDetails from '@/pages/Person/SettledDetails/index'
import SettledModifty from '@/pages/Person/SettledModifty/index'

const normalRoutes = [
    {
        path : '/person' , component : PersonIndex, children:[
            {path : 'pre-entry' , component : PreEntry},
            {path : 'alr-entry' , component : AlrEntry},
            {path : 'reset-pwd' ,component : ResetPwd},
            {path : 'dashboard' , component : BaseData},
            {path : '/' , redirect: 'dashboard'},
            {path : 'address' , component : Address},
            {path : 'reset-phone' , component : ResetPhone},
            {path : 'settled' , component : Settled},
            {path : 'settled/:id' , component : SettledDetails},
            {path : 'settled-modifty/:id' , component : SettledModifty},

            
         
        ]
    }
]

export default normalRoutes
