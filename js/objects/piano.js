Piano = function(){

	this.group = new THREE.Object3D();
	this.group.rotation.x = -Math.PI/2;
	this.group.rotation.z = Math.PI;
	
	this.keysMesh = [];

	this.init = function(){
		this.clapetOuvert = false;
		this.clapetState = false;
		
		this.coffreMiniOuvert = false;
		this.coffreMiniState = false;
		
		this.coffreOuvert = false;
		this.coffreState = false;

		this.getMeshs();
		this.addLogoClapet();
		this.clavier = new Clavier(this.keysMesh);
		
		this.group.add(this.clavier.group);
	}

	this.getMeshs = function(){
		piano = MODELS["piano"];

		for(var i = 0; i< piano.children.length; i++ ){
			name = piano.children[i].name;

			if(name == "clapet"){

				this.clapetMesh = piano.children[i].clone();
				this.clapetMesh.material = laqueMaterial;
				this.group.add(this.clapetMesh);

			}else if(name == "coffreMini"){
				var geometry = piano.children[i].geometry.clone();
				var material = piano.children[i].material.clone();
				this.coffreMiniMesh = new THREE.Mesh( geometry, material );

				this.coffreMiniMesh.material = laqueMaterial;
		
			}else if(name == "coffre"){

				this.coffreMesh = piano.children[i].clone();
				this.coffreMesh.material = laqueMaterial;
				this.group.add(this.coffreMesh);

			}else if(name == "bandeauVelour"){

				mesh = piano.children[i].clone();
				mesh.material = velourMaterial;
				this.group.add(mesh);

			}else if(name == "hinge"){
				
				this.hinge = piano.children[i].clone();
				this.hinge.material = letonMaterial;
				



			}else if(name == "tamponClapet"){

				this.tamponClapet = piano.children[i].clone();
				this.tamponClapet.material = tamponClapetMaterial;

			}else if(name == "bord"){

				bord = piano.children[i].clone();
				bord.material = laqueMaterial;

				bord2 = piano.children[i].clone();
				bord2.position.x = 137.3878;
				bord2.material = laqueMaterial;

				this.group.add(bord, bord2);

			}else if(name == "bordMini"){

				bordMini = piano.children[i].clone();
				bordMini.material = laqueMaterial;
				this.group.add(bordMini);

				bordMini2 = cloneAndFlip(bordMini);
				bordMini2.position.z = 72.813;
				bordMini2.position.x = 65.6428;
				bordMini2.position.y = 3.7840;
				this.group.add(bordMini2);

			}else if(name == "pied"){

				pied = piano.children[i].clone();
				pied.material = laqueMaterial;

			}else if(name == "piedBronze"){

				piedBronze = piano.children[i].clone();
				piedBronze.material = bronzeMaterial;

			}else if(name == "supportRoue"){

				supportRoue = piano.children[i].clone();
				supportRoue.material = bronzeMaterial;

			}else if(name == "roue"){

				roue = piano.children[i].clone();
				roue.material = bronzeMaterial;

			}else if(name == "caissonInt"){

				this.caissonInt = piano.children[i].clone();
				this.caissonInt.material = velourMaterial;
				this.group.add(this.caissonInt);

			}else if(name == "sceneMask"){

				this.sceneMask = piano.children[i].clone();

			}else if(name == "pedalLeft"){

				pedalLeft = piano.children[i].clone();
				pedalLeft.material = bronzeMaterial;
				this.group.add(pedalLeft);

			var geometry = pedalLeft.geometry.clone();
			



			}else if(name == "pedalCenter"){

				pedalCenter = piano.children[i].clone();
				pedalCenter.material = bronzeMaterial;
				this.group.add(pedalCenter);


			}else if(name == "pedalRight"){

				pedalRight = piano.children[i].clone();

				pedalRight.material = bronzeMaterial;
				pedalRight.material.side = THREE.DoubleSide






				this.group.add(pedalRight);
			
			}else if(name == "pedalierPied"){

				pedalierPied = piano.children[i].clone();
				pedalierPied.material = laqueMaterial;

				pedalierPied2 = piano.children[i].clone();
				pedalierPied2.position.x = 7;
				pedalierPied2.material = laqueMaterial;

				this.group.add(pedalierPied, pedalierPied2);
			}else if(name == "velourPedal"){
				velourPedal = piano.children[i].clone();
				velourPedal.material = velourMaterial;
				this.group.add(velourPedal);
			}else{
				mesh = piano.children[i].clone();
				mesh.material = laqueMaterial;
				this.group.add(mesh);
			}

		}
		


		this.coffreMesh.add(this.coffreMiniMesh);
		this.coffreMiniMesh.position.x = 68.53;
		this.coffreMiniMesh.position.z = 1;


		pied1 = new THREE.Object3D();
		pied1.add(pied);
		pied1.add(piedBronze);
		groupeRoue = new THREE.Object3D();

		groupeRoue.add(supportRoue);
		groupeRoue.add(roue);
		roue2 = roue.clone();
		groupeRoue.add(roue2);
		roue2.position.x = 65.25;

		pied1.add(groupeRoue);
		groupeRoue.rotation.z = Math.PI/180*50;
		groupeRoue.position.x = 38.5;
		groupeRoue.position.y = -42.5;

		pied2 = pied1.clone();
		pied2.position.x = -128;

		pied3 = pied1.clone();
		pied3.rotation.z = Math.PI/2;
		pied3.position.x = -15;
		pied3.position.y = 110;

		this.group.add(pied1, pied2, pied3);


		for( var j = 0; j<=34; j++){
			mesh = this.hinge.clone();
			mesh.scale.x = 0.1;
			mesh.scale.y = 0.1;
			mesh.scale.z = 0.05;

			mesh.position.x += -(1.9*j);
			mesh.position.y = 0;
			mesh.position.z = 1;

			this.coffreMesh.add(mesh);

			mesh = this.hinge.clone();
			mesh.scale.x = 0.1;
			mesh.scale.y = 0.1;
			mesh.scale.z = 0.05;

			mesh.position.x += -(1.9*j)-71.179;
			mesh.position.y = 0;
			mesh.position.z = 0;
			mesh.rotation.y = Math.PI*1.5;
			mesh.rotation.z = Math.PI;

			this.coffreMiniMesh.add(mesh);
		}


//	this.clapetMesh.add(this.tamponClapet);
}

this.addLogoClapet = function(){
	var material = new THREE.MeshPhongMaterial( {
		color: 0xFFFFFF,
		map: textureLogo,
		transparent: true,
		specular : 0xffc000,
		emissive : 0xc39f32,
		emissiveMap: textureLogoSpec,
		bumpMap: textureLogoBump,
		bumpScale : 1,
		shininess : 50
	} );

	geometry = new THREE.PlaneGeometry(12, 3),
	LOGOPLANE = new THREE.Mesh(geometry, material);
	LOGOPLANE.rotation.x += 180 * Math.PI / 180;
	LOGOPLANE.position.x = -32.7;
	LOGOPLANE.position.y = -3;
	LOGOPLANE.position.z = -0.01;
	
	this.clapetMesh.add(LOGOPLANE);
}

this.switchClapet = function(delta){
	if(this.clapetOuvert){

		if(this.clapetMesh.rotation.x >  -1.6){
			this.clapetMesh.rotation.x -= delta * 1;
		}else{
			this.clapetMesh.rotation.x =  -1.6;
			this.clapetState = false;
		}

	}else{
		if(this.clapetMesh.rotation.x <  0){
			this.clapetMesh.rotation.x += delta * 1;
		}else{
			this.clapetMesh.rotation.x =  0;
			this.clapetState = false;
		}
	}
}

this.switchcoffreMini = function(delta){
	if(this.coffreMiniOuvert){

		if(this.coffreMiniMesh.rotation.x >  -Math.PI){
			this.coffreMiniMesh.rotation.x -= delta * 1;
		}else{
			this.coffreMiniMesh.rotation.x =  -Math.PI;
			this.coffreMiniState = false;
		}

	}else{
		if(this.coffreMiniMesh.rotation.x <  0){
			this.coffreMiniMesh.rotation.x += delta * 1;
		}else{
			this.coffreMiniMesh.rotation.x =  0;
			this.coffreMiniState = false;
		}
	}
}

this.switchCoffre = function(delta){
	if(this.coffreOuvert){

		if(this.coffreMesh.rotation.y >  -0.6){
			this.coffreMesh.rotation.y -= delta * 0.3;
		}else{
			this.coffreMesh.rotation.y =  -0.6;
			this.coffreState = false;
		}

	}else{
		if(this.coffreMesh.rotation.y <  0){
			this.coffreMesh.rotation.y += delta * 0.3;
		}else{
			this.coffreMesh.rotation.y =  0;
			this.coffreState = false;
		}
	}
}


this.update = function(delta){


	if(this.clapetState){
		this.switchClapet(delta);
	}

	if(this.coffreMiniState){
		this.switchcoffreMini(delta);
	}

	if(this.coffreState){
		this.switchCoffre(delta);
	}

	this.clavier.update(delta);
}

this.init();
}


