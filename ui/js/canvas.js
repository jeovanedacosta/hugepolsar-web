  var oImageBuffer = document.createElement('img');
  var oCanvas=document.getElementById("myCanvas");
  var o2DContext=oCanvas.getContext("2d");
  var oRect = {};
  var oROI = {};
  var oLayers = new Array();
  var bDragging = false;
  var bSetROI = false;
  var bSetLayers = false;
  InitMouseEvents();
  /*
  var oSelect = document.getElementById("ImageList");
  oSelect.onchange=function() {
    changeCanvasImage(oSelect[oSelect.selectedIndex].value);
  }
  */
  //DrawImageInCanvas1();
  //DrawImageInCanvas2();
	DrawImageInCanvas3();

  // http://www.html5canvastutorials.com/tutorials/html5-canvas-image-crop/
  function DrawImageInCanvas1() {
	o2DContext = oCanvas.getContext('2d');
	var x = 0;
	var y = 0;
	var width = 450;
	var height = 350;
	var imageObj = new Image();
	imageObj.onload = function() {
		o2DContext.drawImage(imageObj, x, y, width, height);
    };
	imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
  }

  //https://www.filosophy.org/post/31/using_html5_canvas_to_make_a_generative_background/
  function DrawImageInCanvas2() {
		var ctx2 = document.getCSSCanvasContext("2d", "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg", 300, 300);
		  ctx2.globalAlpha = 0.5;
		  ctx2.drawImage(canvas, 0, 0);
  }

  function DrawImageInCanvas3() {
	var bckgCanvas = document.getElementById("canvasBackground");

	//tamanho natural da imagem no elemento de id="canvasBackground"
	var naturalWidth = bckgCanvas.naturalWidth;
	var naturalHeight = bckgCanvas.naturalHeight;
	var urlImage = bckgCanvas.src;


	alert(naturalWidth + "," + naturalHeight + "," + urlImage);

	//agora setar o background no canvas (setando atributos de tamanho e url do background)
	// http://www.w3schools.com/jsref/met_element_setattribute.asp

	var elementoCanvas = document.getElementById("myCanvas");


	elementoCanvas.width = naturalWidth;
	elementoCanvas.height = naturalHeight;
	elementoCanvas.style = "background:url("+urlImage+")";




	//bad - don't work
	//elementoCanvas.setAttribute("width", naturalWidth);
	//elementoCanvas.setAttribute("height", naturalHeight);
	//elementoCanvas.setAttribute("style", "background:url("+ urlImage +")");


  }



  // Canvas event handlers (listeners).
  function InitMouseEvents() {
    oCanvas.addEventListener('mousedown', MouseDownEvent, false);
    oCanvas.addEventListener('mouseup', MouseUpEvent, false);
    oCanvas.addEventListener('mousemove', MouseMoveEvent, false);
    oCanvas.addEventListener('mouseout', MouseOutEvent, false);
  }

  // a��es com mouse
  function MouseDownEvent(e) { //listener apertar bot�o do mouse
    oRect.startX = e.pageX - this.offsetLeft;
    oRect.startY = e.pageY - this.offsetTop;
    bDragging = true;
  }
  function MouseUpEvent() { //listener largar o bot�o do mouse
    bDragging = false;

	//alerta com as coordenadas do ret�ngulo
	//alert("SetROI() : Coordenadas do ROI: " + oROI.startX + "," + oROI.startY + "," + oROI.w + "," + oROI.h);



  }
  function MouseOutEvent() { //listener quando cursor do mouse sair do canvas
    document.getElementById("MouseCoords").innerHTML="";
  }
  function MouseMoveEvent(e) { //listener de movimenta��o com o cursos do mouse
    if (bDragging) {
      oRect.w = (e.pageX - this.offsetLeft) - oRect.startX;
      oRect.h = (e.pageY - this.offsetTop) - oRect.startY;
      oCanvas.getContext('2d').clearRect(0,0,oCanvas.width, oCanvas.height);
      //roi
	  var oROI = document.getElementById("btnROI");

	  //analisar se o elemento ROI est� marcado no Html
      if (oROI.checked) {
        SetROI();
      }
	  //layer
      var oLayer = document.getElementById("btnLAYER");
      if (oLayer.checked) {
        SetLayer();
      }
    }
	// fim das a��es com o mouse

    if (bSetROI) {
      DrawROI();
    }
    if (bSetLayers) {
      DrawLayers();
    }
    // Display the current mouse coordinates.
    ShowMouseCoordinates(e);

	//enquanto apertando, calcular as coordenadas do ROI
	ShowROICoordinates();
  }

  //coordenadas do mouse
  function ShowMouseCoordinates(e) {
    x=e.clientX;
    y=e.clientY;
    document.getElementById("MouseCoords").innerHTML="Coordenadas do MOUSE: (" + x + "," + y + ") " + document.getElementById('txtPatchCount').value;
  }

  //coordenadas da regi�o de interesse
  function ShowROICoordinates(e) {
    document.getElementById("ROICoords").innerHTML="Coordenadas da ROI: (" + oROI.startX + "," + oROI.startY + "," + oROI.w + "," + oROI.h + ")";
  }

  // Interactively draw ROI rectangle(s) on the canvas.
  function SetROI() {
    bSetROI = true;
    oROI.startX = oRect.startX;
    oROI.startY = oRect.startY;
    oROI.w = oRect.w;
    oROI.h = oRect.h;
  }
  function DrawROI() {
    o2DContext.lineWidth=1.5;
    o2DContext.strokeStyle = '#0F0';
    o2DContext.strokeRect(oROI.startX, oROI.startY, oROI.w, oROI.h);

    var iPatches = document.getElementById('txtPatchCount').value;
    o2DContext.beginPath();
    var iTop = oROI.startY;
    var iBottom = oROI.startY + oROI.h;
    var iLeft = oROI.startX;
    var iX = iLeft;
    for (var iPatch=1; iPatch<iPatches; ++iPatch) {
      iX = iLeft + iPatch*oROI.w/iPatches;
      o2DContext.moveTo(iX, iTop);
      o2DContext.lineTo(iX, iBottom);
    }
    o2DContext.lineWidth=0.25;

	//desenhar
	o2DContext.stroke();

  }

  // Interactively draw layer boundaries on the canvas.
  function SetLayer() {
    bSetLayers = true;
    oLayers.length = 0;
    oLayers.push(oRect.startY);
    oLayers.push(oRect.startY + oRect.h);
  }
  function DrawLayers() {
    o2DContext.lineWidth=0.25;
    o2DContext.strokeStyle = '#F00';

    o2DContext.beginPath();
    var iY = oLayers[0];
    var iLeft = 0;
    var iRight = oCanvas.width;
    for (var iLayer=0; iLayer<oLayers.length; ++iLayer) {
      iY = oLayers[iLayer];
      o2DContext.moveTo(iLeft, iY);
      o2DContext.lineTo(iRight, iY);
      o2DContext.stroke();
    }
  }
