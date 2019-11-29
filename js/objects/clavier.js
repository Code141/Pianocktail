Clavier = function(){
	this.group = new THREE.Object3D();

	this.octaves = [];

	this.init = function(){

		for(var i = 0; i<=8; i++){
			octave = new Octave(i);
			this.octaves[i] = octave;
			padding = 0.05;
			P = 2.36+padding;
			octave.group.position.x = i*P*7;
			this.group.add(octave.group);
		}

		this.group.position.z = 72;
		this.group.position.x = -74.7;
		this.group.position.y = -5;

		this.group.rotation.x = Math.PI/2;

	}
	

	this.update = function(delta){
		for(var i = 0; i<=8; i++){
			this.octaves[i].update(delta);
		}
	}
	
	this.init();

}

Octave = function(octaveId){
	this.group = new THREE.Object3D();
	
	this.octaveId = octaveId;

	this.noteName = [
	"do",
	"do#",
	"re",
	"re#",
	"mi",
	"fa",
	"fa#",
	"sol",
	"sol#",
	"la",
	"la#",
	"si" 
	];

	if(octaveId == 0){
		this.noteName = [
		"la",
		"la#",
		"si" 
		];
	}else if(octaveId == 8){

		this.noteName = [
		"do"
		];	
	}


	this.init = function(){
		
		for(var i = 0; i<this.noteName.length; i++){
			note = new Note(octaveId, this.noteName[i], i);
			this.noteName[i] = note;
			this.group.add(note.group);
		}

	}
	

	this.update = function(delta){
		for(var i = 0; i<this.noteName.length; i++){

			this.noteName[i].update(delta);
			
		}
	}

	this.init();

}





