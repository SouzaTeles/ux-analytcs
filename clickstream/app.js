console.log("teste");

const trackClickStream = () => {
  const data = [];
  const pushEventData = ({ pageX, pageY, type }) => {
    data.push({
      time: Date.now(),
      x: pageX,
      y: pageY,
      type: type
    });
  };
  document.addEventListener("mousemove", pushEventData);
  document.addEventListener("click", pushEventData);
  return data;
};

const paintLive = (data, max = 5) => {
  const heatmap = h337.create({
    container: document.documentElement
  });
  const update = () => {
    heatmap.setData({
      max,
      data
    });
  };
  setInterval(() => {
    update(data);
  }, 10);
};

const postData = (url, data) => {
  const name = Date.now();
  fetch(`${url}/?name=${name}`, {
      method: "POST",
      headers: {
          "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
  });
};

const data = trackClickStream();
window.onbeforeunload = () => postData("http://localhost:3001/api", data)
paintLive(data);
