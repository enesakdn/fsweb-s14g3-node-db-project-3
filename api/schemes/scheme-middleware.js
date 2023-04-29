const scheme_model = require("./scheme-model");

/*
  Eğer `scheme_id` veritabanında yoksa:

  durum 404
  {
    "message": "scheme_id <gerçek id> id li şema bulunamadı"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const id = await scheme_model.findById(req.params.scheme_id);
    if (!id) {
      return res.status(404).json({
        message: `scheme_id ${req.params.scheme_id} id li şema bulunamadı`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

/*
  Eğer `scheme_name` yoksa, boş string ya da string değil:

  durum 400
  {
    "message": "Geçersiz scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try {
    req.scheme_name = req.body.scheme_name;
    if (req.scheme_name === undefined || typeof req.scheme_name !== "string") {
      return res.status(400).json({ message: `Geçersiz ${req.scheme_name} ` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

/*
  Eğer `instructions` yoksa, boş string yada string değilse, ya da
  eğer `step_number` sayı değilse ya da birden küçükse:

  durum 400
  {
    "message": "Hatalı step"
  }
*/
const validateStep = (req, res, next) => {
  try {
    req.instructions = req.body.instructions;
    req.step_number = req.body.step_number;

    if (
      (req.instructions =
        undefined ||
        typeof req.instructions !== "string" ||
        typeof req.step_number !== "number" ||
        req.step_number < 1)
    ) {
      res.status(400).json({ message: "Hatalı Step" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
