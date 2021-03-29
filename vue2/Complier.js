import Watch from "./Watch"
//解析Vue模板
const Reg=/\{\{(.*)\}\}/
class Complier{
    constructor(el,vm){
        this.el=document.querySelector(el)
        this.vm=vm
        this.frag=this._createFragment()
        this.el.appendChild(this.frag)
    }
    //Dom碎片 一次性编译Dom结构
    _createFragment(){
        var frag =document.createDocumentFragment()
        var child
        while(child =this.el.firstChild){ //这里会一直获取el的firstChild
            this._complie(child)
            frag.appendChild(child) //node加入到别的节点后会移除 
        }
 
        return frag
    }
    //编译
    _complie(node){
        if(node.nodeType===1){
            //实现双向的绑定
            var attr=node.attributes
            var self=this
            if(attr.hasOwnProperty('v-model')){
                var name=attr['v-model'].nodeValue
                node.addEventListener('input',function(e){
                    console.log('input')
                    self.vm[name]=e.target.value
                })
                //将节点值改成value值
                node.value=this.vm[name]
            }

        }
        if(node.nodeType===3){
            //文本节点
            console.log('文本节点',node.nodeValue)
            if(Reg.test(node.nodeValue)){
                //判断是不是有{{}}
                var name=RegExp.$1
                name=name.trim() //去除空格
                //获得值 交给Watcher观察
                //vm是Vue对象
                console.log(name,node.nodeValue)
                // {{message}} 
                // new Watch(文本节点,message,vue对象)
                new Watch(node,name,this.vm) 
            }
        }
    }
}

export default Complier