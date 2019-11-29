function cloneAndFlip(mesh){
			var geometry = mesh.geometry.clone();
			var material = mesh.material.clone();
			var meshClone = new THREE.Mesh( geometry, material );

			var mS = (new THREE.Matrix4()).identity();
			mS.elements[0] = -1;
			meshClone.geometry.applyMatrix(mS);
			
			meshClone.geometry.verticesNeedUpdate = true;
			meshClone.geometry.normalsNeedUpdate = true;
			meshClone.geometry.computeVertexNormals();
			meshClone.geometry.computeBoundingSphere();
			meshClone.geometry.computeFaceNormals();
			meshClone.geometry.computeVertexNormals();
			meshClone.material.side = THREE.DoubleSide;
		return meshClone;
}