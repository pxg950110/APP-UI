/**
 * @author pxg
 * @emil pxg950110@163.com
 * @date 2019/9/26
 * @version v1.0
 * @description
 */
import {menuMap} from '@/router'

const user = {
  state: {
    menus: menuMap
  }
}
export default user

const getters={
  menus:state=>state.user.menus,
  barEffect:state=>state.app.barEffect
}
export default getters
