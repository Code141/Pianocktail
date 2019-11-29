Water = function(){
	seed = Math.random(); 


	this.chunkSubdivisions = 100;
	this.maxHeight = 10;


	this.vertices = [];

	this.time = 0;

	this.generateChunk = function(){

		this.geometry = new THREE.PlaneGeometry( 140, 185, this.chunkSubdivisions, this.chunkSubdivisions );


		this.material = waterMaterial;

		this.group = new THREE.Mesh( this.geometry, this.material );

		this.group.rotation.x = -Math.PI/2;
		this.group.position.x = 0;
		this.group.position.z = 0;



		// STORE VERTICES
		for(var i = 0; i<this.geometry.vertices.length; i++){
			x = ( i % (this.chunkSubdivisions+1) ) ;
			y = Math.floor( i / (this.chunkSubdivisions+1) );
			
			if(this.vertices[x] === undefined){
				this.vertices[x] = [];
			}
			
			this.vertices[x][y] = this.geometry.vertices[i];

		}

			this.waveIt(0);
		//	this.colorise();

	}

	this.update = function(delta){
			this.waveIt(delta);
		//	this.colorise();

	}

	this.waveIt = function(delta){
		this.time += delta;

		for(var x = 0; x<this.chunkSubdivisions+1; x++){
			for(var y = 0; y<this.chunkSubdivisions+1; y++){

				landFrequance = 50;
				landNoiseFrequance = 10;

				land = noise.simplex2((x+this.time*8) / landFrequance , (y+this.time*8) / landFrequance );
				landNoise = noise.simplex2((x-this.time*2) / landNoiseFrequance, (y-this.time*2) / landNoiseFrequance )/4;
				
				finalNoise = (land+1)/2*((landNoise+1)/2);
				
				this.vertices[x][y].z = finalNoise*this.maxHeight;
			}
		}

		this.geometry.verticesNeedUpdate = true;

	}


	this.colorise = function(){
		for ( var i = 0; i < this.geometry.faces.length; i ++ ) {

			face  = this.geometry.faces[ i ];

			vertexA = this.geometry.vertices[ face[ 'a' ] ];
			vertexB = this.geometry.vertices[ face[ 'b' ] ];
			vertexX = this.geometry.vertices[ face[ 'c' ] ];
			faceHignessFactor = ( (vertexA.z + vertexB.z + vertexX.z) / 3 ) / this.maxHeight;

			//	faceHignessFactor = (faceHignessFactor/4) + 0.2; // GREEN RADIANT
			face.color.setHSL( faceHignessFactor, 0.5, 0.5 );
			this.geometry.colorsNeedUpdate = true;
	
		}


	}


	this.generateChunk();
}