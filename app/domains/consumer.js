module.exports = (
    external_id,
    full_name,
    national_id,
    email,
    country,
    region,
    city,
    full_street_address,
    number,
    neighborhood,
    zip_code,
    phone
) => {
    return {
        full_name: full_name,
        national_id: national_id,
        email: email,

        external_id: external_id,

        address: {
            country: country,
            region: region,
            city: city,
            full_street_address: full_street_address,
            number: number,
            neighborhood: neighborhood,
            zip_code: zip_code
        },

        phone: phone
    }
}