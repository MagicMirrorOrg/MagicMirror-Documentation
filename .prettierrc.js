{
}

/** @type import("prettier").Options */
const config = {
  ...require("prettier-config-vuepress"),
};

config.proseWrap = "always";
config.singleQuote = false;
config.semi = true;

module.exports = config;
