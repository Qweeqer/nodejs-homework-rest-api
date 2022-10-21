/* eslint-disable no-undef */
const { User } = require("../models/user");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET_KEY } = process.env;

describe("Auth middlewares test", () => {
  it("Should called next() and added user property to req object", async () => {
    const mockUserId = "123456";
    const token = jwt.sign({ _id: mockUserId }, SECRET_KEY);
    const user = {
      _id: mockUserId,
      email: "volodymyr3@gmail.com",
      token,
    };
    const mReq = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const mRes = {};
    const mockNext = jest.fn();
    jest.spyOn(User, "findById").mockImplementationOnce(async () => user);
    await auth(mReq, mRes, mockNext);
    expect(mReq.mockUserId).toEqual(user.id);
    expect(mockNext).toHaveBeenCalled();
  });
});
