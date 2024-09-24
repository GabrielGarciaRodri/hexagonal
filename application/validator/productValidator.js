const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class ProductValidator {
    validateProductData = () => {
        return [
            body('nombre').notEmpty().isNumeric().withMessage('El nombre es obligatorio'),
            body('precio').notEmpty().isNumeric().withMessage('El precio es obligatorio'),
            body('en_stock').notEmpty().isBoolean().withMessage('El Stock debe ser booleano'),
            body('categoria').notEmpty().isString().withMessage('La categoria es obligatoria'),
            body('descuento').isNumeric().withMessage('El descuento, no es obligatorio'),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateProductDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateProductID = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    validateProductUpdateDataByID = () => {
        return [   
            body('nombre').notEmpty().isNumeric().withMessage('El nombre es obligatorio'),
            body('precio').notEmpty().isNumeric().withMessage('El precio es obligatorio'),
            body('en_stock').notEmpty().isBoolean().withMessage('El Stock debe ser booleano'),
            body('categoria').notEmpty().isString().withMessage('La categoria es obligatoria'),
            body('descuento').isNumeric().withMessage('El descuento, no es obligatorio'),
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };
}

module.exports = ProductValidator;