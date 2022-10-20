const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  try {
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    await Jimp.read(resultUpload)
      .then(async (avatar) => {
        return await avatar.resize(250, 250).write(resultUpload);
      })
      .catch((err) => {
        console.error(err);
      });
    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlinkSync(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
