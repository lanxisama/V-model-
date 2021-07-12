import Dep from "./Dep"
//订阅者
class Watch{
    constructor(node,name,vm){
        this.node=node
        this.name=name
        this.vm=vm
        Dep.target = this;
        this.update()
        Dep.target=null
    }
    
    update(){
        //vm是Vue对象
        //修改节点的值
        this.node.nodeValue=this.vm[this.name]
    }
}

export default Watch
