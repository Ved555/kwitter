var firebaseConfig = {
    apiKey: "AIzaSyCDKK7F5zkeRz5AsrcnGzCJ87JrLr_bTXg",
    authDomain: "kwitter-test-95ecf.firebaseapp.com",
    databaseURL: "https://kwitter-test-95ecf-default-rtdb.firebaseio.com/",
    projectId: "kwitter-test-95ecf",
    storageBucket: "kwitter-test-95ecf.appspot.com",
    messagingSenderId: "950792171625",
    appId: "1:950792171625:web:7fe1d155beaf117873f2f8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  username = localStorage.getItem("username");
  room_name = localStorage.getItem("room-name");
function Send(){
    msg = document.getElementById("msd").value;
    firebase.database().ref("/").child(room_name).push({
          name: username,
          message: msg,
          like:0
    });
}
function getData(){
    firebase.database().ref("/" + room_name).on('value', function(snapshot){
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot){
            childkey = childSnapshot.key;
            childdata = childSnapshot.val();
            if(childkey != "use"){
                firebase_msg_id = childkey;
                messagedata = childdata;
                name = messagedata['name'];
                message = messagedata['message'];
                like = messagedata['like'];
                name_tag = "<h4>"+name+" <img class='user_tick' src='tick.png'></h4>";
                message_tag = "<h4 class='message_h4'>"+message+"</h4>";
                like_btn = "<button class='btn-primary' id="+firebase_msg_id+" onclick='updateLike(this.id)' value="+like+"><span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span></button><hr>"
                row = name_tag + message_tag + like_btn;
                document.getElementById("output").innerHTML += row;
            }

        })

    })

}
getData();

function updateLike(message_id){
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    update_like = Number(likes)+ 1;
    firebase.database().ref(room_name).child(message_id).update({
        like: update_like
    });
}


function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("room-name");
    window.location.replace("index.html");
}
  