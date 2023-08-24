import { handleErrors } from "./handleErrors.middleware";
import {
  checkIdExists,
  validateBody,
  checkNameExists,
} from "./movies.middlewares";
import { pagination } from "./pagination.middleware";

export {
  handleErrors,
  checkIdExists,
  validateBody,
  checkNameExists,
  pagination,
};
