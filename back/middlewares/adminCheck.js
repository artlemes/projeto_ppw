import ServerError from "../ServerError.js";
import { TOKEN_ERROR } from "../constants/errorCodes.js";

export const adminCheck = (req, res, next) => {
  if (req.userRole !== "admin") {
    throw new ServerError(TOKEN_ERROR.FORBIDDEN_ACCESS);
  }
  next();
};
