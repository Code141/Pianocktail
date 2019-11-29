function keyboardState(delta){
	keyboard.update();
	if ( keyboard.down("W")){ 
		wireFrame();
	}

	if (keyboard.down("A")){
		piano.clapetOuvert = !piano.clapetOuvert;
		piano.clapetState = true;
	}

	if (keyboard.down("Z")){
		piano.coffreMiniOuvert = !piano.coffreMiniOuvert;
		piano.coffreMiniState = true;
	}

	if (keyboard.down("E")){
		piano.coffreOuvert = !piano.coffreOuvert;
		piano.coffreState = true;
	}

	if (keyboard.down("1")){
		SCENEEXT = !SCENEEXT;
	}


}


window.addEventListener("keypress", toggleFullScreen); 

function toggleFullScreen(e){
	if(e.key == "f"){
		if(!THREEx.FullScreen.activated()){
			THREEx.FullScreen.request();
	
		}else{
			THREEx.FullScreen.cancel();
		}
	}
}

function onMouseMove( event ) {
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	
	raycaster.setFromCamera( mouse, camera );

	// See if the ray from the camera into the world hits one of our meshes
	var intersects = raycaster.intersectObject( piano.clavier.group, true );
	// Toggle rotation bool for meshes that we clicked
	//console.log(intersects);
	if ( intersects.length > 0 ) {

		if ( INTERSECTED != intersects[ 0 ].object ) {
			INTERSECTED = intersects[ 0 ].object;
		}

	} else {


		INTERSECTED = null;

	}

}
wireframe = false;

wireFrame = function(){

	if(!wireframe){
		scenePianoExt.overrideMaterial = debugWireframeMaterial;
	}else{
		scenePianoExt.overrideMaterial = false;
	}

	renderer.setClearColor( 0x888888 );

	wireframe = !wireframe;
}