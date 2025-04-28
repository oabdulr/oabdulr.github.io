function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(135, 206, 235);
    fill("red");
    circle(70, 60, 90);
   
    fill("green");
    rect(0, 200, 600, 200);
   
    textSize(75);
    text("🥀", 100, 300); 
    text("🥀", 170, 300); 
    text("🥀", 230, 300); 
    text("🥀", 300, 300); 
    text("🥀", 370, 300); 

    text("🐄", mouseX - 50, mouseY + 20); 
    text("🐄", mouseX - 150, mouseY + 20); 
    text("🐖", mouseX - 250, mouseY + 20); 
    text("🦍", mouseX - 350, mouseY + 20); 
    text("🐄", mouseX - 450, mouseY + 20);

}