Note = function(octaveId, note, noteId){
	this.group = new THREE.Object3D();
	this.group.position.z = -10;
	this.hit = false;
	this.hitState = false;
	this.init = function(){
		Q1 = 1.59;
		Q2 = 1.49;
		F = 1.15;
		padding = 0.05;
		P = 2.36+padding;

		q1 = MODELS["q1"].clone();
		q2 = MODELS["q2"].clone();

	var geometry = q1.children[0].geometry.clone();
	var material = q1.children[0].material.clone();
	frontWoodQ1 = new THREE.Mesh( geometry, material );
	frontWoodQ1.material = woodKeyMaterial;
	frontWoodQ1.rotation.x = -Math.PI/2;

	var geometry = q1.children[1].geometry.clone();
	var material = q1.children[1].material.clone();
	topIvoryQ1 = new THREE.Mesh( geometry, material );
	topIvoryQ1.material = ivoryMaterial;
	topIvoryQ1.rotation.x = -Math.PI/2;

	var geometry = q2.children[0].geometry.clone();
	var material = q2.children[0].material.clone();
	frontWoodQ2 = new THREE.Mesh( geometry, material );
	frontWoodQ2.material = woodKeyMaterial;
	frontWoodQ2.rotation.x = -Math.PI/2;

	var geometry = q2.children[1].geometry.clone();
	var material = q2.children[1].material.clone();
	topIvoryQ2 = new THREE.Mesh( geometry, material );
	topIvoryQ2.material = ivoryMaterial;
	topIvoryQ2.rotation.x = -Math.PI/2;

	q1 = new THREE.Object3D();
	q2 = new THREE.Object3D();


	topIvoryQ1.position.z = -0.1;
	topIvoryQ1.position.y = 2.4;

	topIvoryQ2.position.z = -1.1;
	topIvoryQ2.position.y = 2.4;


q1.add(frontWoodQ1, topIvoryQ1);
q2.add(frontWoodQ2, topIvoryQ2);

	q1.children[0].userData = { octave : octaveId, note : noteId };
	q1.children[1].userData = { octave : octaveId, note : noteId };
	q2.children[0].userData = { octave : octaveId, note : noteId };
	q2.children[1].userData = { octave : octaveId, note : noteId };
	q1.position.z = 10.3;
	q2.position.z = 10.3;



		if(octaveId ==0){

			if(note == "la"){
				this.group.add(q1);	
				console.log(q1)
			}

		}else if(octaveId == 8){
			q2.position.x = P-Q2-padding;
			this.group.add(q2);	
		}

		switch(note) {
			case "do":
			this.buildWhite();
			this.group.add(q1);	
			this.group.position.x = P*0;
			break;

			case "re":
			this.buildWhite();
			q1.position.x = ((P-padding)/2)-(Q1/2);
			this.group.add(q1);	
			this.group.position.x = P*1;
			break;

			case "mi":
			this.buildWhite();
			q1.position.x = P-padding-Q1;
			this.group.add(q1);	
			this.group.position.x = P*2;
			break;

			case "fa":
			this.buildWhite();
			this.group.add(q2);	
			this.group.position.x = P*3;
			break;

			case "sol":
			this.buildWhite();
			q2.position.x = (F/2) - 0.19;
			this.group.add(q2);	
			this.group.position.x = P*4;
			break;

			case "la":
			this.buildWhite();
			q2.position.x = (F/2);
			this.group.add(q2);	
			this.group.position.x = P*5;
			break;

			case "si":
			this.buildWhite();
			q2.position.x = P-Q2-padding;
			this.group.add(q2);	
			this.group.position.x = P*6;
			break;



			case "do#":
			this.buildBlack();
			this.group.position.x = Q1;
			break;

			case "re#":
			this.buildBlack();
			this.group.position.x = ((Q1+padding)*2)+F;
			break;

			case "fa#":
			this.buildBlack();
			this.group.position.x = ((Q1+padding)*3)+(F*2)+(Q2+padding);
			break;

			case "sol#":
			this.buildBlack();
			this.group.position.x = ((Q1+padding)*3)+(F*3)+((Q2+padding)*2)+padding;
			break;

			case "la#":
			this.buildBlack();
			this.group.position.x = ((Q1+padding)*3)+(F*4)+((Q2+padding)*3);
			break;

			default:
			alert("error");
		} 

	}
	
	this.buildWhite = function(){
		FrontKey = MODELS["FrontKey"].clone();


		var geometry = FrontKey.children[0].geometry.clone();
		var material = FrontKey.children[0].material.clone();
		frontwood = new THREE.Mesh( geometry, material );
		frontwood.material = woodKeyMaterial;
	
		var geometry = FrontKey.children[1].geometry.clone();
		var material = FrontKey.children[1].material.clone();
		topIvory = new THREE.Mesh( geometry, material );
		topIvory.material = ivoryMaterial;
	
		var geometry = FrontKey.children[2].geometry.clone();
		var material = FrontKey.children[2].material.clone();
		frontIvory = new THREE.Mesh( geometry, material );
		frontIvory.material = ivoryMaterial;

	white = new THREE.Object3D();
		frontwood.rotation.x = -Math.PI/2;
		topIvory.rotation.x = -Math.PI/2;
		frontIvory.rotation.x = -Math.PI/2;

white.add(frontwood, topIvory,frontIvory);


	frontwood.position.z = 10.3;
	topIvory.position.z = 14.2;
	topIvory.position.y = 2.4;

frontIvory.position.z =15.68,
	frontIvory.position.y = 0.75;

frontIvory.rotation.x = -Math.PI/180;


		white.children[0].userData = { octave : octaveId, note : noteId };
		white.children[1].userData = { octave : octaveId, note : noteId };
		white.children[2].userData = { octave : octaveId, note : noteId };
		this.group.add(white);	
	}

	
	this.buildBlack = function(){
		

blackKey = MODELS["noire"].clone();

		var geometry = blackKey.children[0].geometry.clone();
		var material = blackKey.children[0].material.clone();
	
		black = new THREE.Mesh( geometry, material );
		black.material = ebeneMaterial;
		black.rotation.x = -Math.PI/2;
	
		black.scale.y = dae.scale.y = dae.scale.z = 2.7;
		black.position.x = -1.6;
		black.position.z = 2.1;
		black.position.y = 0.05;

		black.userData = { octave : octaveId, note : noteId };

		this.group.add(black);	


	}





	this.update = function(delta){
		if(this.hitState){
				this.hitKey(delta);
		}
	}

	this.hitKey = function(delta){

	if(this.hit){

		if(this.group.rotation.x >  0){
			this.group.rotation.x -= delta * 1;
		}else{
			this.group.rotation.x =  0;
			this.hit = false;
			this.hitState = false;
		}

	}else{

		if(this.group.rotation.x <  0.1){
			this.group.rotation.x += delta * 1;
		}else{
			this.group.rotation.x =  0.1;
			this.hit = true;

		}
	}
}

	this.init();

}

