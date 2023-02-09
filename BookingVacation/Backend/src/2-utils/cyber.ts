import crypto from "crypto";

const salt = "vacTionontHepraRy";

function hash(plainText) {

    if (!plainText) return null;

    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");

}

export default hash