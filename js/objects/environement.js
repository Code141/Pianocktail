Environement = function(){
	this.group = new THREE.Object3D();

	textureWoodFloor.wrapS = THREE.RepeatWrapping;
	textureWoodFloor.wrapT = THREE.RepeatWrapping;
	textureWoodFloor.repeat.set( 12, 24 );

	var material = new THREE.MeshPhongMaterial( {
		color: 0xFFFFFF,
		map: textureWoodFloor,
		transparent: true,

		emissiveMap: textureWoodFloor,
		bumpMap: textureWoodFloor,
		bumpScale : 1,
		shininess : 50
	} );

	geometry = new THREE.PlaneGeometry(3000, 3000),
	floortextured = new THREE.Mesh(geometry, material);
	floortextured.rotation.x = Math.PI*1.5;

	this.group.add(floortextured);



	for(var i = 0; i<32; i++){
		rideau = MODELS["rideau"].clone();
		rideau.children[0].material = velourMaterial;
		rideau.rotation.x = -Math.PI/2;
		rideau.rotation.z = Math.PI;
		rideau.rotation.z = (Math.PI*2/64)*i+Math.PI/2;
		rideau.scale.y = 1;
		rideau.scale.z = 1;

		this.group.add(rideau);
	}


}


BasicQuadLight = function(){

	this.group = new THREE.Object3D();

	LightColorNeSo = 0xedfaff;
	LightColorNoSe = 0xfff0dd;



//	var light = new THREE.AmbientLight( 0x202020 ); // soft white light
//	this.group.add( light );

	var lightNE = new THREE.PointLight( LightColorNeSo, 0.8, 1000 );
	lightNE.position.set( 0, 300, 0 );
	this.group.add(lightNE);
//	var lightNE = new THREE.PointLight( LightColorNeSo, 0.5, 700 );
//	lightNE.position.set( -200, 500, -100 );
//	
//	var lightNO = new THREE.PointLight( LightColorNoSe, 0.5, 700 );
//	lightNO.position.set( 200, 500, -100 );
//
//	var lightSE = new THREE.PointLight( LightColorNoSe, 0.5, 700 );
//	lightSE.position.set( -200, 500, 300 );
//
//	var lightSO = new THREE.PointLight( LightColorNeSo, 0.5, 700 );
//	lightSO.position.set( 200, 500, 300 );
//	this.group.add( lightNE, lightNO, lightSE, lightSO );
//
//	var pointLightHelperNE = new THREE.PointLightHelper( lightNE, 10 );
//	var pointLightHelperNO = new THREE.PointLightHelper( lightNO, 10 );
//	var pointLightHelperSE = new THREE.PointLightHelper( lightSE, 10 );
//	var pointLightHelperSO = new THREE.PointLightHelper( lightSO, 10 );
//
//	this.group.add( pointLightHelperNE, pointLightHelperNO, pointLightHelperSE, pointLightHelperSO );


	spotLight = new THREE.SpotLight( 0xffffff, 150, 1500, Math.PI/7, 5 );
	this.group.add( spotLight.target );

	spotLight.position.set( -400, 500, -300 );
	spotLight.target.position.set(100, 0, 300);


	this.group.add(spotLight);

//	var pointLightHelperSO = new THREE.SpotLightHelper( spotLight, 10 );
//	this.group.add(pointLightHelperSO);

}
