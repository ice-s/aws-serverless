module.exports.handler = async function (event) {
    return {
        statusCode: 200,
        headers: {},
        body: JSON.stringify({
            'list': []
        })
    };
};