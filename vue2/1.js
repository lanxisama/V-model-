var a = [1,2,3,4,5]
var c;
var d = []
while(c = a[0]){
    console.log(c,a)
    d.push(a.shift())
}