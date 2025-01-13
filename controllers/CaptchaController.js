const svgCaptcha = require("svg-captcha");
const captcha = async (req, res) => {
  try {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      noise: 3, // 干扰线数量
      fontSize: 50, // 字体大小
      width: 150, // 图片宽度
      height: 50, // 图片高度
      color: true, // 随机颜色
      background: "#f5f5f5", // 背景颜色
    });
    req.session.captcha = captcha.text;
    res.send({
      code: 200,
      data: {
        captchaImg: captcha.data,
        captchaText: captcha.text,
      },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  captcha,
};
