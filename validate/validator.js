let Ajv = require('ajv');
let addFormats = require('ajv-formats');

function validate(data, schema) {
    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (valid) {
        return {
            'valid': valid
        }
    } else {
        // console.log(ajv);
        return {
            'valid': valid,
            'error': validate.errors
        }
    }
}

module.exports = {
    validate
};
