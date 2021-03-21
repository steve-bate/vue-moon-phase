const moonProps = {
  date: {
    type: Date,
    default: () => new Date(),
  },
  moonSize: {
    type: Number,
    default: 150,
  },
  lang: {
    type: String,
    default: "en",
  },
  texturize: {
    type: Boolean,
    default: true,
  },
  lightColor: {
    type: String,
    default: "rgb(255,255,230)",
  },
  shadeColor: {
    type: String,
    default: "rgb(125,125,110)",
  },
};

export { moonProps }

