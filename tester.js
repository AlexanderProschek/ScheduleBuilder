var e=[]
e[0]={name:"George", age:32, retiredate:"March 12, 2014"}
e[3]={name:"Edward", age:17, retiredate:"June 2, 2023"}
e[2]={name:"Christine", age:58, retiredate:"December 20, 2036"}
e[1]={name:"Sarah", age:62, retiredate:"April 30, 2020"}

e.sort((e1,e2) => {
    return e1.age - e2.age;
});
console.log(e);