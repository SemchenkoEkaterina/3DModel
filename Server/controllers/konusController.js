const ApiError = require('../error/apiError');

class KonusController {

	async getAll(req, res, next) {
		try {
			const { radius, height, n } = req.query;
			const POINT3D = function(x, y, z) { this.x = x; this.y = y; this.z = z; };
            let vertices = [];
			let edges = [];
			for (let i = 0; i < n; i++) {
				vertices.push(new POINT3D(Number(radius)*Math.cos(2*Math.PI*i/n), Number(radius)*Math.sin(2*Math.PI*i/n), 0));
				if (i<n-1){
					edges.push([i, i+1, Number(n)]);
				}
			};
			let b = new POINT3D(0,0, - (radius*radius)/height)
			let normal = vertices.map(function(v){
				let norm = Math.sqrt(Math.pow(v.x-b.x,2)+Math.pow(v.y-b.y,2)+Math.pow(v.z-b.z,2));
				return [new POINT3D(0/norm,0/norm, (- (radius*radius)/height)/norm), new POINT3D(v.x/norm,v.y/norm, v.z/norm)]
			});
			vertices.push(new POINT3D(0, 0, Number(height)));
			edges.push([n-1, 0, Number(n)]);
			return res.json([vertices, edges, normal]);
		} catch (error) { 
			next(ApiError.badRequest(error.message));
		}

	}
}

module.exports = new KonusController();