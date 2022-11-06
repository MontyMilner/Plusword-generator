var len
var ar
var tree
var itrs=0
var result
var sz=325
var ybef=0
var yaft=sz


function setup() {
  createCanvas(sz, sz*2);
  background(220)
  len=words.length
  ar=[["s","t","e","a","m"],
      ["h","e","l","l","o"],
      ["a","l","i","g","n"],
      ["p","e","t","i","t"],
      ["_","_","e","_","y"]
     ]
  print(findWordLet(["e","_","e","_","y"]))
  textAlign(CENTER,CENTER)
  drawGrid(ar,ybef)
  tree=[]
  y=oneStepRow(ar)
  if (y!=false){
    append(tree,[ar,y,"x"])
    itrs++
    result=plusWord2(ar,0)
  }else{
    print("Not Possible")
    showNotPos()
  }
  if (result=="Not Possible"){
    print(result)
    showNotPos()
    print("Efficiency: "+itrs)
  }else if(result!=undefined){
    print("Solution:")
    print(result)
    print("Efficiency: "+itrs)
    drawGrid(result, yaft)
  }
}

function plusWord(array, count){
  let ct=count
  print(JSON.parse(JSON.stringify(tree)),"x")
  if (checkAll(array)){return array}
  w=tree[ct][1][0][0]
  tree[ct][1][0].shift()
  tree[ct][1][1]--
  if(tree[ct][2]=="x"){newAr=adx(tree[ct][0],w,tree[ct][1][2])}
  if(tree[ct][2]=="y"){newAr=ady(tree[ct][0],w,tree[ct][1][2])}
  z=oneStepRow(newAr)
  if (z!=false){
    append(tree,[newAr,z,"x"])
    itrs++
    return plusWord2(newAr,ct+1)
  }else{
    let m=0
    for (let i=0; i<=ct; i++){
      if (tree[i][1][1]==0){
        m++
      }else{m=0}
    }
    if (m==tree.length){
      return "Not Possible"
    }else if (m!=0){
      for (let j=0; j<m; j++){
        tree.pop()
      }
      itrs++
      if(tree[ct-m][2]=="x"){return plusWord(array,ct-m)}
      if(tree[ct-m][2]=="y"){return plusWord2(array,ct-m)}
    }else{
      itrs++
      return plusWord(array,ct)
    }
  }
}

function plusWord2(array, count){
  let ct=count
  print(JSON.parse(JSON.stringify(tree)),"y")
  if (checkAll(array)){return array}
  w=tree[ct][1][0][0]
  tree[ct][1][0].shift()
  tree[ct][1][1]--
  if(tree[ct][2]=="x"){newAr=adx(tree[ct][0],w,tree[ct][1][2])}
  if(tree[ct][2]=="y"){newAr=ady(tree[ct][0],w,tree[ct][1][2])}
  z=oneStepCol(newAr)
  if (z!=false){
    append(tree,[newAr,z,"y"])
    itrs++
    return plusWord(newAr,ct+1)
  }else{
    let m=0
    for (let i=0; i<=ct; i++){
      if (tree[i][1][1]==0){
        m++
      }else{m=0}
    }
    if (m==tree.length){
      return "Not Possible"
    }else if (m!=0){
      for (let j=0; j<m; j++){
        tree.pop()
      }
      itrs++
      if(tree[ct-m][2]=="x"){return plusWord(array,ct-m)}
      if(tree[ct-m][2]=="y"){return plusWord2(array,ct-m)}
    }else{
      itrs++
      return plusWord2(array,ct)
    }
  }
}

function adx(array,word,pos){
  let temAr=JSON.parse(JSON.stringify(array))
  for (let i=0; i<5; i++){
    temAr[pos][i]=word[i]
  }
  return temAr
}

function ady(array,word,pos){
  let temAr=JSON.parse(JSON.stringify(array))
  for (let i=0; i<5; i++){
    temAr[i][pos]=word[i]
  }
  return temAr
}


function oneStepRow(array){
  t=checkOptionsx(array)
  if (t!=false){
    ops=t
  }else{
    return false
  }
  let mi=[]
  for (let i=0; i<5; i++){
    if (array[i].indexOf("_")!=-1){
      append(mi,ops[i][1])
    } else{append(mi,len)}
  }
  return ops[mi.indexOf(min(mi))]
}


function oneStepCol(array){
  t=checkOptionsy(array)
  if (t!=false){
    ops=t
  }else{
    return false
  }
  let mi=[]
  for (let i=0; i<5; i++){
    tem=[]
    for (let j=0; j<5; j++){
      append(tem,array[j][i])
    }
    if (tem.indexOf("_")!=-1){
      append(mi,ops[i][1])
    } else{append(mi,len)}
  }
  return ops[mi.indexOf(min(mi))]
}


function checkOptionsx(array){
  rows=[]
  for (let j=0; j<5; j++){
    tem=[]
    for (let i=0; i<5; i++){
      append(tem,array[i][j])
    }
    g=findWordLet(tem)
    if (g.length==0){
      return false
    }
    h=findWordLet(array[j])
    hl=h.length
    if (hl==0){
      return false
    }
    append(rows,[h,hl,j])
  }
  return rows
}

function checkOptionsy(array){
  cols=[]
  for (let j=0; j<5; j++){
    tem=[]
    for (let i=0; i<5; i++){
      append(tem,array[i][j])
    }
    g=findWordLet(tem)
    gl=g.length
    if (gl==0){
      return false
    }
    h=findWordLet(array[j])
    hl=h.length
    if (hl==0){
      return false
    }
    append(cols,[g,gl,j])
  }
  return cols
}

function checkAll(array){
  check=true
  for (let i=0; i<5; i++){
    col = array[0][i]+array[1][i]+array[2][i]+array[3][i]+array[4][i]
    row = array[i][0]+array[i][1]+array[i][2]+array[i][3]+array[i][4]
    if (words.indexOf(row)==-1){
      check=false
    }
    if (words.indexOf(col)==-1){
      check=false
    }
  }
  return check
}

function findWord(w){
  for (let i=0; i<len; i++){
    if (words[i]==w){
      return i
    }
  }
  return -1
}

function findWordLet(arr){
  poss=[]
  for (let i=0; i<len; i++){
    for (let j=0; j<5; j++){
      if (arr[j]=="_"){
      }else if (words[i][j]!=arr[j]){
        break
      }
      if (j==4){
        append(poss,words[i])
      }
    }
  }
  return poss
}
  
function showNotPos(){
  textSize(sz/12)
  text("No possible solution :(", sz/2, sz*1.5)
}

function drawGrid(sol, ofst){
  let ln=sz/7
  textSize(ln/2)
  if(ofst==0){text("Unsolved grid:",sz/2,ln/2)}
  text("Solution:", sz/2, sz+ln/2)
  textSize(ln*0.9)
  for (let i=0; i<5; i++){
    for (let j=0; j<5; j++){
      rect((j+1)*ln, ofst+((i+1)*ln),ln,ln)
      text(sol[i][j],(j+1.5)*ln,ofst+((i+1.5)*ln))
    }
  }
}
