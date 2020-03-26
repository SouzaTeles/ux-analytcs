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
trackClickStream();
