let stringFile='';
function showFile(input) {
    let file = input.files[0];
    let reader=new FileReader();
    reader.readAsText(file);
    reader.onload=function() {
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
            console.log(element)
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
        console.log(key,val[key])
        let element=document.createElement(key);
        if(typeof val[key]=="object") {
            element=setAttrib(element,val[key]);
            element.id=`elem${id}`;
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
        elem.setAttribute(attrbt,attributes[attrbt]);
    }
    return elem;
}

function createReference(val) {
    let elem;
    for(key in val) {
        if(typeof val[key]=='object') {
            elem=document.createElement(key);
            elem=setAttrib(elem,val[key]);
        }
        if(key=='text without ref')
            elem=document.createElement('div');
        if(key=='text')
            elem=document.createElement('a');
        if(key=='ref') {
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
