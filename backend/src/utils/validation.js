import Joi from "joi";

const CreateNoteSchema = Joi.object({
  title: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
});

export function validateCreateNote(req) {
  return CreateNoteSchema.validate(req, { abortEarly: false });
}

const UpdateNoteSchema = Joi.object({
  title: Joi.string().trim(),
  content: Joi.string().trim(),
});

export function validateUpdateNote(req) {
  return UpdateNoteSchema.validate(req, { abortEarly: false });
}
