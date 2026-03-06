import { body } from "express-validator";

// проверка на наличие валидного имени
export const nameValidationMiddleware = body("name")
  .trim()
  .isLength({ min: 3, max: 30 })
  .withMessage("имя должно быть от 3 до 30 символов"); // не обязательно
