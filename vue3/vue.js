function reactive(obj){
    //Proxy代理Proxy,拦截设置toStringTag

    // Proxy = new Proxy(Proxy, {
    //     //拦截 new 操作符，生成 Proxy 实例的时候来拦截
    //     construct: function (target, argumentsList) {
    //       //result是new Proxy()生成的原本的实例
    //       const result = new target(...argumentsList);
    //       //获取原本实例reslut的类型
    //       const originToStringTag = Object.prototype.toString.call(result).slice(1,-1).split(' ')[1]
    //       //改写result的[Symbol.toStringTag]属性，加上被代理的标志
    //       result[Symbol.toStringTag] = 'Proxy-' + originToStringTag;
    //       return result;
    //     ,
    //   });
    
    return new Proxy(obj,{
        get(target,key,receiver){
            console.log('get')
            track(target,key)
            return Reflect.get(target,key)
        },
        set(target,key,value,receiver){
            console.log('set')
            let oldVal =  Reflect.get(target,key);
            if(oldVal ===value){
                return;
            }
            Reflect.set(target,key,value);
            trigger(target,key)
        }
    })
 
  
}
let targetMap = new WeakMap();
let effectStack = []; //effect栈
let activeEffect =null // 当前
function track(target,key){ 
    if(targetMap.get(target)){
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if(!dep.has(activeEffect)){
        dep.add(activeEffect)
    }
}

function trigger(target,key){
    let obj = targetMap.get(target);
    if(!obj){
        return;
    }
    let depsMap = obj.get(key); //获取每个属性的
    console.log('depsMap',depsMap)
    Array.from(depsMap).forEach(effect =>{
        effect(); //执行effect方法
        /*
            对obj中属性有修改的方法
            ()=>{
                obj.a = 12
            }
        */
    })
}

function effect(fn,option){
    let effect = createEffect(fn,option);
    if(!effect.lazy){
        effect();  //如果不是lazy则立即执行
    }
    return effect
}

//对fn函数做修饰
function createEffect(fn,option){
    const effect = ()=>{
        if(!effectStack.includes(effect)){
            console.log(1)
        }
    }
}

let obj = {
    a:1,
    b:2
}

let p = reactive(obj)
console.log(p.a)
p.a =31
/*
WeakMap 
{
    {a:1,b:2}:{
        a:Set(),
        b:Set()
    }
}
*/


