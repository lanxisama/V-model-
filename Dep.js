//发布订阅模块
class Dep{
    constructor() {
        this.listenerList=[]
    }
    listen(listener){
        this.listenerList.push(listener)
    }
    notify(){
        for(let i=0;i<this.listenerList.length;i++){
            this.listenerList[i].update()
        }
    }
}
Dep.prototype.target=null
export default Dep