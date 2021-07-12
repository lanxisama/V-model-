// Vue对象
import Observer from './Observer.js'
import Complier from './Complier.js'
class Vue{
    constructor(options){
        this.$options=options
        this.$el=this.$options.el
        this._data=this.$options.data
        // Object.keys(this._data).forEach(key=>{
        //     this._provy(key)
        // })
        new Observer(this._data)
        new Complier(this.$el,this) //第二个参数是vue对象
    }
    // _provy(key){
    //     var self=this
    //     Object.defineProperty(this,key,{
    //         get(){
    //             return self._data[key]
    //         },
    //         set(val){
    //             self._data[key]=val
    //         }
    //     })
    // }
}

export default Vue