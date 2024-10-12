
module.exports = async function (request, response) {
  const info = request.data.data
  console.log('Entro al home', info)
  return response.render("home.html", info);
};
