const svgCaptcha = require("svg-captcha");
const captcha = async (req, res) => {
  try {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      noise: 3, // 干扰线数量
      fontSize: 40, // 字体大小
      width: 150, // 图片宽度
      height: 40, // 图片高度
      color: true, // 随机颜色
      background: "#f5f5f5", // 背景颜色
    });
    req.session.captcha = captcha.text;
    // 设置过期时间60秒
    req.session.cookie.maxAge = 60000;
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
