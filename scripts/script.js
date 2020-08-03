let stringFile='';
function showFile(input) {
    let file = input.files[0];
    let reader=new FileReader();
    reader.readAsText(file);
    reader.onload=function() {
        document.getElementById('file').style.display='none';
        stringFile=reader.result;
        forma=JSON.parse(stringFile);
        for(key in forma) {
            createForm(key,forma[key]);
        }
    };
}

function createForm(key,val) {
    switch(key) {
        case 'name' : {
            let element=document.createElement('div');
            element.innerHTML=val;
            document.getElementById('name').appendChild(element);
            break;
        }
        case 'fields' : {
            for(let i=0;i<val.length;i++) {
                createField(val[i]);
                id++
            }
            break;
        }
        case 'references' : {
            for(let i=0;i<val.length;i++) {
                createReference(val[i]);
            }
            break;
        }
        case 'buttons' : {
            for(let i=0;i<val.length;i++) {
                createReButtons(val[i]);
            }
            break;
        }
    }
}
let id=0;
function createField(val) {
    for(key in val) {
        let element=document.createElement(key);
        if(typeof val[key]==="object") {
            element.id=`elem${id}`;
            element=setAttrib(element,val[key]);
        }
        else {
            element.setAttribute('for',`elem${id}`);
            element.innerHTML=val[key];
        }
        document.getElementById('fields').appendChild(element);
    }
}

function setAttrib(elem,attributes) {
    for(attrbt in attributes) {
        if((attrbt==='technologies')||(attrbt==='colors')) {
            createSelect(attributes[attrbt]);
            elem.setAttribute('disabled',true);
        }
        if(attrbt==='mask')createMask(attributes[attrbt],elem);
        if(attributes[attrbt]==='textarea')elem=createTextArea();
        elem.setAttribute(attrbt,attributes[attrbt]);
    }
    return elem;
}

function createReference(val) {
    let elem;
    for(key in val) {
        if(typeof val[key]==='object') {
            elem=document.createElement(key);
            elem=setAttrib(elem,val[key]);
        }
        if(key==='text without ref')
            elem=document.createElement('div');
        if(key==='text')
            elem=document.createElement('a');
        if(key==='ref') {
            elem.setAttribute('href',val[key]);
            break;
        }
        elem.innerHTML=val[key];
        document.getElementById('references').appendChild(elem);
    }
}

function createReButtons(val) {
    button=document.createElement('button');
    button.className='btn btn-primary';
    button.innerHTML=val.text;
    document.getElementById('buttons').appendChild(button);
}
let kostil=0;
function createSelect(arr) {
    kostil=id;
    let elem=document.createElement('select');
    elem.setAttribute('onclick','toInput(value)');
    elem.setAttribute('multiple',true);
    document.getElementById('fields').appendChild(elem);
    for(let i=0;i<arr.length;i++) {
        let opt=document.createElement('option');
        opt.setAttribute('value',arr[i]);
        console.log(arr[i],arr[i].indexOf('#'))
        if(arr[i].split('')[0]==='#') {
            opt.style.backgroundColor=arr[i];
            opt.style.width=20+'px';
        }
        else opt.innerHTML=arr[i];
        elem.appendChild(opt);
    }
}

function toInput(val) {
    if(document.getElementById(`elem${kostil}`).value.split(' ').includes(val))return;
    if(val.split('')[0]==='#')document.getElementById(`elem${kostil}`).value=val;
    else document.getElementById(`elem${kostil}`).value+=' '+ val;
    
}

function createMask(mask,elem) {
    $(function(){
        elem.removeAttribute('type');
        $(elem).mask(mask);
      });
}

function createTextArea() {
    let elem=document.createElement('textarea');
    document.getElementById('fields').appendChild(elem);
    return elem;
}
