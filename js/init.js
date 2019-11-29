function init(){
	console.log("---INIT---");
	var renderer, scenePianoExt, camera, clock;

	INTERSECTED = null;
	SCENEEXT = true;
	animatorBattery = [];

	DEV = true;

	if ( ! Detector.webgl ){
		Detector.addGetWebGLMessage();
	}else{
		container = document.getElementById( 'threeContainer' );
		initThreeJs( container );
		fillscene();
		update();
	}
}

function initThreeJs( container ){

	/* --------- BASICS ----------*/
	
	clock = new THREE.Clock();


	scenePianoExt = new THREE.Scene();
	scenePianoExt.fog = new THREE.Fog( 0x000000, 800, 1600 );
	
	scenePianoInt = new THREE.Scene();
	scenePianoInt.fog = new THREE.Fog( 0x0000ff, 200, 1200 );


	sceneMask1 = new THREE.Scene();
	sceneMask1.fog = new THREE.Fog( 0x00ff00, 200, 1200 );
	sceneMask2 = new THREE.Scene();
	sceneMask2.fog = new THREE.Fog( 0x00fFFF, 200, 1200 );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 5000 );

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );
	renderer.setClearColor( 0xff0000 );
	renderer.autoClear = false;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );


	container.appendChild( renderer.domElement );


	container.appendChild( renderer.domElement );
	
	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}


	/* -------- DEV TOOLS --------*/

	if(DEV){

		//STATS
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );

		//ORBIT CONTROL
		controls = new THREE.OrbitControls( camera );
		controls.target.set( 0, 60, 30 );
		controls.update();

		//GRID HELPER
	//	var gridHelper = new THREE.GridHelper( 100, 1 );
	//	scenePianoExt.add( gridHelper );

		//AXIS HELPER
		var axisHelper = new THREE.AxisHelper( 5 );
		scenePianoExt.add( axisHelper );

	}

	keyboard = new KeyboardState();
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	container.addEventListener( 'mousemove', onMouseMove, false );




}


/* ------ INIT OBJ HERE ------*/

