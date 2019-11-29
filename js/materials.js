initMaterials = function(){

	laqueColorMaterial = 0x050505;
	caissonIntColorMaterial = 0xaa0000;
	woodColorMaterial = 0x99743d;
	ivoryColorMaterial = 0xcccccc;
	ebeneColorMaterial = 0x000000;
	velourColorMaterial = 0xaa0000;
	tamponClapetColorMaterial = 0xaa0000;


	laqueMaterial = new THREE.MeshPhongMaterial({
		color : laqueColorMaterial,
		emissive : 0x050505,
		specular : 0x666666,
		shininess : 20
	});

	caissonIntMaterial = new THREE.MeshPhongMaterial({
		color : caissonIntColorMaterial,
		shininess : 0
	});

	woodKeyMaterial = new THREE.MeshPhongMaterial({
		color : woodColorMaterial,
		shininess : 0
	});

	ivoryMaterial = new THREE.MeshPhongMaterial({
		color : ivoryColorMaterial,
		emissive : 0x000000,
		specular : 0xacacac,
		shininess : 1
	});

	ebeneMaterial = new THREE.MeshPhongMaterial({
		color : ebeneColorMaterial,
		emissive : 0x050505,
		specular : 0x555555,
		shininess : 60
	});

	velourMaterial = new THREE.MeshPhongMaterial({
		color : velourColorMaterial,
		shininess : 0
	});

	tamponClapetMaterial = new THREE.MeshPhongMaterial({
		color : tamponClapetColorMaterial,
		shininess : 0
	});

	tamponClapetMaterial = new THREE.MeshPhongMaterial({
		color : tamponClapetColorMaterial,
		shininess : 0
	});

	bronzeMaterial = new THREE.MeshPhongMaterial({
		color : 0x876d48,
		specular : 0xe4d7ab,
		shininess : 5
	});

	letonMaterial = new THREE.MeshPhongMaterial({
		color : 0x877d48,
		specular : 0xe4deab,
		shininess : 5
	});

	debugWireframeMaterial = new THREE.MeshNormalMaterial({
		wireframe : true
	});
	
	waterMaterial = new THREE.MeshPhongMaterial( {
		color : 0x77aa33,
		shading: THREE.FlatShading,
		emissive : 0x000000,
		specular : 0x3c3c3c,
		shininess : 200,
		transparent : false,
		opacity : 0,
		side : THREE.DoubleSide
		});

	
	sceneMaskMaterial = new THREE.MeshPhongMaterial({
		color : 0x22aa22,
		specular : 0xaa22aa,
		shininess : 5
	});

};

