let nn = ml5.neuralNetwork({ task: "regression", debug: true });

const btnPredict = document.getElementById("btnPredict");

nn.load("/model/model.json", modelLoaded);

function modelLoaded() {
  console.log("model is done loading");
  btnPredict.addEventListener("click", () => makePrediction());
}

const makePrediction = async () => {
  let battery = parseInt(document.getElementById("battery").value);
  let rearcam = parseInt(document.getElementById("rearcam").value);
  let resolution = parseInt(document.getElementById("resolution").value);
  let ppi = parseInt(document.getElementById("ppi").value);

  let phone = {
    battery: parseInt(battery),
    rearcam: parseInt(rearcam),
    resolution: parseInt(resolution),
    ppi: parseInt(ppi),
  };

  const pred = await nn.predict(phone);
  const price = pred[0].price;
  const fmt = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });
  const fixedPrice = fmt.format(price);

  result.innerHTML = `The price of your phone is ${fixedPrice}`;
};
