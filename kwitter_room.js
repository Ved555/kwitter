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
    document.getElementById("username").innerHTML = "Welcome " + username + " !😁";

    function addRoom(){
        room_name = document.getElementById("room_name").value; 
        localStorage.setItem("room-name" , room_name); 
        firebase.database().ref("/").child(room_name).update({
              use: "This is just for confirmation"
        });
        window.location = "kwitter_page.html";
    }
function getData() {firebase.database().ref("/").on('value', function(snapshot) {
      document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      row = "<div class='room_name' id="+Room_names+" onclick='redirect(this.id)' ># "+ Room_names +"</div> <hr></hr>";
      document.getElementById("output").innerHTML += row;



      //End code
      });});}
getData();
function redirect(name){
      localStorage.setItem("room_name" , name);
      window.location = "kwitter_page.html";
}
function Logout(){
      localStorage.removeItem("username");
      window.location = "index.html";
}
