export default {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    [
      "babel-preset-vite",
      {
        env: true,
        glob: false,
      },
    ],
  ],
};