fillscene = function(){


	camera.position.y = 150;
	camera.position.z = -750;

camera.position.set(1035, 400, -1100);

	camera.lookAt( new THREE.Vector3( 0, 60, 30 ) );
	
	initMaterials();
	

	// INIT PIANO EXT
	light = new BasicQuadLight();
	scenePianoExt.add(light.group);

	piano = new Piano();
	scenePianoExt.add(piano.group);
/*
	water = new Water();
	water.group.position.y = 85;
	water.group.position.z = 103;
	water.group.position.x = -0;
//	water.group.position.y = 85;
	scenePianoExt.add(water.group);
*/
	Environement = new Environement();
	scenePianoExt.add(Environement.group);


	// INIT PIANO INT
	pianoInt = MODELS["pianoInt"].clone();
	pianoInt.children[0].material = velourMaterial;
	pianoInt.rotation.x = -Math.PI/2;
	pianoInt.rotation.z = Math.PI;
	pianoInt.scale.y = 1;
	pianoInt.scale.z = 1;
	scenePianoInt.add(pianoInt);

	light = new BasicQuadLight();
	scenePianoInt.add(light.group);

	sceneMaskMesh = piano.sceneMask;

	sceneMaskMesh.rotation.x = Math.PI/2;
	sceneMaskMesh.rotation.y = Math.PI;
	sceneMaskMesh.position.x = 72;
	sceneMaskMesh.position.y = 85;
	sceneMaskMesh.position.z = 54;
	sceneMaskMesh.material = sceneMaskMaterial;
//	scenePianoExt.add(sceneMaskMesh);


/* TEXTURING
	sceneMaskMesh = piano.sceneMask;
	sceneMaskMesh.rotation.x = Math.PI/2;
	sceneMaskMesh.rotation.y = Math.PI;
	sceneMaskMesh.position.x = 72;
	sceneMaskMesh.position.y = 85;
	sceneMaskMesh.position.z = 54;
		
	firstRenderTargetExt = new THREE.WebGLRenderTarget(  window.innerWidth, window.innerHeight, { format: THREE.RGBFormat, antialias:true, clearColor : 0x00FF00 } );	
	secondRenderTargetExt = new THREE.WebGLRenderTarget(  window.innerWidth, window.innerHeight, { format: THREE.RGBFormat, antialias:true, clearColor : 0x00FF00 } );	

	var screenMaterial = new THREE.MeshBasicMaterial( { map: secondRenderTargetExt } );

	sceneMaskMesh.material = screenMaterial;
	
	scenePianoExt.add(sceneMaskMesh);


	plane = new THREE.Mesh( new THREE.PlaneGeometry( 500, 500, 4, 4 ), screenMaterial );
	plane.position.set( 0, 90, 50 );
	plane.rotation.set( Math.PI/2, Math.PI, 0 );
	scenePianoExt.add( plane );
*/







/*-----------------------*/
/*-----------------------*/
/*-------TEST ZONE-------*/
/*-----------------------*/
/*-----------------------*/

	// MAKE SCENE MASK

	//sceneMaskMesh = piano.sceneMask;
	//sceneMaskMesh.rotation.x = Math.PI/2;
	//sceneMaskMesh.rotation.y = Math.PI;
	//sceneMaskMesh.position.x = 72;
	//sceneMaskMesh.position.y = 85;
	//sceneMaskMesh.position.z = 54;
	//sceneMask1.add(sceneMaskMesh);
	//sceneMask2.add(piano.group.clone());

//	firstRenderTargetExt = new THREE.WebGLRenderTarget(  window.innerWidth, window.innerHeight, { format: THREE.RGBFormat, antialias:true } );	
//	secondRenderTargetExt = new THREE.WebGLRenderTarget(  window.innerWidth, window.innerHeight, { format: THREE.RGBFormat, antialias:true } );//
//	firstRenderTargetInt = new THREE.WebGLRenderTarget(  window.innerWidth, window.innerHeight, { format: THREE.RGBFormat, antialias:true } );	
//	secondRenderTargetInt = new THREE.WebGLRenderTarget(  window.innerWidth, window.innerHeight, { format: THREE.RGBFormat, antialias:true } );//
//	var clearPass = new THREE.ClearPass();//
//	var clearMaskPass = new THREE.ClearMaskPass();
//	var maskPass1 = new THREE.MaskPass( sceneMask1, camera );
//	var maskPass2 = new THREE.MaskPass( sceneMask2, camera );
//	var texture1 = new THREE.TextureLoader().load( 'textures/woodFloor.jpg' );
//	var texturePass1 = new THREE.TexturePass( firstRenderTargetInt );
//	var texturePass2 = new THREE.TexturePass( firstRenderTargetExt );
//	var outputPass = new THREE.ShaderPass( THREE.CopyShader );
//	outputPass.renderToScreen = true;
//	var parameters = {
//		minFilter: THREE.LinearFilter,
//		magFilter: THREE.LinearFilter,
//		format: THREE.RGBFormat,
//		stencilBuffer: true,
//		antialias: true
//	};
//	var renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, parameters );
//	composer = new THREE.EffectComposer( renderer, renderTarget );
//	composer.addPass( clearPass );
//	composer.addPass( maskPass2 );
//	composer.addPass( texturePass2 );
//	composer.addPass( clearMaskPass );
//	composer.addPass( maskPass1 );
//	composer.addPass( texturePass1 );
//	composer.addPass( clearMaskPass );
//	composer.addPass( outputPass );




}


/* ------ ANIMATION LOOP ------*/
time = 0;
update = function(){
	var delta = clock.getDelta();
	time += delta;
	requestAnimationFrame( update );

	if(DEV){
		stats.update();
	}

	keyboardState(delta);

	for(var key in animatorBattery){
		animatorBattery[key].update(delta);
	}

//plane.rotation.z = -camera.rotation.y;
//console.log(camera);


	piano.update(delta);
//	water.update(delta);



	if(INTERSECTED){
		octaveId = INTERSECTED.userData.octave;
		note = INTERSECTED.userData.note;
	//	console.log("INTERSECTED : { octaveId : "+octaveId+", note : "+note+" };");
		piano.clavier.octaves[octaveId].noteName[note].hitState = true;
	}

	render();
}

render = function(){


	//masking
//	renderer.render( scenePianoExt, camera, firstRenderTargetExt, true );
//	renderer.render( scenePianoExt, camera, secondRenderTargetExt, true );
//
//	renderer.render( scenePianoInt, camera, firstRenderTargetInt, true );
//	renderer.render( scenePianoInt, camera, secondRenderTargetInt, true );
//
//	renderer.clear();
//	composer.render( time );
	//texturing
//	renderer.render( scenePianoInt, camera, firstRenderTargetExt, true );
//	renderer.render( scenePianoInt, camera, secondRenderTargetExt, true );
	if(SCENEEXT){
		renderer.render( scenePianoExt, camera );

	}else{
		renderer.render( scenePianoInt, camera );
	}
}


