import { Joi, validate } from 'express-validation';

export const GetContractValidation = validate({
  params: Joi.object({
    id: Joi.string().required()
  })
});

export const GetJobPaidValidation = validate({
  params: Joi.object({
    paidStatus: Joi.string()
      .valid('paid', 'unpaid')
      .required()
  })
});

export const ProcessJobPaymentValidation = validate({
  params: Joi.object({
    jobId: Joi.string().required()
  }),
  body: Joi.object({
    clientId: Joi.string().required()
  })
});

export const ProcessDepositValidation = validate({
  params: Joi.object({
    userId: Joi.string().required()
  }),
  body: Joi.object({
    amount: Joi.number().required(),
  })
})

