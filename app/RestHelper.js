let $ = require('jquery');

module.exports = {
	get(url){
		return new Promise(function(success,error){
			$.ajax({
				url:url,
				dataType:"json",
				success,
				error
			});
		});
	},
	del(url){
		return new Promise(function(success,error){
			$.ajax({
				url:url,
				type:'DELETE',
				success,
				error
			})
		})
	},
	post(url,data){
		return new Promise(function(success,error){
			$.ajax({
				url,
				type:'POST',
				data,
				success,
				error
			})
		})
	},
	put(url,data){
		return new Promise(function(success,error){
			$.ajax({
				url,
				type:'PUT',
				data,
				success,
				error
			})
		})
	}
}
