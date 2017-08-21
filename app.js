var database = firebase.database().ref("/")
var input = document.getElementById("demo");
var list = document.getElementById("list");

function add(){
    var user = {
        name: input.value,
    }
    database.child("users").push(user);
    input.value = '';
}


database.child("users").on("child_added", function(snapshot){
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
})

function render(user){
    
    var li = document.createElement("LI");
    var text = document.createTextNode(user.name);
    li.appendChild(text);
    li.setAttribute("id", user.id);
    li.setAttribute("class","list-group-item")
    list.appendChild(li);

    var dltBtn = document.createElement("BUTTON");
    var btnTxt = document.createTextNode("Delete");
    dltBtn.appendChild(btnTxt);
    dltBtn.setAttribute("class","btn btn-danger float-right")
dltBtn.onclick = function(){
remove(user.id)
}
li.appendChild(dltBtn)

//     var edtBtn = document.createElement("BUTTON");
//     var btnTxt = document.createTextNode("Edit");
//     edtBtn.appendChild(btnTxt);
//     edtBtn.setAttribute("class","btn btn-danger float-right")
// edtBtn.onclick = function(){
// edit(user.id)
// }
// li.appendChild(edtBtn)


}

function remove(key)
{
    database.child("users/"+ key).remove();
}

database.child("users").on("child_removed",function(data){
    var dltLi = document.getElementById(data.key);
    dltLi.remove();
})

