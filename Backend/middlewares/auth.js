// import { User } from "../models/userSchema.js";
// import { catchAsyncErrors } from "./catchAsyncError.js";
// import ErrorHandler from "./error.js";
// import jwt from "jsonwebtoken";

// export const isAuthorised = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return next(new ErrorHandler("User Not Authorized", 401));
//   }
//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//   req.user = await User.findById(decoded.id);

//   next();
// });




import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthorised = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token exists
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ErrorHandler("Token is invalid or expired", 401));
  }

  // Verify user exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  req.user = user;
  next();
});
