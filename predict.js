let nn = ml5.neuralNetwork({ task: "regression", debug: true });
nn.load("/model/model.json", modelLoaded);

function modelLoaded() {
  console.log(nn);
}
