const collarStyle = document.getElementById("collar-style");
const collarLength = document.getElementById("collar-length");
const mainColor = document.getElementById("main-color");
const accentColor = document.getElementById("accent-color");
const updateButton = document.getElementById("update-preview");

const preview = document.getElementById("collar-preview");

const previewStyle = document.getElementById("preview-style");
const previewLength = document.getElementById("preview-length");
const previewMain = document.getElementById("preview-main");
const previewAccent = document.getElementById("preview-accent");

const colorMap = {
  silver: {
    name: "Silver",
    color: "#c8d3df",
    glow: "rgba(200, 211, 223, 0.5)"
  },

  black: {
    name: "Black",
    color: "#111111",
    glow: "rgba(255, 255, 255, 0.18)"
  },

  blue: {
    name: "Electric Blue",
    color: "#008cff",
    glow: "rgba(0, 140, 255, 0.8)"
  },

  purple: {
    name: "Purple",
    color: "#8f4dff",
    glow: "rgba(143, 77, 255, 0.7)"
  },

  pink: {
    name: "Pink",
    color: "#ff4fb8",
    glow: "rgba(255, 79, 184, 0.7)"
  },

  red: {
    name: "Red",
    color: "#ff3030",
    glow: "rgba(255, 48, 48, 0.7)"
  }
};

const styleNames = {
  single: "Single Row",
  double: "Double Row",
  "center-stripe": "Center Stripe",
  sectioned: "Sectioned Pattern",
  wide: "Wide Collar"
};

function getLinkCount(lengthValue) {
  if (lengthValue === "custom") {
    return 28;
  }

  return Number(lengthValue) * 2;
}

function shouldUseAccent(index, totalLinks, style) {
  if (style === "single") {
    return index % 6 === 0;
  }

  if (style === "double") {
    return index % 4 === 0;
  }

  if (style === "center-stripe") {
    return index >= totalLinks / 2 - 3 && index <= totalLinks / 2 + 3;
  }

  if (style === "sectioned") {
    return (
      index < totalLinks * 0.25 ||
      index > totalLinks * 0.75
    );
  }

  if (style === "wide") {
    return index % 3 === 0;
  }

  return false;
}

function buildPreview() {
  const selectedStyle = collarStyle.value;
  const selectedLength = collarLength.value;
  const selectedMain = mainColor.value;
  const selectedAccent = accentColor.value;

  const totalLinks = getLinkCount(selectedLength);

  preview.innerHTML = "";

  for (let i = 0; i < totalLinks; i++) {
    const link = document.createElement("span");

    link.classList.add("link");

    const useAccent = shouldUseAccent(i, totalLinks, selectedStyle);
    const chosenColor = useAccent ? colorMap[selectedAccent] : colorMap[selectedMain];

    link.style.setProperty("--link-color", chosenColor.color);
    link.style.setProperty("--link-glow", chosenColor.glow);

    preview.appendChild(link);
  }

  previewStyle.textContent = styleNames[selectedStyle];
  previewLength.textContent =
    selectedLength === "custom" ? "Custom Length" : `${selectedLength} inches`;
  previewMain.textContent = colorMap[selectedMain].name;
  previewAccent.textContent = colorMap[selectedAccent].name;
}

updateButton.addEventListener("click", buildPreview);

collarStyle.addEventListener("change", buildPreview);
collarLength.addEventListener("change", buildPreview);
mainColor.addEventListener("change", buildPreview);
accentColor.addEventListener("change", buildPreview);

buildPreview();