const currentUser = async (req, res, next) => {
  const { email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription: req.user.subscription,
      },
    },
  });
};

module.exports = currentUser;
