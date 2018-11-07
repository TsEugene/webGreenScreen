var fImg = null;
var fWidth = null;
var fHeight = null;
var backImg = null;

function loadForegroundImage(){
    fImg = new SimpleImage(document.getElementById("fFile"));
    fImg.drawTo(fCanvas);  
    fWidth = fCanvas.width;
    fHeight = fCanvas.height;
}

function loadBackgroundImage(){
    backImg = new SimpleImage(document.getElementById("bFile"));
    backImg.drawTo(bCanvas);
}

function doGreenScreen(){
    if(fImg == null || !fImg.complete()){
        alert("please upload a foreground image");
        return;
    }
    if(backImg==null || !backImg.complete()){
        alert('please upload a background image');
        return;
    }
    var output = new SimpleImage(fImg.getWidth(), fImg.getHeight());
    for(var pixel of fImg.values()){
        var x =pixel.getX();
        var y =pixel.getY();
        if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()){
            var backPixel = backImg.getPixel(x,y);
            output.setPixel(x,y,backPixel);
        }
        else{
            output.setPixel(x,y,pixel);
        }
    }
    clearCanvas();
    output.drawTo(fCanvas);
}


function clearCanvas(){
    var fCtx = fCanvas.getContext("2d");
    fCtx.clearRect(0,0,fCanvas.width,fCanvas.height);
    fImg = null;
    var bCtx = bCanvas.getContext("2d");
    bCtx.clearRect(0,0,bCanvas.width,bCanvas.height);
    backImg = null;
}