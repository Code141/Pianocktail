MODELS = [];
manager = new THREE.LoadingManager();

manager.onLoad = function(){
	console.log("ALL RESOURCES FINE LOADED");
	init();
}

manager.onProgress = function(item, loaded, total) {
console.log(item);
}

manager.onStart = function(item, loaded, total) {
console.log(item);
}

loader = new THREE.ColladaLoader(manager);
loader.options.convertUpAxis = true;

function load(name, daePath, size){

	loader.load(daePath, function(collada) {
		dae = collada.scene;
		
		if(typeof size != undefined){
			dae.scale.x = dae.scale.y = dae.scale.z = size;
		}


		MODELS[name] = dae;
	}, function(progress) {
	});
}


load("FrontKey", 'obj/piano/clavier/FrontKey.dae', 1);
load("noire", 'obj/piano/clavier/noire.dae', 1);
load("q1", 'obj/piano/clavier/q1.dae', 1);
load("q2", 'obj/piano/clavier/q2.dae', 1);
load("piano", 'obj/piano/piano.dae', 1);
load("pianoInt", 'obj/piano/pianoInt.dae', 1);
load("rideau", 'obj/piano/rideau.dae', 1);




textureLoader = new THREE.TextureLoader(manager);
// LOGO
textureLogoSpec = textureLoader.load( "textures/pianoktailLogospec.png" );
textureLogo = textureLoader.load( "textures/pianoktailLogo.png" );
textureLogoBump = textureLoader.load( "textures/pianoktailLogoBump.png" );
// FLOOR WOOD
textureWoodFloor = textureLoader.load( "textures/woodFloor.jpg" );