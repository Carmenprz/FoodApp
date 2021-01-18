// modal 

const modal = document.getElementById("myModal"); 
const btn = document.getElementById("myBtn"); 
const close = document.getElementById("close"); 

btn.onclick = function() {
    modal.style.display = "flex"; 
}

close.onclick = function() {
    modal.style.display = "none"; 
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; 
    }
}
