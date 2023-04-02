let nn = ml5.neuralNetwork({ task: "regression", debug: true });

const battery = document.getElementById("battery");
const screenSize = document.getElementById("screenSize");
const rearcam = document.getElementById("rearcam");
const ppi = document.getElementById("ppi");

const btnPredict = document.getElementById("btnPredict");

nn.load("/model/model.json", modelLoaded);

function modelLoaded() {
  console.log("model is done loading");
}

btnPredict.addEventListener("click", () => {
  makePrediction().then((pred) => showPrediction(pred));
});

async function makePrediction() {
  let pred;
  try {
    const batteryVal = battery.value;
    const screenSizeVal = screenSize.value;
    const rearcamVal = rearcam.value;
    const ppiVal = ppi.value;

    const phone = {
      battery: Number(batteryVal),
      screenSize: Number(screenSizeVal),
      rearcam: Number(rearcamVal),
      ppi: Number(ppiVal),
    };
    console.log(phone);

    pred = await nn.predict(phone);
  } catch (e) {
    console.error(e);
  }
  return pred;
}

function showPrediction(pred) {
  //   const fmt = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });
  //   console.log(fmt.format(pred[0]));
  console.log(pred);
}
