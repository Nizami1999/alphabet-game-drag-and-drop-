var alphabet = "abcçdeəfgğhıijklmnoöpqrsştuüvxyz".split("");
var shuffledalphabet = alphabet.slice(0);
shuffle(shuffledalphabet);

var left = document.querySelector(".left");
var right = document.querySelector(".right");

//for creating letters
for (var letter of shuffledalphabet) {
    var span = document.createElement('span');
    span.className = "badge";
    span.innerText = letter;
    span.style.width = 100 / 6 + "%";
    span.setAttribute("draggable", true);
    span.setAttribute("id", letter);
    left.appendChild(span);
    span.style.cursor = "all-scroll";

    span.addEventListener("dragstart", function(e){                              // dragover (drag), dragstart, dragend 
        e.dataTransfer.setData("dragElementId", this.getAttribute("id"));               // is used in order to transfer data
    })
}

//for creating zones
for (let i = 0; i < alphabet.length; i += (alphabet.length) / 4) {
    var dropDiv = document.createElement("div");
    dropDiv.setAttribute("data-min", alphabet[i]);
    dropDiv.setAttribute("data-max", alphabet[i + 7]);
    dropDiv.className = "dropZone";

    var text = document.createElement("p");
    text.innerText = alphabet[i] + " - " + alphabet[i + 7];

    dropDiv.appendChild(text);
    right.appendChild(dropDiv);

    dropDiv.addEventListener("dragover", function (e) {
        e.preventDefault()
    });

    dropDiv.addEventListener("drop", function (e) {
        e.preventDefault()
        var dragId = e.dataTransfer.getData("dragElementId");
        var draggedElement = document.querySelector("#" + dragId);

        var letterIndex = alphabet.indexOf(dragId);
        var minIndex = alphabet.indexOf(this.getAttribute("data-min")); 
        var maxIndex = alphabet.indexOf(this.getAttribute("data-max")); 
        
        if (letterIndex <= maxIndex && letterIndex >= minIndex) {
            this.appendChild(draggedElement);
        } 
        else {
            alert("False place!")
        }
    });
}

// shuffle
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}