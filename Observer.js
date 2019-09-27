//将数据和发布订阅模块绑定在一起
import Dep from './Dep' //值在一个地方修改时候通知其他模块
class Oberver{
    constructor(data){
        this.data=data
        Object.keys(this.data).forEach(key=>{
            this._bind(data,key,data[key])
        })
    }
    _bind(data,key,val){
        var myDep=new Dep()
        Object.defineProperty(data,key,{
            get(){
                if(Dep.target){
                    //Dep.target是一个Watch对象
                    myDep.listen(Dep.target)
                }
                return val
            },
            set(newVal){
                if(newVal===val)
                {
                    return
                }
                val=newVal
                myDep.notify()
            }
        })
    }
}

export default Oberver