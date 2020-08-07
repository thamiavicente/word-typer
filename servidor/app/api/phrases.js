var api = {};

var phrases = [
	{_id: 1, textPhrase:'If you want to say hello, you can use "Oi!" or "Olá!"', time: 8 },
	{_id: 2, textPhrase:'When someone does something nice for you, use "Obrigada" if you are woman and "Obrigado" if you are man.',time: 18 },
	{_id: 3, textPhrase:'If you do something bad, you apologize saying "Desculpe"', time: 10 },
	{_id: 4, textPhrase:'For have something, you have to say "Por favor"', time: 7 },
	{_id: 5, textPhrase:'To know the hours, say "Que horas são?"', time: 6 },
	{_id: 6, textPhrase:'If you are lost, you asks information saying "Onde fica?"', time: 9 },
	{_id: 7, textPhrase:'For find a place to eat, you asks for a "Restaurante"', time: 8 },
	{_id: 8, textPhrase:'The place where you sleep/stay at a trip is a "Hotel"', time: 8 },
	{_id: 9, textPhrase:'Some people does not know, but the capital of Brasil is Brasilia (not Rio de Janeiro)', time: 15},
	{_id: 10, textPhrase:'If you go to Brasil, you have to try feijoada, tapioca, and brigadeiro, of course!', time: 13},
	];

api.lista = function(req, res) {

	setTimeout(function(){
		if(req.query.id) return res.json(phrases[req.query.id]);

		res.json(phrases);
	},1500);

};

module.exports = api;
