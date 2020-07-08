const UserInput=document.getElementById('inpList');
const btnAdd=document.getElementById('btnAdd');
ShowListUnCompleted();
ShowListCompleted();

//Add Activity
btnAdd.onclick=function BtnClick(){
    const inp=UserInput.value;
    if(UserInput.value !== ''){
        const getTask=localStorage.getItem("UnActivity");
        if(getTask == null){
            AddTask=[];
        }else{
        AddTask=JSON.parse(getTask);
        }
        AddTask.push(inp);
        localStorage.setItem("UnActivity",JSON.stringify(AddTask));
        UserInput.value='';
        ShowListUnCompleted();
        ShowListCompleted();
    }else{
        alert('Enter Activity')
    }
}

//When Click btn-Done
function BtnDoneClick(index){
    //get Activity
    const getTask=localStorage.getItem("UnActivity");
    const storeAsCompleted=JSON.parse(getTask);
    const AddAsCompleted=storeAsCompleted[index];
    //console.log(AddAsCompleted);

    //Add As completed Task
    const getTaskOfCompleted=localStorage.getItem("ComActivity");
    if(getTaskOfCompleted == null){
        AddTaskOfCompleted=[];
    }else{
    AddTaskOfCompleted=JSON.parse(getTaskOfCompleted);
    }
    AddTaskOfCompleted.push(AddAsCompleted);
    localStorage.setItem("ComActivity",JSON.stringify(AddTaskOfCompleted));
    
    //Remove Activity From Uncompleted
    const getUncomTask=localStorage.getItem("UnActivity");
    const DelTask=JSON.parse(getUncomTask);
    DelTask.splice(index,1);
    localStorage.setItem("UnActivity",JSON.stringify(DelTask));
    ShowListUnCompleted();
    ShowListCompleted();
    
}

//Data Show Of UnCompleted Activity
function ShowListUnCompleted(){
    const getTask=localStorage.getItem("UnActivity");
    if(getTask == null){
        AddTask=[];
    }else{
        AddTask=JSON.parse(getTask); 
    }
    const tbl=document.getElementById('display_uncom_list');
    let dis='';
    const show=AddTask.forEach((Activity,index) => {
        dis+=`<tr>
            <td>${index+1}</td>
            <td>${Activity}</td>
            <td><button id="btnDone" 
            onclick="BtnDoneClick(${index})" type="submit" class="btn btn-success">Done</button></td>
            </tr>`;
    });
    tbl.innerHTML=dis;
}

//Data Show Of Completed Activity
function ShowListCompleted(){
    const getTask=localStorage.getItem("ComActivity");
    if(getTask == null){
        AddTask=[];
    }else{
        AddTask=JSON.parse(getTask); 
    }
    const tbl=document.getElementById('display_com_list');
    let dis='';
    const show=AddTask.forEach((Activity,index) => {
        dis+=`<tr>
            <td>${index+1}</td>
            <td>${Activity}</td>
            <td><button id="btnDelete" 
            onclick="BtnDeleteClick(${index})" type="submit" class="btn btn-danger">Delete</button></td>
            </tr>`;
    });
    tbl.innerHTML=dis;
}

//Delete done Activity
function BtnDeleteClick(index){
    const getcomTask=localStorage.getItem("ComActivity");
    const DelComTask=JSON.parse(getcomTask);
    DelComTask.splice(index,1);
    localStorage.setItem("ComActivity",JSON.stringify(DelComTask));
    ShowListUnCompleted();
    ShowListCompleted();
}