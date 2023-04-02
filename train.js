let nn = ml5.neuralNetwork({ task: "regression", debug: true });
let testData;
let trainData;

const btnStart = document.getElementById("btnStart");
const btnSave = document.getElementById("btnSave");

btnStart.addEventListener("click", () => {
  console.log("Start training");
  if (nn) startTraining();
});

btnSave.addEventListener("click", () => {
  nn.save();
});

function loadData() {
  Papa.parse("./data/cars.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (results) => addData(results.data),
  });
}

function addData(data) {
  console.table(data);
  data.sort(() => Math.random() - 0.5);
  trainData = data.slice(0, Math.floor(data.length * 0.8));
  testData = data.slice(Math.floor(data.length * 0.8) + 1);
  for (let car of trainData) {
    nn.addData({ horsepower: car.horsepower, weight: car.weight, cylinders: car.cylinders }, { mpg: car.mpg });
  }
  nn.normalizeData();
}

function startTraining() {
  nn.train({ epochs: 25 }, () => finishedTraining(testData));
}

async function finishedTraining() {
  console.log("Finished training!");
  makePrediction(testData);
}

async function makePrediction() {
  const testCar = { horsepower: testData[0].horsepower, weight: testData[0].weight, cylinders: testData[0].cylinders };
  const pred = await nn.predict(testCar);
  console.log(pred[0].mpg);
  console.log(pred);
}

loadData();
