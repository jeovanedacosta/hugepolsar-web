    var oCanvas = document.getElementById("SetupImageCanvas");
    var o2DContext = oCanvas.getContext("2d");

    var img = document.getElementById("scream");

    // set default context states
    o2DContext.lineWidth = 1;
    o2DContext.translate(0.50, 0.50); // anti-aliasing trick for sharper lines
    o2DContext.drawImage(img, 0, 0);
    // vars to save user drawings
    var layers = [];
    var currentColor = "black";

    var mouseX;
    var mouseY;

    // vars for dragging
    var bDragging = false;
    var startX, startY;

    // vars for user-selected status
    var $roiCheckbox = document.getElementById("btnROI");
    var $layersCheckbox = false
    var $patches = 1;
    var roiIsChecked = false;
    var layersIsChecked = false;
    var patchCount = 0;

    // listen for mouse events
    oCanvas.addEventListener('mousedown', MouseDownEvent, false);
    oCanvas.addEventListener('mouseup', MouseUpEvent, false);
    oCanvas.addEventListener('mousemove', MouseMoveEvent, false);
    oCanvas.addEventListener('mouseout', MouseOutEvent, false);

    function MouseDownEvent(e) {
        e.preventDefault();
        startX = e.clientX - this.offsetLeft;
        startY = e.clientY - this.offsetTop;
        currentColor = randomColor();
        getStatus();
        bDragging = true;
    }

    function MouseUpEvent(e) {
        if (!bDragging) {
            return;
        }
        e.preventDefault();
        bDragging = false;
        mouseX = e.clientX - this.offsetLeft;
        mouseY = e.clientY - this.offsetTop;
        layers.push({
            x1: startX,
            y1: startY,
            x2: mouseX,
            y2: mouseY,
            color: currentColor,
            drawLayer: layersIsChecked,
            patchCount: patchCount
        });
        draw(layers[0]);
        console.log(layers);
    }

    function MouseOutEvent(e) {
        MouseUpEvent(e);
    }

    function MouseMoveEvent(e) {
        if (!bDragging) {
            return;
        }

        mouseX = e.clientX - this.offsetLeft;
        mouseY = e.clientY - this.offsetTop;
       
       // draw(tempLayer);
        console.log("desenhei!");
    }


    function draw(layer) {
        if (layer.drawLayer) {

            // set context state
            o2DContext.lineWidth = 0.50;
            o2DContext.strokeStyle = layer.color;

            // draw parallel lines
            hline(layer.y1);
            hline(layer.y2);
        }
        if (layer.patchCount > 0) {

            // set context state
            o2DContext.lineWidth = 1.5;
            o2DContext.strokeStyle = '#0F0';

            // draw regions
            o2DContext.strokeRect(layer.x1, layer.y1, (layer.x2 - layer.x1), (layer.y2 - layer.y1));
            var w = layer.x2 - layer.x1;
            o2DContext.beginPath();
            o2DContext.stroke();
        }
    }
    function getStatus() {
        roiIsChecked = $roiCheckbox.checked;
        layersIsChecked = false;
        patchCount = $patches;
        if (!roiIsChecked || !patchCount) {
            patchCount = 0;
        }
    }

    function randomColor() {
        return ('#' + Math.floor(Math.random() * 16777215).toString(16));
    }

    function hline(y) {
        o2DContext.beginPath();
        o2DContext.moveTo(0, y);
        o2DContext.lineTo(oCanvas.width, y);
        o2DContext.stroke();
    }
